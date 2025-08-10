"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// test-sendgrid.ts
require("dotenv/config"); // ใช้ dotenv เพื่ออ่านไฟล์ .env ของเรา
const mail_1 = __importDefault(require("@sendgrid/mail"));
// ดึง Key จาก .env เหมือนที่ Strapi ทำ
const myApiKey = process.env.SENDGRID_API_KEY;
// ถ้าหา Key ไม่เจอ ให้แจ้งเตือน
if (!myApiKey) {
    console.error('หา SENDGRID_API_KEY ไม่เจอในไฟล์ .env!');
    process.exit(1); // ออกจากโปรแกรมทันทีถ้าไม่มี Key
}
mail_1.default.setApiKey(myApiKey);
// สร้างข้อความอีเมล
const msg = {
    to: 'kreycingame@gmail.com', // << ลองส่งหาตัวเอง
    from: 'kreycingame@gmail.com', // << ต้องเป็นอีเมลที่ Verified แล้วใน SendGrid
    subject: 'Test Email from Strapi Project (TypeScript)',
    text: 'Hello! If you receive this email, it means your SendGrid API Key and Sender are working correctly.',
};
console.log('กำลังพยายามส่งอีเมล (จากไฟล์ .ts)...');
// สั่งให้ SendGrid ส่งอีเมล
mail_1.default
    .send(msg)
    .then(() => {
    console.log('✅✅✅ ส่งอีเมลสำเร็จแล้ว! ✅✅✅');
    console.log('กรุณาไปเช็คในกล่องจดหมายของคุณ');
})
    .catch((error) => {
    console.error('❌❌❌ เกิดข้อผิดพลาดในการส่งอีเมล ❌❌❌');
    // แสดง Error ที่ได้รับกลับมาจาก SendGrid โดยตรง
    if (error.response) {
        console.error(JSON.stringify(error.response.body, null, 2));
    }
    else {
        console.error(error.toString());
    }
});
