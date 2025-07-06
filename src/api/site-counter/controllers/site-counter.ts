// src/api/site-counter/controllers/site-counter.ts
'use strict';

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({
  async increment(ctx) {
    const entryId = 1; // ID ของ Single Type ของเรา

    try {
      const currentEntry = await strapi.db.query('api::site-counter.site-counter').findOne({ where: { id: entryId } });

      // ถ้าไม่มีข้อมูล ให้สร้างใหม่และ Publish ทันที
      if (!currentEntry) {
        const newPublishedEntry = await strapi.entityService.create('api::site-counter.site-counter', {
            data: {
                id: entryId, // ระบุ id สำหรับ Single Type
                views: 1,
                publishedAt: new Date().toISOString(), // ตั้งค่าให้ Publish
            }
        });
        return this.transformResponse(newPublishedEntry);
      }

      // ถ้ามีข้อมูลอยู่แล้ว ให้อัปเดต
      const newViews = (currentEntry.views || 0) + 1;

      // --- นี่คือเวอร์ชันที่ถูกต้องที่สุด ---
      // เราใช้คำสั่ง update แต่เพิ่ม field `publishedAt` เข้าไปเพื่อสั่ง Publish อัตโนมัติ
      const updatedEntry = await strapi.entityService.update('api::site-counter.site-counter', entryId, {
        data: {
          views: newViews,
          publishedAt: new Date().toISOString(), // <-- กุญแจสำคัญคือบรรทัดนี้
        },
      });

      return this.transformResponse(updatedEntry);

    } catch (err) {
      console.error('Error in site-counter increment controller:', err);
      ctx.body = err;
    }
  }
}));