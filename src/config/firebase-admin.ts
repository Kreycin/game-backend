// src/config/firebase-admin.ts

import * as admin from 'firebase-admin';
import * as path from 'path';

// **สำคัญ:** ตรวจสอบให้แน่ใจว่า path ไปยัง service account key ของคุณถูกต้อง
// path นี้อ้างอิงจากโฟลเดอร์ config นอกสุด ไม่ใช่ใน src
const serviceAccountPath = path.resolve(
  __dirname,
  '../../../config/firebase-service-account.json'
);

let app: admin.app.App;

// ป้องกันการ initializeApp ซ้ำซ้อนตอน hot-reload
if (!admin.apps.length) {
  try {
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccountPath),
    });
  } catch (error) {
    console.error('!!! FIREBASE ADMIN INITIALIZATION ERROR !!!');
    console.error('Please ensure the service account file exists at the specified path and is valid.');
    console.error(error);
    // ทำให้แอปหยุดทำงานถ้าเชื่อมต่อ Firebase ไม่ได้ เพื่อป้องกันปัญหาอื่นๆ ตามมา
    process.exit(1);
  }
} else {
  app = admin.app();
}

// ใช้ export = app; เพื่อให้เข้ากับระบบ build ของ Strapi และไฟล์ index.ts ได้ดีที่สุด
export = app;