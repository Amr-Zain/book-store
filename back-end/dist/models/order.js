"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    address: {
        city: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            trim: true,
        },
        state: {
            type: String,
            trim: true,
        },
        zipcode: {
            type: String,
            trim: true,
        },
        street: {
            type: String,
            trim: true,
        },
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        // Add phone number validation based on region if needed
    },
    productIds: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Book',
            required: true,
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true,
});
const Order = mongoose_1.default.model('Order', orderSchema);
exports.default = Order;
//# sourceMappingURL=order.js.map