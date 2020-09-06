import express from "express";
import routes from "../routes";
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();
//export const userRouter = express.Router();
// 변수만 export하겠다는 의미.
userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);
// userDetail을 함수로 만들었으니까, 함수를 실행시켜줘야함.
// userDetail url주소가 users/:id임
// 그러면 editProfile이 아래에 있으면, users/edit-Profile인데 edit-Profile부분을
// :id로 인식함. 그래서 userDetail이 실행됨.
//  따라서 userDetail을 editProfile보다 아래에 위치시켜야함.
export default userRouter;
