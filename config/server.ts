// config/server.ts

export default ({ env }) => {
  // สร้างตัวแปรมารับค่า config ก่อน return
  const serverConfig = {
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    url: env('URL'),
    // เพิ่มบรรทัดนี้: บอกให้ Strapi ทราบว่ามี proxy อยู่ด้านหน้า
    proxy: true,
    app: {
      keys: env.array('APP_KEYS'),
    },
    webhooks: {
      populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
    },
    admin: {
      // แก้ไขส่วนนี้: เพิ่ม auth secret และ proxy setting
      auth: {
        secret: env('ADMIN_JWT_SECRET'),
      },
      serveAdminPanel: true,
    },
    cron: {
      enabled: env.bool('CRON_ENABLED', false),
    },
  };

  // ==========================================================
  // == เพิ่มบรรทัดนี้เพื่อ Debug โดยเฉพาะ ==
  console.log('[DEBUG] Final cron config loaded:', serverConfig.cron);
  // ==========================================================

  return serverConfig;
};