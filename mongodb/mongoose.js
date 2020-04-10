"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = "mongodb+srv://machingclee:" +
    process.env.MONGO_DB_PW +
    "@project0-lkqrz.mongodb.net/test?retryWrites=true&w=majority";
function connectMongoDb() {
    mongoose_1.default.connect(MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    });
    mongoose_1.default.connection.on("connected", () => {
        console.log("connected to mongo instance.");
    });
    mongoose_1.default.connection.on("error", (err) => {
        console.log("error connecting to mongo", err);
    });
}
exports.default = connectMongoDb;
