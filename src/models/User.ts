import mongoose, { Document, Schema, Model, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUserDocument extends Document {
  email: string;
  password: string;
}

export interface IComparePassword {
  comparePassword(loginPassword: string): Promise<boolean>;
}

export type IUser = IUserDocument & IComparePassword;

const userScheme = new mongoose.Schema<IUser>({
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

userScheme.pre("save", function (next) {
  const user = this as IUser;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userScheme.methods.comparePassword = function (loginPassword: string) {
  const user = this;

  return new Promise((resolve, reject) => {
    bcrypt.compare(loginPassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

export default mongoose.model<IUser>("User", userScheme);
