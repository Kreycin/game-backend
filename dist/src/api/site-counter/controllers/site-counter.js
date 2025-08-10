// src/api/site-counter/controllers/site-counter.ts (Final Version for Backend-Only Counting)
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::site-counter.site-counter', ({ strapi }) => ({
    async increment(ctx) {
        const entryId = 1;
        try {
            const currentEntry = await strapi.db.query('api::site-counter.site-counter').findOne({ where: { id: entryId } });
            if (!currentEntry) {
                // ถ้าไม่มีข้อมูล ให้สร้างใหม่และ Publish ทันที
                const newEntry = await strapi.entityService.create('api::site-counter.site-counter', {
                    data: { id: entryId, views: 1, publishedAt: new Date() }
                });
                return { message: 'created and incremented', views: 1 };
            }
            const newViews = (currentEntry.views || 0) + 1;
            // อัปเดตค่า views และตั้งค่า publishedAt เป็นวันปัจจุบัน เพื่อบังคับ Publish
            await strapi.entityService.update('api::site-counter.site-counter', entryId, {
                data: {
                    views: newViews,
                    publishedAt: new Date().toISOString(),
                },
            });
            return { message: 'incremented', views: newViews };
        }
        catch (err) {
            console.error('Error in increment controller:', err);
            ctx.body = err;
        }
    }
}));
