const path = require("path");
//import path from "./~~~~~" import할 때, 문장을 써야함.
const autoprefixer = require("autoprefixer");
const ExtractCSS = require("extract-text-webpack-plugin");
//추출하는데 쓰임.
const MODE = process.env.WEBPACK_ENV;
//padkage.json에 옵션 설정해준 것을 받아옴?
const ENTRY_FILE = path.resolve(__dirname, "assets", "js", "main.js");
//__dirname은 현재 디렉토리 이름.
const OUTPUT_DIR = path.join(__dirname, "static");
//ENTRY_FILE을 받아서 OUTPUT_DIR을 현재 디렉토리의 static이라는 폴더에 생성하겠다.

const config = {
  entry: ["@babel/polyfill", ENTRY_FILE],
  mode: MODE,
  module: {
    rules: [
      {
        test: /\.(js)$/,
        //js파일에 대한 규칙.
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.(scss)$/,
        //= scss파일을 찾으면
        use: ExtractCSS.extract([
          //4. css를 추출.
          {
            loader: "css-loader",
            //3.css를 가져옴.
          },
          {
            loader: "postcss-loader",
            //2.plugin을 css에 대해 실행시켜줌.
            options: {
              plugins() {
                return [autoprefixer({ browsers: "cover 99.5%" })];
                //css에 실행시킬 plugin
              },
            },
          },
          {
            loader: "sass-loader",
            //1.sass, scss를 받아서 일반 css로 바꿔줌.
          },
        ]),
        //아래에서 위로 실행되므로 sass-loader를 거치고 css-loader거쳐야함.
      },
    ],
  },
  //5. rules가 끝난후 ouput이 실행됨.
  output: {
    path: OUTPUT_DIR,
    filename: "[name].js",
    //main.js이름으로 파일 생김.
  },
  plugins: [new ExtractCSS("styles.css")],
  //6.rules에 의해 추출한 것을 styles.css파일로 생성.
};

module.exports = config;
