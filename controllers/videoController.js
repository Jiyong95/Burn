export const home = (req, res) => res.render("home");
//render => views폴더에서 파일명이 home이고 확장자가 pug인 파일을 보여줌.
export const search = (req, res) => res.render("search");
export const upload = (req, res) => res.render("upload");
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");
