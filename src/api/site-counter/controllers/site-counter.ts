// src/api/site-counter/controllers/site-counter.ts
'use strict';

/**
 * site-counter controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({
  // ฟังก์ชันสำหรับเพิ่มยอดวิว
  async increment(ctx) {
    // เรายังคงสมมติว่า site-counter มี id = 1 เสมอ
    const entryId = 1; 

    try {
      // 1. ดึงข้อมูลปัจจุบันเพื่อเอายอดวิวล่าสุด
      const currentEntry = await strapi.entityService.findOne('api::site-counter.site-counter', entryId);

      if (!currentEntry) {
        // ถ้าไม่เจอข้อมูลเลย ให้สร้างใหม่พร้อม publishedAt
        const newEntry = await strapi.entityService.create('api::site-counter.site-counter', {
            data: {
                id: entryId, // กำหนด id โดยตรง
                views: 1,
                publishedAt: new Date().toISOString(),
            }
        });
        return this.transformResponse(newEntry);
      }

      // 2. คำนวณยอดวิวใหม่
      const newViews = (currentEntry.views || 0) + 1;

      // 3. ใช้ 'update' เหมือนเดิม แต่เพิ่มการอัปเดต 'publishedAt' เข้าไป
      const updatedEntry = await strapi.entityService.update('api::site-counter.site-counter', entryId, {
        data: {
          views: newViews,
          publishedAt: new Date().toISOString(), // <-- ส่วนที่สำคัญที่สุด
        },
      });
      
      // 4. ส่งข้อมูลที่อัปเดตแล้วกลับไป
      return this.transformResponse(updatedEntry);

    } catch (err) {
      ctx.body = err;
    }
  }
}));