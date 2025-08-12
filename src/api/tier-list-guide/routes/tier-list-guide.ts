'use strict';

/**
 * tier-list-guide router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// เราจะแก้ไขส่วนนี้เพื่อทำให้ API เป็น Public
export default createCoreRouter('api::tier-list-guide.tier-list-guide', {
  config: {
    find: {
      // ทำให้ find (การดึงข้อมูล) ไม่ต้องใช้ token หรือการยืนยันตัวตน
      auth: false,
    },
  },
});