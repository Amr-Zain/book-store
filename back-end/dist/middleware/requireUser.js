"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizePermissions = void 0;
const authorizePermissions = (roles) => {
    return (req, res, next) => {
        if (!req['user'])
            res.status(401).json({ message: 'not authorized' });
        if (!roles.includes(req['user'].role))
            res.status(403).json({ message: 'not allowed' });
        next();
    };
};
exports.authorizePermissions = authorizePermissions;
//# sourceMappingURL=requireUser.js.map