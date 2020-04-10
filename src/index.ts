import mongoose from "mongoose";
import express from "express";
import connectMongoDb from "./mongodb/mongoose";
import authRouter from "./routers/authRouter";
import bodyParser from "body-parser";
import requireAuth from "./middlewares/requireAuth";
import { IUser } from "./models/User";

const app = express();
app.use(bodyParser.json());

connectMongoDb();

app.get("/", requireAuth, (req, res) => {
  if (req.user) res.send(`Your email:${(req.user as IUser).email}`);
});

app.use("/", authRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
