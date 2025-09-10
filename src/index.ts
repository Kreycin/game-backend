// src/index.ts
'use strict';

// สร้าง Set สำหรับป้องกันการแจ้งเตือนซ้ำซ้อน
const processedAnnouncements = new Set();

export default {
  bootstrap({ strapi }) {
    strapi.eventHub.on('entry.publish', async ({ model, entry }) => {
      try {
        // [แก้ไข] เปลี่ยนเงื่อนไขให้ถูกต้องและรัดกุม
        if (model.singularName !== 'announcement') {
          return;
        }

        // [เพิ่ม] Logic ป้องกันการทำงานซ้ำ
        if (processedAnnouncements.has(entry.id)) {
          console.log(`[EventHub] 🟡 Ignoring duplicate publish event for announcement ID: ${entry.id}`);
          return;
        }
        processedAnnouncements.add(entry.id);

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

        // ลบ ID ออกหลังจากผ่านไป 5 วินาที
        setTimeout(() => {
          processedAnnouncements.delete(entry.id);
        }, 5000);

      } catch (error) {
        console.error('[EventHub] Error during entry.publish event:', error);
      }
    });
  },
};