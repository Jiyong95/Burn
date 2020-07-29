import express from "express";
import routes from "../routes";

const videoRouter = express.Router();

videoRouter.get("/", (req, res) => res.send('Videos'));
videoRouter.get(routes.upload, (req, res) => res.send('upload'));
videoRouter.get(routes.videoDetail, (req, res) => res.send('video Detail'));
videoRouter.get(routes.editVideo, (req, res) => res.send('Edit video'));
videoRouter.get(routes.deleteVideo, (req, res) => res.send('Delete video'));

export default videoRouter;
//파일을 export하겠다는 의미.
