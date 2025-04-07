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
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_admin_1 = require("firebase-admin");
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
        return next();
    }
    token = token.split(' ')[1];
    try {
        const decoded = yield (0, firebase_admin_1.auth)().verifyIdToken(token);
        const userSnapshot = yield (0, firebase_admin_1.firestore)()
            .collection('users')
            .where('id', '==', decoded.uid)
            .limit(1)
            .get();
        if (userSnapshot.empty) {
            console.log(`No user document found with UID: ${decoded.uid}`);
        }
        const userDoc = userSnapshot.docs[0];
        req['user'] = Object.assign({}, userDoc.data());
        next();
    }
    catch (error) {
        console.error('Token is invalid:', error);
        next();
    }
});
exports.default = authenticateUser;
//# sourceMappingURL=authentication.js.map