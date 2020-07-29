import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";

const app = express();

const handleHome = (req, res) => res.send("Hello from home");

const handleProfile = (req, res) => res.send("you are on my profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);
// url / 주소일 때, handleHome실행

app.get("/profile", handleProfile);
// /profile일 때, handleProfile실행

app.use("/user", userRouter);
//use의 역할은 /user로 접속시 userRouter 전체를 사용하겠다. 즉, userRouter 전체에서 맞는 주소를 찾음.
export default app;
