export const home = (req, res) => res.render("home",{pageTitle:"Home"});
//render => views폴더에서 파일명이 home이고 확장자가 pug인 파일을 보여줌.
//render함수는 인자로 1.템플릿, 2.템플릿에 전달할 객체를 받음.
export const search = (req, res) => res.render("search",{pageTitle:"Search"});
export const upload = (req, res) => res.render("upload",{pageTitle:"Upload"});
export const videoDetail = (req, res) => res.render("videoDetail",{pageTitle:"Video Detail"});
export const editVideo = (req, res) => res.render("editVideo",{pageTitle:"Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo",{pageTitle:"Delete Video"});
