"use strict";
// src/api/cron/routes/cron.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/trigger-cron',
            handler: 'cron.trigger',
            config: {
                auth: false, // ไม่ต้องใช้ JWT token
            },
        },
    ],
};
