// config/server.ts

// 2. Export ค่า Config ทั้งหมดออกมา
// kreycin/game-backend/config/server.ts

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('URL'), // เพิ่มบรรทัดนี้
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // เพิ่มส่วนนี้เข้าไปทั้งหมด
  admin: {
    serveAdminPanel: true,
  },
  cron: {
    enabled: true,
  },
});