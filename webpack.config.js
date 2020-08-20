const path = require("path");
//import path from "./~~~~~" import할 때, 문장을 써야함.
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
//__dirname은 현재 디렉토리 이름.
const OUTPUT_DIR = path.join(__dirname, "static");
//ENTRY_FILE을 받아서 OUTPUT_DIR을 현재 디렉토리의 static이라는 폴더에 생성하겠다.

const config = {
  entry: ENTRY_FILE,
  output: {
    path: OUTPUT_DIR,
    filename: "[name].[format]",
  },
};

module.exports = config;
