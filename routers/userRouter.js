import express from "express";
import routes from "../routes";
import { users, userDetail, editProfile, changePassword } from "../controllers/userController";

const userRouter = express.Router();
//export const userRouter = express.Router();
// 변수만 export하겠다는 의미.
userRouter.get(routes.userDetail, userDetail);
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
export default userRouter;
