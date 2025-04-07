"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const authentication_1 = __importDefault(require("../middleware/authentication"));
const express_1 = require("express");
require("express-async-errors");
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const express_xss_sanitizer_1 = require("express-xss-sanitizer");
const middlewaresSetup = (app) => {
    app.use((0, express_1.json)());
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: [process.env.CLIENT_URL],
        credentials: true
    }));
    app.use((0, express_rate_limit_1.default)({
        windowMs: 15 * 60 * 1000,
        max: 200,
    }));
    app.use((0, express_xss_sanitizer_1.xss)());
    app.use(authentication_1.default);
};
exports.default = middlewaresSetup;
//# sourceMappingURL=middlewares.js.map