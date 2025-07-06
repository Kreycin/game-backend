// src/api/site-counter/controllers/site-counter.ts (Reverted and Corrected Final Version)
'use strict';

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({
  async increment(ctx) {
    const entryId = 1;

    try {
      const currentEntry = await strapi.db.query('api::site-counter.site-counter').findOne({ where: { id: entryId } });
      
      if (!currentEntry) {
        return ctx.notFound('Site Counter entry not found. Please create and publish it once from the Admin Panel.');
      }

      const newViews = (currentEntry.views || 0) + 1;

      // นี่คือเวอร์ชันที่ควรจะทำงานได้ถูกต้องที่สุด
      // อัปเดตค่า views และตั้งค่า publishedAt เป็นวันปัจจุบัน เพื่อบังคับ Publish
      const updatedEntry = await strapi.entityService.update('api::site-counter.site-counter', entryId, {
        data: {
          views: newViews,
          publishedAt: new Date().toISOString(),
        },
      });

      return this.transformResponse(updatedEntry);

    } catch (err) {
      console.error('Error in increment controller:', err);
      ctx.body = err;
    }
  }
}));