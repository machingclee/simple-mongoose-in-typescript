import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI =
  "mongodb+srv://machingclee:" +
  process.env.MONGO_DB_PW +
  "@project0-lkqrz.mongodb.net/test?retryWrites=true&w=majority";

export default function connectMongoDb() {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("connected to mongo instance.");
  });
  mongoose.connection.on("error", (err: Error) => {
    console.log("error connecting to mongo", err);
  });
}
