import express from "express";

const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on : http://localhost:${PORT}`);
	// req, res는 obj임.
const handleHome = (req, res) => res.send("Hello from home");

const handleProfile = (req, res) => res.send("you are on my profile");

app.get("/", handleHome);
// url / 주소일 때, handleHome실행

app.get("/profile", handleProfile);
// /profile일 때, handleProfile실행

app.listen(4000, handleListening);
//localhost:4000
