"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("firebase-admin/app");
const firebase_admin_1 = require("firebase-admin");
const firebasCofig = () => {
    const serviceAccount = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
    (0, app_1.initializeApp)({
        credential: firebase_admin_1.credential.cert(serviceAccount),
    });
};
exports.default = firebasCofig;
//# sourceMappingURL=firebase.js.map