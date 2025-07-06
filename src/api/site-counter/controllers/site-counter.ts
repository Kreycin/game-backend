// src/api/site-counter/controllers/site-counter.ts (Final Simplified Version)
'use strict';

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({
  async increment(ctx) {
    const entryId = 1;

    try {
      const currentEntry = await strapi.db.query('api::site-counter.site-counter').findOne({ where: { id: entryId } });

      if (!currentEntry) {
        const newEntry = await strapi.entityService.create('api::site-counter.site-counter', {
          data: { id: entryId, views: 1 }
        });
        return this.transformResponse(newEntry);
      }

      const newViews = (currentEntry.views || 0) + 1;

      // ตอนนี้ Draft & Publish ปิดแล้ว การ update จะเป็นการอัปเดตข้อมูลจริงทันที
      const updatedEntry = await strapi.entityService.update('api::site-counter.site-counter', entryId, {
        data: {
          views: newViews,
        },
      });

      return this.transformResponse(updatedEntry);

    } catch (err) {
      console.error('Error in increment controller:', err);
      ctx.body = err;
    }
  }
}));