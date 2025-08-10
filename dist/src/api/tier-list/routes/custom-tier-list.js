'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A custom router for the tier-list.
 */
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/public-tier-lists', // URL ใหม่ของเรา
            handler: 'custom-tier-list.findPublic', // เรียกใช้ Controller ที่เราสร้าง
            config: {
                auth: false, // บังคับให้เป็น Public
            },
        },
    ],
};
