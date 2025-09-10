// src/api/cron/routes/cron.ts

export default {
  routes: [
    {
      method: 'GET',
      path: '/trigger-cron',
      handler: 'cron.trigger',
      config: {
        auth: false, // ไม่ต้องใช้ JWT token
      },
    },
  ],
};