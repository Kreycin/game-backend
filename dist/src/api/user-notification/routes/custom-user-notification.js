"use strict";
// src/api/user-notification/routes/custom-user-notification.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'POST',
            path: '/user-notifications/upsert',
            handler: 'user-notification.upsert',
        }
    ]
};
