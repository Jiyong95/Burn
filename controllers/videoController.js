import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
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
export const search = (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;
  //const searchingBy = req.query.term;과 같음.

  //검색한 정보가 req.query.term에 들어있음.
  //console.log(req.query);
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  //console.log(file);  multer에 의해 file.path에 url이 저장됨을 확인.
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  console.log(newVideo);
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    //console.log(req.params);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
