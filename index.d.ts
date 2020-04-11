/// <reference types="mongoose" />
/// <reference types="express" />
declare module "mongodb/mongoose" {
    export default function connectMongoDb(): void;
}
declare module "models/User" {
    import mongoose, { Document } from "mongoose";
    export interface IUserDocument extends Document {
        email: string;
        password: string;
    }
    export interface IComparePassword {
        comparePassword(loginPassword: string): Promise<boolean>;
    }
    export type IUser = IUserDocument & IComparePassword;
    const _default: mongoose.Model<IUser, {}>;
    export default _default;
}
declare module "constants/keys" {
    export const JWT_SECRET = "MY_SECRET_KEY";
}
declare module "routers/authRouter" {
    const router: import("express-serve-static-core").Router;
    export default router;
}
declare module "middlewares/requireAuth" {
    import { Request, Response, NextFunction } from "express";
    const _default_1: (req: Request<import("express-serve-static-core").ParamsDictionary>, res: Response<any>, next: NextFunction) => Response<any> | undefined;
    export default _default_1;
}
declare module "models/Track" {
    import mongoose from "mongoose";
    const _default_2: mongoose.Model<mongoose.Document, {}>;
    export default _default_2;
}
declare module "routers/trackRouter" {
    const router: import("express-serve-static-core").Router;
    export default router;
}
declare module "index" { }
