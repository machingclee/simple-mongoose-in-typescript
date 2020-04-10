"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
exports.default = (req, res, next) => {
    console.log(req.header);
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).send({ error: "You must logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    jsonwebtoken_1.default.verify(token, "MY_SECRET_KEY", async (err, payload) => {
        if (err)
            return res.status(401).send({ error: "must log in." });
        const { userId } = payload;
        const user = await User_1.default.findById(userId);
        if (user) {
            req.user = user;
        }
        next();
    });
};
