// ✅ โค้ดใหม่สำหรับ: src/config/firebase-admin.ts

import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

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

  } catch (error) {
    console.error('🔥 Firebase Admin initialization error:', error.message);
    // ใน Production ควร log error ไว้ แต่ไม่ควรหยุดการทำงานของแอปทั้งหมด
    // process.exit(1); 
  }
}

export default admin;