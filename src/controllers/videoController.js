import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    //최신 video가 먼저 나오게 정렬.
    //이 문장이 종료될 때까지 다음으로  안넘어감. async + await
    //DB의 모든 Video를 가져옴.
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};
//render => views폴더에서 파일명이 home이고 확장자가 pug인 파일을 보여줌.
//render함수는 인자로 1.템플릿, 2.템플릿에 전달할 객체를 받음.
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  //const searchingBy = req.query.term;과 같음.
  let videos = [];
  //let은 값을 바꿀 수 있음. vs  const
  //try문에서 searchingBy를 찾으면 videos에 reassign됨.
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
    //regex:정규표현식임. 즉, searchingBy가 들어간 모든 걸 찾음.
    //options : i => 대소문자 구분안한다.
  } catch (error) {
    console.log(error);
  }
  //검색한 정보가 req.query.term에 들어있음.
  //console.log(req.query);
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
    //console.log(req.file);  multer에 의해 file.path에 url이 저장됨을 확인.
    //multer가 locl서버에 저장할때는 path를 받지만,
    //aws S3처럼 외부의 서버에 저장할때는 location을 받음.
  } = req;
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    //const video = await Video.findById(id);
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    //populate는 Object ID타입에만 쓸 수 있음. Video모델의 crator, comment등
    //populate없이는 crator는 id만 갖고있는데 populate쓰면 ref : "User" 객체를 담게 됨.
    console.log(video);
    //console.log(req.params);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(req.user.id) != video.creator) {
      throw Error();
      //try안에 error()발생하면 자동으로 catch로 감.
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    // Params come from /:id on the URL.
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    // { id }인 비디오를 찾아서 { title, description } 을 Update
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) != req.user.id) {
      throw Error();
      //try안에 error()발생하면 자동으로 catch로 감.
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

//Register Video View

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

// Add Comment

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;
  try {
    const video = await Video.findById(id);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    //최근 댓글이 제일 먼저 보이게 하기 위해 저장시에 push대신 append써도됨.
    //근데 videoDetail.pug에 표시를 reverse로 했기 때문에, 서로 바꾸던가하면 됨.
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
