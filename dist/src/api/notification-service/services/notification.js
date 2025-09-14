// src/api/notification-service/services/notification.ts
'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = __importStar(require("firebase-admin"));
exports.default = {
    async send(tokens, payload) {
        if (!tokens || tokens.length === 0) {
            console.log("[Notification Service] No tokens provided. Skipping send.");
            return { successCount: 0, failureCount: 0 };
        }
        const message = {
            data: {
                title: payload.title,
                body: payload.body,
                sound: 'titlecard'
            },
            tokens: tokens,
            // เพิ่มการตั้งค่าสำหรับ Android/Web เพื่อให้แน่ใจว่าแสดงผลได้ดี
            android: {
                priority: "high",
            },
            // [เพิ่ม] เพิ่มการตั้งค่าเสียงสำหรับ Apple (iOS) ทั้งหมด
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
        }
        catch (error) {
            // ดักจับ Error ที่เกิดก่อนการส่ง (เช่น การเชื่อมต่อล้มเหลว)
            console.error("[DEBUG] Critical error during Firebase send operation:", error);
            return { successCount: 0, failureCount: tokens.length };
        }
    },
};
