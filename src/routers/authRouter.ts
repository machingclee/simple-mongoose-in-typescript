import * as express from "express";
import User from "../models/User";
import { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", signUp);

async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  try {
    await user.save();
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send(token);
  } catch (err) {
    res.send("error is received");
  }
}

export default router;
