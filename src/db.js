import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
//.env 파일 안에 있는 정보를 불러오는데 그 정보는 process.env.key에 저장됨.
//DB url을 숨기기 위한 용도로 사용 됨.
mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
//db변수에 연결한 것.

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = () => console.log("💥 Not Connected to DB");

db.once("open", handleOpen);
//잘 연결됬는지 확인하려고 한번만 실행하는 것.
db.on("error", handleError);
