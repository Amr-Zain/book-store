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
exports.statistics = void 0;
const order_1 = __importDefault(require("../models/order"));
const book_1 = __importDefault(require("../models/book"));
const statistics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const totalOrders = yield order_1.default.countDocuments();
    const totalSales = yield order_1.default.aggregate([
        {
            $group: {
                _id: null,
                totalSales: { $sum: "$totalPrice" },
            }
        }
    ]);
    const trendingBooksCount = yield book_1.default.aggregate([
        { $match: { trending: true } },
        { $count: "trendingBooksCount" }
    ]);
    const trendingBooks = trendingBooksCount.length > 0 ? trendingBooksCount[0].trendingBooksCount : 0;
    const totalBooks = yield book_1.default.countDocuments();
    const monthlySales = yield order_1.default.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                totalSales: { $sum: "$totalPrice" },
                totalOrders: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
    res.status(200).json({ totalOrders,
        totalSales: ((_a = totalSales[0]) === null || _a === void 0 ? void 0 : _a.totalSales) || 0,
        trendingBooks,
        totalBooks,
        monthlySales, });
});
exports.statistics = statistics;
//# sourceMappingURL=admin.js.map