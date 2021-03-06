import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface IPoint extends Document {
  timestamp: number;
  coords: {
    latitude: Number;
    longtitude: Number;
    altitutde: Number;
    accuracy: Number;
    heading: Number;
    speed: Number;
  };
}

export interface ITrack extends Document {
  userId: string;
  name: string;
  locations: string[];
}

const pointSchema = new Schema<IPoint>({
  timestamp: Number,
  coords: {
    latitude: Number,
    longtitude: Number,
    altitutde: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const trackSchema = new Schema<ITrack>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },
  locations: [pointSchema],
});

export default mongoose.model<ITrack>("Track", trackSchema);

const a: any = {
  name: "my new track",
  locations: [
    {
      timestamp: 1000000,
      coords: {
        latitude: 100,
        longtitude: 10,
        altitutde: 100,
        accuracy: 10,
        heading: 100,
        speed: 1000,
      },
    },
  ],
};
