"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (url) => {
    try {
        return mongoose_1.default.connect(url);
    }
    catch (e) {
        console.error("DB connection error: ", e);
    }
};
exports.default = connectDB;
//# sourceMappingURL=connection.js.map