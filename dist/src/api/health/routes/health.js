"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/health/routes/health.ts
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/health',
            handler: 'health.check',
            config: {
                auth: false, // ทำให้เป็น Public
            },
        },
    ],
};
