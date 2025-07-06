// src/api/site-counter/controllers/site-counter.ts
'use strict';

/**
 * site-counter controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({
  // ฟังก์ชันสำหรับเพิ่มยอดวิว
  async increment(ctx) {
    const entryId = 1; // ID ของ Single Type ของเรา

    try {
      // 1. ดึงข้อมูลล่าสุดโดยตรงจากฐานข้อมูล
      const currentEntry = await strapi.db.query('api::site-counter.site-counter').findOne({ where: { id: entryId } });
      
      // คำนวณยอดวิวใหม่
      // ถ้าไม่มีข้อมูลเลย ให้เริ่มนับเป็น 1, ถ้ามีแล้วให้บวก 1
      const newViews = (currentEntry?.views || 0) + 1;

      // 2. ใช้ "service" ของ content type เพื่อสั่ง "publish"
      // นี่คือการจำลองการกดปุ่ม Publish ในหน้า Admin Panel ผ่านโค้ด
      const publishedEntry = await strapi.service('api::site-counter.site-counter').publish(entryId, {
        data: {
          views: newViews,
        },
      });

      // 3. ส่งข้อมูลที่ publish แล้วกลับไป
      return this.transformResponse(publishedEntry);

    } catch (err) {
      // เพิ่ม Log เพื่อให้เห็น Error ชัดๆ หากเกิดปัญหา
      console.error('An error occurred in the site-counter increment controller:', err);
      ctx.body = err;
    }
  }
}));