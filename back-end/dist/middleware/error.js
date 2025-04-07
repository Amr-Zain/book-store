"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const errorHandler = (err, req, res, next) => {
    // Set default status code
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // Initialize error response
    const errorResponse = {
        message: err.message,
    };
    // Handle Mongoose validation errors
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        statusCode = 400;
        const errors = {};
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message;
        });
        errorResponse.message = 'Validation failed';
        errorResponse.errors = errors;
    }
    // Handle other error types
    res.status(statusCode).json(errorResponse);
    next();
};
exports.default = errorHandler;
//# sourceMappingURL=error.js.map