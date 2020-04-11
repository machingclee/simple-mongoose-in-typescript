import * as express from "express";
import mongoose from "mongoose";
import requireAuth from "../middlewares/requireAuth";
import Track from "../models/Track";
import { IUser } from "../models/User";

const router = express.Router();
router.use(requireAuth);

router.get("/", getTracks);
router.post("/", createTrack);

async function getTracks(req: express.Request, res: express.Response) {
  const tracks = await Track.find({ userId: (req.user as IUser)._id });
  res.send(tracks);
}

async function createTrack(req: express.Request, res: express.Response) {
  const { name, locations } = req.body;

  if (!name || !locations)
    return res.status(422).send({ error: "you must provide a name or locations." });

  try {
    const track = new Track({
      name,
      locations,
      userId: (req.user as IUser)._id,
    });

    track.save();
    res.send(track);
  } catch (err) {
    res.status(422).send({ err: err.message });
  }
}

export default router;
