import { listings } from "./listings";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 7000;

app.use(bodyParser.json());

app.get("/", (_req, res) => res.send("<h1>My App</h1>"));

app.get("/listings", (_req, res) => {
  return res.send(listings);
});

app.post("/delete-listing", (req, res) => {
  const id: string = req.body.id;
  listings.forEach((item, i) => {
    if (item.id === id) {
      res.send(listings.splice(i, 1));
    }
  });
  return res.send("failed to delete listing");
});

app.listen(port, () => console.log("server started!;)"));
