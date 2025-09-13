"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/health-check/routes/health-check.ts
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/health-check',
            handler: 'health-check.index',
            config: {
                auth: false, // ไม่ต้อง login ก็เรียกได้
            },
        },
    ],
};
