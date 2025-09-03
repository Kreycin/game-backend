"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 1. กำหนด Task ของ Cron Job ทั้งหมดไว้ที่นี่
exports.default = {
    eventNotifier: {
        task: async ({ strapi }) => {
            const now = new Date();
            console.log(`[CRON] เริ่มทำงาน: ${now.toUTCString()}`);
            try {
                const currentDayUTC = now.getUTCDay();
                const currentHourUTC = now.getUTCHours();
                const currentMinuteUTC = now.getUTCMinutes();
                const potentialEvents = await strapi.db.query('api::game-event.game-event').findMany({
                    where: {
                        publishedAt: { $notNull: true },
                        $or: [
                            { eventType: 'Daily' },
                            { eventType: 'Weekly', dayOfWeekUTC: currentDayUTC },
                        ],
                    },
                });
                if (!potentialEvents || potentialEvents.length === 0) {
                    return;
                }
                const eventsToTrigger = potentialEvents.filter(event => {
                    if (!event.timeUTC)
                        return false;
                    const [eventHour, eventMinute] = event.timeUTC.split(':').map(Number);
                    return eventHour === currentHourUTC && eventMinute === currentMinuteUTC;
                });
                if (eventsToTrigger.length === 0) {
                    return;
                }
                console.log(`[CRON] 🎯 พบ ${eventsToTrigger.length} อีเวนต์ที่จะต้องแจ้งเตือนตอนนี้!`);
                for (const event of eventsToTrigger) {
                    const userNotifications = await strapi.db.query('api::user-notification.user-notification').findMany({
                        where: { selectedServer: event.server },
                        select: ['fcmToken'],
                    });
                    if (userNotifications.length === 0) {
                        console.log(`[CRON] 📪 ไม่มีผู้ใช้ใน server '${event.server}' สำหรับอีเวนต์ '${event.eventName}'`);
                        continue;
                    }
                    const tokens = userNotifications.map(sub => sub.fcmToken).filter(Boolean);
                    if (tokens.length === 0) {
                        console.log(`[CRON] 📪 ไม่มี token ที่ถูกต้องสำหรับ server '${event.server}'`);
                        continue;
                    }
                    const payload = {
                        title: event.eventName,
                        body: event.eventMessage,
                    };
                    console.log(`[CRON] 🚀 กำลังส่งแจ้งเตือน '${event.eventName}' ไปยัง ${tokens.length} อุปกรณ์...`);
                    await strapi.service('api::notification-service.notification').send(tokens, payload);
                }
            }
            catch (error) {
                console.error('[CRON] ❌ เกิดข้อผิดพลาด:', error);
            }
        },
        options: {
            rule: "*/1 * * * *", // ทำงานทุก 1 นาที
        },
    },
};
