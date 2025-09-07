// src/api/user-notification/controllers/user-notification.ts
'use strict';

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::user-notification.user-notification', ({ strapi }) => ({
  /**
   * Custom 'upsert' action.
   * New Logic: Ensures one FCM token exists only once in the database.
   */
  async upsert(ctx) {
    const { user } = ctx.state;
    if (!user) {
      return ctx.unauthorized('You must be logged in.');
    }

    const { fcmToken, selectedServer } = ctx.request.body as { fcmToken: string; selectedServer: string; };

    // --- [จุดดีบักที่เพิ่มเข้ามา] ---
    // Log fcmToken ที่ได้รับมาทันที เพื่อตรวจสอบว่าค่าที่ได้จาก Frontend ถูกต้องหรือไม่
    console.log(`[DEBUG] upsert: Received fcmToken for user ${user.id}: "${fcmToken}"`);
    // ---

    if (!fcmToken || !selectedServer) {
      console.warn(`[DEBUG] upsert: Missing data for user ${user.id}. Token or Server empty.`);
      return ctx.badRequest('fcmToken and selectedServer are required.');
    }

    try {
      const notificationQuery = strapi.db.query('api::user-notification.user-notification');

      // 1. ค้นหาด้วย fcmToken ก่อน เพื่อให้แน่ใจว่า Token นี้ไม่ซ้ำ
      const existingEntryByToken = await notificationQuery.findOne({
        where: { fcmToken },
      });

      if (existingEntryByToken) {
        // 2. ถ้าเจอ Token นี้อยู่แล้ว ให้อัปเดตข้อมูลเป็นของ User คนปัจจุบัน
        const updatedEntry = await notificationQuery.update({
          where: { id: existingEntryByToken.id },
          data: {
            selectedServer,
            user: user.id,
          },
        });
        // Log เดิมของคุณดีอยู่แล้ว
        console.log(`[Notification] Updated settings for existing token, user: ${user.id}`);
        return ctx.send(updatedEntry);
      } else {
        // 3. ถ้าไม่เจอ Token นี้ ให้ลบของเก่าของ User คนนี้ (ถ้ามี) แล้วสร้างใหม่
        await notificationQuery.delete({
          where: { user: user.id },
        });

        const newEntry = await notificationQuery.create({
          data: {
            fcmToken,
            selectedServer,
            user: user.id,
          },
        });
        // Log เดิมของคุณดีอยู่แล้ว
        console.log(`[Notification] Created new settings for user: ${user.id}`);
        return ctx.send(newEntry);
      }
    } catch (error) {
      console.error('[Error] user-notification upsert failed:', error);
      return ctx.internalServerError('An error occurred while saving notification settings.');
    }
  },
}));