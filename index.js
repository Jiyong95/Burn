const express = require("express");
//require : express라는 폴더를 node_modules에서 찾음.
const app = express();

const PORT = 4000;
function handleListening() {
	console.log(`Listening on : http://localhost:${PORT}`);
}

app.listen(4000, handleListening);
//localhost:4000
