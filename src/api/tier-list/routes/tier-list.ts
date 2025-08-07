'use strict';

/**
 * tier-list router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

// เราจะแก้ไขส่วนนี้เพื่อทำให้ API เป็น Public
module.exports = createCoreRouter('api::tier-list.tier-list', {
  config: {
    find: {
      // ทำให้ find (การดึงข้อมูลทั้งหมด) ไม่ต้องใช้ token หรือการยืนยันตัวตน
      auth: false, 
    },
    findOne: {
      // ทำให้ findOne (การดึงข้อมูลชิ้นเดียว) ไม่ต้องใช้ token
      auth: false,
    },
  },
});