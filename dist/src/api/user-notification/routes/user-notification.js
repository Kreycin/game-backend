// api/user-notification/routes/user-notification.ts
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * user-notification router.
 */
const strapi_1 = require("@strapi/strapi");
// เราจะเพิ่ม config เข้าไปใน createCoreRouter
exports.default = strapi_1.factories.createCoreRouter('api::user-notification.user-notification', {
    config: {
        // --- VVV เพิ่ม config เข้าไปใน actions ที่ต้องการทดสอบ VVV ---
        find: {
            auth: false, // ปิดการยืนยันตัวตนสำหรับ "โหลดข้อมูล"
        },
        create: {
            auth: false, // ปิดการยืนยันตัวตนสำหรับ "สร้างข้อมูล"
        },
        update: {
            auth: false, // ปิดการยืนยันตัวตนสำหรับ "อัปเดตข้อมูล"
        },
        // --------------------------------------------------------
    }
});
