import multer from "multer";
import routes from "./routes";

export const multerVideo = multer({ dest: "uploads/videos/" });
//videos 디렉토리에 파일 url을 저장하겠다.
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  //console.log(req.user);
  next();
  //다음 함수로 넘어가게함. 그아래 router함수.
};
// local변수들을 global변수로 이용하기 위함.
// in PUG에서만 해당되는 듯.

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};
//login이 되어있으면 join 페이지에 접근 못하게 하려고 만듬.
//이걸 globalrouter에 적용.

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
//하나의 video만 upload 가능.
//videoFile은  upload.pug 파일 name 값으로 설정.
//multer사용법 참조.
