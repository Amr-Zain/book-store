"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_1 = require("../contrallers/admin");
const requireUser_1 = require("../middleware/requireUser");
const adminRouter = (0, express_1.Router)();
adminRouter.get("/", [(0, requireUser_1.authorizePermissions)(['admin'])], admin_1.statistics);
exports.default = adminRouter;
//# sourceMappingURL=admin.js.map