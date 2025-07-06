// src/api/site-counter/controllers/site-counter.ts (Using db.query)
'use strict';

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({
  async increment(ctx) {
    const entryId = 1; // ID ของ Single Type ของเรา

    try {
      // 1. ค้นหาข้อมูลปัจจุบันโดยใช้ db.query
      const currentEntry = await strapi.db.query('api::site-counter.site-counter').findOne({
        where: { id: entryId },
      });

      // ถ้าไม่เจอข้อมูลเลย (อาจยังไม่เคยสร้างในหน้า Admin) ให้ส่ง Error กลับไป
      if (!currentEntry) {
        return ctx.notFound('Site counter entry not found. Please create it in the Admin Panel first.');
      }

      // 2. คำนวณยอดวิวใหม่
      const newViews = (currentEntry.views || 0) + 1;

      // 3. --- นี่คือส่วนที่แก้ไข ---
      // ใช้ db.query().update() ซึ่งเป็นการอัปเดตฐานข้อมูลโดยตรง
      const updatedEntry = await strapi.db.query('api::site-counter.site-counter').update({
        where: { id: entryId },
        data: {
          views: newViews,
        },
      });

      // 4. ส่งข้อมูลที่อัปเดตแล้วกลับไป
      return this.transformResponse(updatedEntry);

    } catch (err) {
      console.error('Error in increment controller:', err);
      ctx.body = err;
    }
  }
}));