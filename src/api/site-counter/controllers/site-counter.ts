// src/api/site-counter/controllers/site-counter.ts (Final Two-Step Version)
'use strict';

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({
  async increment(ctx) {
    const entryId = 1; // ID ของ Single Type ของเรา

    try {
      const currentEntry = await strapi.db.query('api::site-counter.site-counter').findOne({ where: { id: entryId } });
      const newViews = (currentEntry?.views || 0) + 1;

      // --- ส่วนที่แก้ไข ---
      // ขั้นตอนที่ 1: อัปเดตข้อมูลในฉบับร่าง (Draft) ก่อน
      await strapi.service('api::site-counter.site-counter').update(entryId, {
        data: {
          views: newViews,
        },
      });
      
      // ขั้นตอนที่ 2: สั่ง Publish ข้อมูลล่าสุดจากฉบับร่าง
      const publishedEntry = await strapi.service('api::site-counter.site-counter').publish(entryId);
      // --- สิ้นสุดส่วนที่แก้ไข ---

      return this.transformResponse(publishedEntry);

    } catch (err) {
      console.error('Error in increment controller:', err);
      ctx.body = err;
    }
  }
}));