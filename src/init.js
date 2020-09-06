import "@babel/polyfill";
import "./db";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import "./models/Video";
import "./models/Comment";
//Model을 DB에 적용시켜줌.
import "./models/User";

const PORT = process.env.PORT || 4000;
// PORT를 불러오는데 못찾으면 4000으로 쓰겠다.

const handleListening = () =>
  console.log(`✅ Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
