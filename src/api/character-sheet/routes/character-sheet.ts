// path: src/api/character-sheet/routes/character-sheet.ts
export default {
  routes: [
    {
      method: 'GET',
      path: '/character-sheet', // นี่คือ URL ใหม่ของเรา
      handler: 'character-sheet.find', // บอกให้ไปเรียกใช้ฟังก์ชัน find ที่เราสร้างใน controller
      config: {
        auth: false, // ทำให้ทุกคนเข้าถึงได้ ไม่ต้องล็อกอิน
      },
    },
  ],
};