// src/api/site-counter/controllers/site-counter.ts
'use strict';

/**
 * site-counter controller
 */

import { factories } from '@strapi/strapi';

// เราจะใช้วิธี "extending the core controller"
// เพื่อเพิ่ม custom action ของเราเข้าไป
export default factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({

  // นี่คือ Custom Action ที่เราสร้างขึ้น
  async increment(ctx) {
    // สมมติว่าเรามีข้อมูล counter แค่ 1 รายการ และมี id = 1 เสมอ
    // ใน Content-Type ของคุณต้องมี field สำหรับเก็บตัวเลข เช่นชื่อว่า "views"
    const entryId = 1; 

    try {
      // 1. ดึงข้อมูลปัจจุบันของ counter
      const currentEntry = await strapi.entityService.findOne('api::site-counter.site-counter', entryId);

      if (!currentEntry) {
        // ถ้ายังไม่มีข้อมูล counter ให้สร้างใหม่ หรือส่ง error กลับไป
        // ในที่นี้จะส่ง error กลับไปก่อน
        return ctx.notFound('Site counter entry not found. Please create an entry with ID 1.');
      }

      // 2. คำนวณยอดวิวใหม่ (บวก 1 จากของเดิม)
      // ตรวจสอบให้แน่ใจว่า field ใน Content-Type ของคุณชื่อ 'views' (หรือเปลี่ยนชื่อตามจริง)
      const newViews = (currentEntry.views || 0) + 1;

      // 3. อัปเดตข้อมูลในฐานข้อมูลด้วยยอดวิวใหม่
      const updatedEntry = await strapi.entityService.update('api::site-counter.site-counter', entryId, {
        data: {
          views: newViews,
        },
      });

      // 4. ส่งข้อมูลที่อัปเดตแล้วกลับไป
      return this.transformResponse(updatedEntry);

    } catch (err) {
      ctx.body = err;
    }
  }
}));