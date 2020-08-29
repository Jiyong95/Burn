import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});
//github 인증
export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Cannot log in, try it again.",
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  //export const githubLoginCallback = async(accessToken, refreshToken, profile, cb) => {
  // 사용하지 않는 매개변수는 저렇게 처리가능.
  //console.log(accessToken, refreshToken, profile, cb);
  const {
    _json: { id, avatar_url, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.avatarUrl = avatar_url;
      user.name = name;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatar_url,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogin = (req, res) => {
  res.redirect(routes.home);
};

export const kakaoLogin = passport.authenticate("kakao", {
  failureFlash: "Failed",
  successFlash: "Success",
});

export const kakaoLoginCallback = async (_, __, profile, done) => {
  //console.log(accessToken, refreshToken, profile, done);
  const {
    _json: {
      id,
      properties: { nickname: name, profile_image: avatar_url },
      kakao_account: { email },
    },
  } = profile;
  try {
    // Github와 연동했을 때, 만약 회원이 Local Strategy로 가입했던 이메일과 Github에 등록된 이메일이 같다면,
    // 기존 회원정보에 Github 정보도 추가해서 DB에 등록한다.
    const user = await User.findOne({
      email,
    });
    console.log(user);
    if (user) {
      user.kakaoId = id;
      user.save();
      // Github을 이용한 인증은 passport에서 제공하는 cb()함수를 이용한다.
      // cb() 함수의 첫번째 인자는 에러처리, 두번째 인자는 성공처리다.
      return done(null, user);
    }
    // 만약 내 웹서비스에 가입한 적이 없거나 이메일 정보가 Github과 다르다면, 해당 Github정보로 가입을 시킨다.

    const newUser = await User.create({
      email,
      name,
      kakaoId: id,
      avatarUrl: avatar_url,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const postKakaoLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
  //req.uer : 현재 로그인된 사용자.
  //user : req.user를 통해 userDetail.pug는 user(req.user)를 전달받음.
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  //userDetail에서 route주소를 /:id로했기 때문에 http://localhost:4000/아무숫자(id)
  //아무숫자부분이 id가 되는 거임.
  try {
    const user = await User.findById(id);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    const user = await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });
