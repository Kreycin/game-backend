// src/api/notification-service/services/notification.ts
'use strict';

import * as admin from 'firebase-admin';

interface NotificationPayload {
  title: string;
  body: string;
}

export default {
  async send(tokens: string[], payload: { title: string; body: string }) {
    if (!tokens || tokens.length === 0) {
      console.log("[Notification Service] No tokens provided. Skipping send.");
      return { successCount: 0, failureCount: 0 };
    }

    const message = {
      notification: {
        title: payload.title,
        body: payload.body,
      },
      tokens: tokens,
      
      // เพิ่มการตั้งค่าสำหรับ Android/Web เพื่อให้แน่ใจว่าแสดงผลได้ดี
      android: {
        priority: "high" as "high",
         notification: {
          sound: 'default',
        },
      },
      // [เพิ่ม] เพิ่มการตั้งค่าเสียงสำหรับ Apple (iOS) ทั้งหมด
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
      webpush: {
        headers: {
          Urgency: "high",
        },
      },
      
    };

    // --- จุดดีบัก ---
    try {
      console.log(`[DEBUG] Attempting to send to ${tokens.length} tokens:`, tokens);
      const response = await admin.messaging().sendEachForMulticast(message); // หรือ sendMulticast

      // เพิ่ม Log รายละเอียดความสำเร็จและความล้มเหลว
      console.log(`[DEBUG] Firebase response received. Success: ${response.successCount}, Failed: ${response.failureCount}`);

      if (response.failureCount > 0) {
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            // นี่คือ Log ที่สำคัญที่สุด: แสดงรหัสข้อผิดพลาดสำหรับ Token ที่ล้มเหลว
            console.error(`[DEBUG] Failed to send to token: ${tokens[idx]}`);
            console.error(`[DEBUG] Error details: ${resp.error.code}`, resp.error.message);
          }
        });
      }

      return {
        successCount: response.successCount,
        failureCount: response.failureCount,
      };

    } catch (error) {
      // ดักจับ Error ที่เกิดก่อนการส่ง (เช่น การเชื่อมต่อล้มเหลว)
      console.error("[DEBUG] Critical error during Firebase send operation:", error);
      return { successCount: 0, failureCount: tokens.length };
    }
  },
};