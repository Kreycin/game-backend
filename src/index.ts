// src/index.ts
'use strict';

import path from 'path';

export default {
  bootstrap({ strapi }) {
    // --- Firebase เหมือนเดิม ---
    try {
      const firebaseAdminPath = path.resolve(__dirname, 'config', 'firebase-admin.js');
      const firebaseApp = require(firebaseAdminPath);
      strapi.firebase = firebaseApp;
      console.log('✅ Firebase Admin has been initialized and is ready.');
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin in bootstrap:', error);
    }

    // --- ระบบ "ประกาศทันที" เวอร์ชันสมบูรณ์ ---
    console.log('🚀 Setting up Instant Announcement listener...');
    strapi.eventHub.on('entry.publish', async ({ model, entry }) => {

      // --- FIX: เปลี่ยนเงื่อนไขให้ตรงกับข้อมูลที่เจอ ---
      if (model === 'announcement') {
      // ---------------------------------------------
        console.log(`[EventHub] 📢 Announcement published: "${entry.title}"`);

        const { title, message, server } = entry;
        const query = strapi.db.query('api::user-notification.user-notification');
        const whereClause = server === 'all' ? {} : { selectedServer: server };
        const userNotifications = await query.findMany({ where: whereClause, select: ['fcmToken'] });

        if (userNotifications.length === 0) {
          console.log(`[EventHub] 📪 No users found for server: '${server}'`);
          return;
        }

        const tokens = userNotifications.map(sub => sub.fcmToken).filter(Boolean);

        if (tokens.length > 0) {
          const payload = { title, body: message };
          console.log(`[EventHub] 🚀 Sending announcement to ${tokens.length} device(s)...`);
          await strapi.service('api::notification-service.notification').send(tokens, payload);
        }
      }
    });
  },
};