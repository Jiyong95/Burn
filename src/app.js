import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";
import { localsMiddleware } from "./middlewares";
import apiRouter from "./routers/apiRouter";

import "./passport";

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug");
//name, value값 설정해줌. pug로 화면에 표시하기 위함.(in express)
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));

app.use(cookieParser());
//cookie를 전달 받아서 사용할 수 있도로 해주는 미들웨어. ex)사용자 인증
app.use(bodyParser.json());
//사용자가 웹사이트로 전달하는 정보들을 검사.
//request정보에서 form이나 json형태로 된 body를 검사.
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
//발생하는 모든 정보들을 logging
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    //쿠키의 값(id)을 jyjyyayaya로 바꿔줌.
    //다른 사람이 쿠키값을 읽을 수 없도록.
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
//seession을 저장해줌.
app.use(localsMiddleware);
//PUG에서 사용 가능. 아래 Router에서 쓰려면 import 해주어야함.
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
//use의 역할은 /user로 접속시 userRouter 전체를 사용하겠다. 즉, userRouter 전체에서 맞는 주소를 찾음.
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
