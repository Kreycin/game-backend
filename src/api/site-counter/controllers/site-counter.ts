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
  },
  // --- เพิ่มฟังก์ชัน testWrite นี้เข้าไป ---
  async testWrite(ctx) {
    try {
      console.log('[TEST] Starting testWrite function...');
      const randomNumber = Math.floor(Math.random() * 1000) + 1;

      console.log(`[TEST] Attempting to update views to: ${randomNumber}`);

      const updatedEntry = await strapi.db.query('api::site-counter.site-counter').update({
        where: { id: 1 },
        data: {
          views: randomNumber,
        },
      });

      console.log('[TEST] Update successful. Returning new value.');
      return { success: true, updatedData: updatedEntry };

    } catch (err) {
      console.error('[TEST] An error occurred in testWrite:', err);
      return { success: false, error: err };
    }
  }
  // --- สิ้นสุดส่วนที่เพิ่ม ---
}));