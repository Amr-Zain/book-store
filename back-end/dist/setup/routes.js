"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_1 = __importDefault(require("../routes/book"));
const order_1 = __importDefault(require("../routes/order"));
const admin_1 = __importDefault(require("../routes/admin"));
const routesSetup = (app) => {
    app.use('/api/v1/books', book_1.default);
    app.use('/api/v1/orders', order_1.default);
    app.use('/api/v1/admin', admin_1.default);
};
exports.default = routesSetup;
//# sourceMappingURL=routes.js.map