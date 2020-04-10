import * as express from "express";
import User from "../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants/keys";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  try {
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.send(token);
  } catch (err) {
    res.send("error is received");
  }
}

async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(422).send({ error: "must provide email and password." });

  const user = await User.findOne({ email });

  if (!user) return res.status(404).send({ error: "email not found." });

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    return res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "invalid password or email." });
  }
}

export default router;
