import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import { JWT_SECRET } from "../constants/keys";

interface IPayload {
  userId: string | null;
}

export default (req: Request, res: Response, next: NextFunction) => {
  console.log(req.header);
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).send({ error: "You must logged in" });

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET, async (err, payload) => {
    if (err) return res.status(401).send({ error: "must log in." });

    const { userId } = payload as IPayload;
    const user = await User.findById(userId);

    if (user) req.user = user;

    next();
  });
};
