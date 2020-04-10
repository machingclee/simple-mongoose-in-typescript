"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("./mongodb/mongoose"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const body_parser_1 = __importDefault(require("body-parser"));
const requireAuth_1 = __importDefault(require("./middlewares/requireAuth"));
const app = express_1.default();
app.use(body_parser_1.default.json());
mongoose_1.default();
app.get("/", requireAuth_1.default, (req, res) => {
    if (req.user)
        res.send(`Your email:${req.user.email}`);
});
app.use("/", authRouter_1.default);
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
