'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * tier-list-guide router
 */
const { createCoreRouter } = require('@strapi/strapi').factories;
// เราจะแก้ไขส่วนนี้เพื่อทำให้ API เป็น Public
exports.default = createCoreRouter('api::tier-list-guide.tier-list-guide', {
    config: {
        find: {
            // ทำให้ find (การดึงข้อมูล) ไม่ต้องใช้ token หรือการยืนยันตัวตน
            auth: false,
        },
    },
});
