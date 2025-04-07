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
exports.deleteABook = exports.updateBook = exports.getBook = exports.listBooks = exports.postABook = void 0;
const book_1 = __importDefault(require("../models/book"));
const postABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const newBook = new book_1.default(req.body);
    const book = yield newBook.save();
    res.status(201).send({ message: "Book posted successfully", book });
});
exports.postABook = postABook;
const listBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (req.query.category)
        filter.category = req.query.category;
    if (req.query.trending)
        filter.trending = true;
    console.log(filter);
    const books = yield book_1.default.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ books });
});
exports.listBooks = listBooks;
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const book = yield book_1.default.findById(id);
    if (!book) {
        res.status(404).send({ message: "Book not Found!" });
    }
    res.status(200).json({ book });
});
exports.getBook = getBook;
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedBook = yield book_1.default.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBook) {
        res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
        message: "Book updated successfully",
        book: updatedBook
    });
});
exports.updateBook = updateBook;
const deleteABook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const deletedBook = yield book_1.default.findByIdAndDelete(id);
    if (!deletedBook) {
        res.status(404).send({ message: "Book is not Found!" });
    }
    res.status(200).send({
        message: "Book deleted successfully",
        book: deletedBook
    });
});
exports.deleteABook = deleteABook;
//# sourceMappingURL=book.js.map