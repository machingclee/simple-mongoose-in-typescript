"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const User_1 = __importDefault(require("../models/User"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express.Router();
router.post("/signup", signUp);
async function signUp(req, res) {
    const { email, password } = req.body;
    const user = new User_1.default({ email, password });
    try {
        await user.save();
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, "MY_SECRET_KEY");
        res.send(token);
    }
    catch (err) {
        res.send("error is received");
    }
}
exports.default = router;
