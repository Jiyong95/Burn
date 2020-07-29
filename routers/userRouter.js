import express from "express";
import routes from "../routes";

const userRouter = express.Router();
//export const userRouter = express.Router();
// 변수만 export하겠다는 의미.
userRouter.get("/", (req, res) => res.send('user'));
userRouter.get(routes.userDetail, (req, res) => res.send('userDetail'));
userRouter.get(routes.editProfile, (req, res) => res.send('Edit Profile'));
userRouter.get(routes.changePassword, (req, res) => res.send('Change Password'));
export default userRouter;
