"use strict";
// src/api/cron/controllers/cron.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    async trigger(ctx) {
        // 1. ตรวจสอบ Secret Key เพื่อความปลอดภัย
        const { key } = ctx.request.query;
        if (key !== process.env.CRON_SECRET_KEY) {
            return ctx.unauthorized('Invalid secret key');
        }
        // 2. เริ่มทำงานตาม Logic เดิม
        try {
            const now = new Date();
            console.log(`[External CRON] Task running at: ${now.toUTCString()}`);
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
                return ctx.send({ message: 'No potential events found. Job finished.' });
            }
            const eventsToTrigger = potentialEvents.filter(event => {
                if (!event.timeUTC)
                    return false;
                const [eventHour, eventMinute] = event.timeUTC.split(':').map(Number);
                return eventHour === currentHourUTC && eventMinute === currentMinuteUTC;
            });
            if (eventsToTrigger.length === 0) {
                return ctx.send({ message: 'No events to trigger at this exact minute. Job finished.' });
            }
            console.log(`[External CRON] 🎯 Found ${eventsToTrigger.length} event(s) to notify.`);
            // Loop และส่ง Notification
            for (const event of eventsToTrigger) {
                const userNotifications = await strapi.db.query('api::user-notification.user-notification').findMany({
                    where: { selectedServer: event.server },
                    select: ['fcmToken'],
                });
                if (userNotifications.length === 0) {
                    console.log(`[External CRON] 📪 No users in server '${event.server}' for event '${event.eventName}'`);
                    continue;
                }
                const tokens = userNotifications.map(sub => sub.fcmToken).filter(Boolean);
                if (tokens.length === 0) {
                    console.log(`[External CRON] 📪 No valid tokens for server '${event.server}'`);
                    continue;
                }
                const payload = {
                    title: event.eventName,
                    body: event.eventMessage,
                };
                console.log(`[External CRON] 🚀 Sending notification for '${event.eventName}' to ${tokens.length} device(s)...`);
                await strapi.service('api::notification-service.notification').send(tokens, payload);
            }
            return ctx.send({ message: 'Cron job executed successfully.' });
        }
        catch (error) {
            console.error('[External CRON] Error:', error);
            return ctx.internalServerError('An error occurred during cron job execution.');
        }
    },
};
