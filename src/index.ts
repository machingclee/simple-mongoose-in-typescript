import mongoose from "mongoose";
import express from "express";
import connectMongoDb from "./mongodb/mongoose";
import authRouter from "./routers/authRouter";
import bodyParser from "body-parser";
import requireAuth from "./middlewares/requireAuth";
import { IUser } from "./models/User";
import trackRouter from "./routers/trackRouter";
const app = express();
app.use(bodyParser.json());

connectMongoDb();
app.use("/auth", authRouter);
app.use("/track", trackRouter);
// app.get("/", requireAuth, (req, res) => {
//   if (req.user) res.send(`Your email:${(req.user as IUser).email}`);
// });

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
