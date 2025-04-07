"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_1 = require("../contrallers/book");
const requireUser_1 = require("../middleware/requireUser");
const bookRouter = (0, express_1.Router)();
bookRouter.route('/')
    .get(book_1.listBooks)
    .post([(0, requireUser_1.authorizePermissions)(['admin'])], book_1.postABook);
bookRouter.route('/:id')
    .get(book_1.getBook)
    .put([(0, requireUser_1.authorizePermissions)(['admin'])], book_1.updateBook)
    .delete([(0, requireUser_1.authorizePermissions)(['admin'])], book_1.deleteABook);
exports.default = bookRouter;
//# sourceMappingURL=book.js.map