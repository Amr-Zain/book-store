"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./db/connection"));
const not_found_1 = __importDefault(require("./middleware/not-found"));
const error_1 = __importDefault(require("./middleware/error"));
const firebase_1 = __importDefault(require("./setup/firebase"));
const routes_1 = __importDefault(require("./setup/routes"));
const middlewares_1 = __importDefault(require("./setup/middlewares"));
const port = process.env.PORT || 3030;
dotenv_1.default.config();
const app = (0, express_1.default)();
// middleware
(0, firebase_1.default)();
(0, middlewares_1.default)(app);
(0, routes_1.default)(app);
app.use(not_found_1.default);
app.use(error_1.default);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.default)(process.env.DB_URL);
    console.log(`app listening on port ${port}`);
}));
//# sourceMappingURL=app.js.map