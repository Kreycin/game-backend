// src/index.ts
'use strict';

import path from 'path';

// [เพิ่ม] สร้าง Set ด้านนอกเพื่อ "จำ" ID ที่ถูก xử lý ไปแล้ว
const processedEntryIds = new Set();

export default {
  bootstrap({ strapi }) {
    // --- Firebase เหมือนเดิม (ไม่มีการเปลี่ยนแปลง) ---
    try {
      const firebaseAdminPath = path.resolve(__dirname, 'config', 'firebase-admin.js');
      const firebaseApp = require(firebaseAdminPath);
      strapi.firebase = firebaseApp;
      console.log('✅ Firebase Admin has been initialized and is ready.');
    } catch (error)
    {
      console.error('❌ Failed to initialize Firebase Admin in bootstrap:', error);
    }

    // --- ระบบ "ประกาศทันที" ที่เพิ่มการป้องกันการยิงซ้ำ ---
    console.log('🚀 Setting up Instant Announcement listener with duplicate protection...');
    strapi.eventHub.on('entry.publish', async ({ model, entry }) => {
      try {
        // [เพิ่ม] Logic ป้องกันการทำงานซ้ำ
        if (processedEntryIds.has(entry.id)) {
          console.log(`[EventHub] 🟡 Ignoring duplicate event for ID: ${entry.id}`);
          return; // ถ้า ID นี้เคยถูก xử lý แล้วใน 5 วินาทีที่ผ่านมา ให้ออกทันที
        }
        // ถ้ายังไม่เคย ให้ "จดจำ" ID นี้ไว้ก่อน
        processedEntryIds.add(entry.id);


        // [แก้ไข] เปลี่ยนเงื่อนไขการเช็ค model ให้ถูกต้อง
        if (model.singularName === 'announcement') {
          // --- โค้ดเดิมของคุณ (ไม่มีการเปลี่ยนแปลง) ---
          console.log(`[EventHub] 📢 Announcement published: "${entry.title}"`);

          const { title, message, server } = entry;
          const query = strapi.db.query('api::user-notification.user-notification');
          const whereClause = server === 'all' ? {} : { selectedServer: server };
          const userNotifications = await query.findMany({ where: whereClause, select: ['fcmToken'] });

          if (userNotifications.length === 0) {
            console.log(`[EventHub] 📪 No users found for server: '${server}'`);
            // [แก้ไข] ต้อง return ออกจากฟังก์ชันเมื่อไม่เจอผู้ใช้
            // และต้องลบ ID ออกจาก Set ด้วยเพื่อให้ลองใหม่ได้
            processedEntryIds.delete(entry.id);
            return;
          }

          const tokens = userNotifications.map(sub => sub.fcmToken).filter(Boolean);

          if (tokens.length > 0) {
            const payload = { title, body: message };
            console.log(`[EventHub] 🚀 Sending announcement to ${tokens.length} device(s)...`);
            await strapi.service('api::notification-service.notification').send(tokens, payload);
          }
        }

        // [เพิ่ม] หลังจาก 5 วินาที ให้ "ลืม" ID นี้
        setTimeout(() => {
          processedEntryIds.delete(entry.id);
        }, 5000); // 5 วินาที

      } catch (error) {
        // [เพิ่ม] หากเกิด Error ให้ "ลืม" ID นี้ทันที
        if (entry && entry.id) {
          processedEntryIds.delete(entry.id);
        }
        console.error('[EventHub] Error during entry.publish event:', error);
      }
    });
  },
};