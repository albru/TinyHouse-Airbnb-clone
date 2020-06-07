import express from "express";

const app = express();

const port = 9000;

app.get("/", (req, res) => res.send("<h1>My App</h1>"));

app.listen(port, () => console.log("server started!;)"));
