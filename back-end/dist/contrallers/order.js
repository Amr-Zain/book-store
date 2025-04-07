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
exports.getUserOrders = exports.createOrder = void 0;
const order_1 = __importDefault(require("../models/order"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newOrder = new order_1.default(req.body);
    const savedOrder = yield newOrder.save();
    res.status(200).json(savedOrder);
});
exports.createOrder = createOrder;
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let orders = [];
    console.log(req['user']);
    if (req['user'].role === 'user') {
        const email = req['user'].email;
        orders = yield order_1.default.find({ email }).sort({ createdAt: -1 });
        console.log(orders);
    }
    else if (req['user'].role === 'admin') {
        orders = yield order_1.default.find({});
    }
    if (!orders.length)
        return res.status(201).json({ message: "there is no orders found", orders: [] });
    res.status(200).json({ orders });
});
exports.getUserOrders = getUserOrders;
//# sourceMappingURL=order.js.map