// src/index.ts
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    bootstrap({ strapi }) {
        console.log('🚀 Setting up Instant Announcement listener (Original Working Version)...');
        strapi.eventHub.on('entry.publish', async ({ model, entry }) => {
            try {
                // [แก้ไข] ใช้ model.uid ในการตรวจสอบ ซึ่งเป็นวิธีที่แน่นอนกว่า
                if (model.uid === 'api::announcement.announcement') {
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
            }
            catch (error) {
                console.error('[EventHub] An error occurred:', error);
            }
        });
    },
};
