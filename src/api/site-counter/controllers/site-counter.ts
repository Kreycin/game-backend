// src/api/site-counter/controllers/site-counter.ts (Final Simplified & Correct Version)
'use strict';

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({
  async increment(ctx) {
    const entryId = 1;

    try {
      const currentEntry = await strapi.db.query('api::site-counter.site-counter').findOne({ where: { id: entryId } });

      if (!currentEntry) {
        // ถ้ายังไม่มีข้อมูล ให้สร้างใหม่และ Publish ทันที
        const newEntry = await strapi.service('api::site-counter.site-counter').create({
            data: {
                id: entryId, // ระบุ id สำหรับ Single Type
                views: 1,
                publishedAt: new Date(),
            }
        });
        return this.transformResponse(newEntry);
      }

      const newViews = (currentEntry.views || 0) + 1;
      
      // นี่คือวิธีที่ถูกต้องและได้ผล: อัปเดตค่า views และตั้งค่า publishedAt เป็นวันปัจจุบัน
      // เพื่อบังคับให้ข้อมูลเป็นเวอร์ชันล่าสุดเสมอ
      const updatedEntry = await strapi.entityService.update('api::site-counter.site-counter', entryId, {
        data: {
          views: newViews,
          publishedAt: new Date().toISOString(),
        },
      });

      return this.transformResponse(updatedEntry);

    } catch (err) {
      console.error('Error in site-counter increment controller:', err);
      ctx.body = err;
    }
  }
}));