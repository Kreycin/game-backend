// src/api/cron/controllers/cron.ts

export default {
  async trigger(ctx) {
    // 1. ตรวจสอบ Secret Key เพื่อความปลอดภัย
    const { key } = ctx.request.query;
    if (key !== process.env.CRON_SECRET_KEY) {
      return ctx.unauthorized('Invalid secret key');
    }

    // 2. ย้าย Logic จาก cron-tasks.ts มาไว้ที่นี่ทั้งหมด
    try {
      console.log('[External CRON] Trigger received. Running event notifier...');
      
      const now = new Date();
      // ... (นำ Logic การค้นหา Event และส่ง Notification ทั้งหมดมาวางที่นี่)
      // ตัวอย่าง:
      // const eventsToTrigger = await strapi.service('api::game-event.game-event').find(...);
      // for (const event of eventsToTrigger.results) { ... }

      // 3. ส่ง Response กลับไปว่าทำงานสำเร็จ
      return ctx.send({ message: 'Cron job executed successfully.' });

    } catch (error) {
      console.error('[External CRON] Error:', error);
      return ctx.internalServerError('An error occurred during cron job execution.');
    }
  },
};