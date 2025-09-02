// src/api/notification-service/services/notification.ts
'use strict';

import * as admin from 'firebase-admin';

interface NotificationPayload {
  title: string;
  body: string;
}

export default ({ strapi }) => ({
  /**
   * Sends a notification to a list of FCM tokens.
   * @param {string[]} tokens - An array of FCM registration tokens.
   * @param {NotificationPayload} payload - The notification title and body.
   */
  async send(tokens: string[], payload: NotificationPayload) {
    if (!tokens || tokens.length === 0) {
      console.log('[Notification Service] No tokens provided. Skipping sending.');
      return { success: true, message: "No tokens to send to." };
    }

    // --- FIX: เรียกใช้ firebaseApp ผ่าน strapi object ---
    const firebaseApp = strapi.firebase;
    // --------------------------------------------------

    const message: admin.messaging.MulticastMessage = {
      notification: {
        title: payload.title,
        body: payload.body,
      },
      tokens: tokens,
    };

    try {
      const response = await firebaseApp.messaging().sendEachForMulticast(message);
      console.log(`[Notification Service] 🚀 Sent notifications. Success: ${response.successCount}, Failed: ${response.failureCount}`);
      
      return {
        success: true,
        successCount: response.successCount,
        failureCount: response.failureCount,
      };
    } catch (error) {
      console.error('[Notification Service] ❌ Error sending message via Firebase:', error);
      return { success: false, error: error.message };
    }
  },
});