import mongoose, { Document, Schema, Model, model } from "mongoose";

export interface IUser extends Document {
  email: string;
  password: string;
}

const userScheme: Schema<IUser> = new mongoose.Schema<IUser>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IUser>("User", userScheme);
