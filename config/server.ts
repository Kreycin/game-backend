// config/server.ts

export default ({ env }) => {
  // สร้างตัวแปรมารับค่า config ก่อน return
  const serverConfig = {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: env('URL'),
    app: {
      keys: env.array('APP_KEYS'),
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
    admin: {
      serveAdminPanel: true,
    },
    cron: {
      // ลองเปลี่ยนให้รับค่าจาก ENV ได้ด้วย ถ้าไม่มีให้ default เป็น true
      enabled: env.bool('CRON_ENABLED', false),
    },
  };

  // ==========================================================
  // == เพิ่มบรรทัดนี้เพื่อ Debug โดยเฉพาะ ==
  console.log('[DEBUG] Final cron config loaded:', serverConfig.cron);
  // ==========================================================

  return serverConfig;
};