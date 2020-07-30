import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
//name, value값 설정해줌. pug로 화면에 표시하기 위함.(in express)
app.use(cookieParser());
//cookie를 전달 받아서 사용할 수 있도로 해주는 미들웨어. ex)사용자 인증
app.use(bodyParser.json());
//사용자가 웹사이트로 전달하는 정보들을 검사.
//request정보에서 form이나 json형태로 된 body를 검사.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
//발생하는 모든 정보들을 logging
app.use(localsMiddleware);
//이 함수가 먼저 실행되어야 아래에서 local변수들을 global변수로 사용가능하기 때문.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
//use의 역할은 /user로 접속시 userRouter 전체를 사용하겠다. 즉, userRouter 전체에서 맞는 주소를 찾음.
app.use(routes.videos, videoRouter);

export default app;
