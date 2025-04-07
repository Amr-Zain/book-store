"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
    category: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        enum: ["business", "biction", "horror", "adventure"],
    },
    trending: {
        type: Boolean,
        default: false,
    },
    coverImage: {
        type: String,
        required: true,
    },
    oldPrice: {
        type: Number,
        required: true,
        min: 0,
    },
    newPrice: {
        type: Number,
        required: true,
        min: 0,
        validate: {
            validator: function (v) {
                return v <= this.oldPrice;
            },
            message: 'New price must be less than or equal to old price',
        },
    },
    author: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
}, {
    timestamps: true,
});
const Book = mongoose_1.default.model('Book', bookSchema);
exports.default = Book;
//# sourceMappingURL=book.js.map