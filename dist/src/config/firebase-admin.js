"use strict";
// ✅ โค้ดใหม่สำหรับ: src/config/firebase-admin.ts
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
// เพิ่ม console.log เพื่อตรวจสอบว่าไฟล์นี้ถูกโหลดหรือไม่
console.log("--- [FIREBASE ADMIN LOADER - VERSION: PRODUCTION_READY] ---");
// ตรวจสอบว่าแอปเคยถูก initialize แล้วหรือยัง
if (admin.apps.length === 0) {
    try {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY;
        // ตรวจสอบว่า Environment Variables ที่จำเป็นสำหรับ Production มีครบหรือไม่
        if (process.env.NODE_ENV === 'production' && (!privateKey || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PROJECT_ID)) {
            throw new Error('Missing Firebase environment variables for production!');
        }
        // สร้าง object credential
        const credential = admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // บรรทัดนี้สำคัญมาก! ช่วยแก้ปัญหาการจัดรูปแบบ private key อัตโนมัติ
            privateKey: privateKey.replace(/\\n/g, '\n'),
        });
        // เริ่มการเชื่อมต่อ
        admin.initializeApp({ credential });
        console.log('✅ Firebase Admin has been initialized successfully from Environment Variables.');
    }
    catch (error) {
        console.error('🔥 Firebase Admin initialization error:', error.message);
        // ใน Production ควร log error ไว้ แต่ไม่ควรหยุดการทำงานของแอปทั้งหมด
        // process.exit(1); 
    }
}
exports.default = admin;
