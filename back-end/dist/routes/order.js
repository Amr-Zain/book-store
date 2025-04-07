"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requireUser_1 = require("../middleware/requireUser");
const order_1 = require("../contrallers/order");
const orderRouter = (0, express_1.Router)();
orderRouter.route('/')
    .get([(0, requireUser_1.authorizePermissions)(['user', 'admin'])], order_1.getUserOrders)
    .post([(0, requireUser_1.authorizePermissions)(['user'])], order_1.createOrder);
exports.default = orderRouter;
//# sourceMappingURL=order.js.map