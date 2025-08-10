// src/api/migrate-data/routes/migrate-data.ts
export default {
  routes: [
    {
      method: 'POST',
      path: '/migrate-data',
      handler: 'migrate-data.migrate',
      config: {
        // Route นี้จะถูกป้องกันโดยระบบยืนยันตัวตนของ Strapi อัตโนมัติ
        // ผู้ใช้ต้องมี Token ที่ถูกต้องถึงจะเรียกใช้งานได้
      },
    },
  ],
};