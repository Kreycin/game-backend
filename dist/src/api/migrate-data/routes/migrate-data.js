"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/migrate-data/routes/migrate-data.ts
exports.default = {
    routes: [
        {
            method: 'POST',
            path: '/migrate-data',
            handler: 'migrate-data.migrate',
            config: {
            // Route นี้จะถูกป้องกันโดยระบบยืนยันตัวตนของ Strapi อัตโนมัติ
            // ผู้ใช้ต้องมี Token ที่ถูกต้องถึงจะเรียกใช้งานได้
            },
        },
    ],
};
