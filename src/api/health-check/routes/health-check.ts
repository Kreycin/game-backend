// src/api/health-check/routes/health-check.ts
export default {
  routes: [
    {
      method: 'GET',
      path: '/health-check',
      handler: 'health-check.index',
      config: {
        auth: false, // ไม่ต้อง login ก็เรียกได้
      },
    },
  ],
};