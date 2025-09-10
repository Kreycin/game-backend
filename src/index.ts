// src/index.ts
'use strict';

const processedEntryIds = new Set();

export default {
  bootstrap({ strapi }) {
    console.log('🚀 Setting up event listeners with duplicate protection...');
    
    strapi.eventHub.on('entry.publish', async ({ model, entry }) => {
      // --- Log สำหรับตรวจสอบ: เริ่มต้น ---
      console.log('--- [Event: entry.publish] Received ---');
      console.log('[LOG] Event triggered for model:', model.singularName);
      console.log('[LOG] Entry ID:', entry ? entry.id : 'No Entry ID');
      // ------------------------------------

      try {
        if (!entry || !entry.id) {
          console.log('[LOG] 🔴 Entry or Entry ID is missing. Aborting.');
          return;
        }

        // --- Log สำหรับตรวจสอบ: การป้องกันซ้ำซ้อน ---
        console.log('[LOG] Checking for duplicate entry...');
        if (processedEntryIds.has(entry.id)) {
          console.log(`[LOG] 🟡 Duplicate detected for ID: ${entry.id}. Ignoring.`);
          return;
        }
        processedEntryIds.add(entry.id);
        console.log(`[LOG] ✅ Entry ID ${entry.id} is new. Proceeding.`);
        // ---------------------------------------------

        if (model.singularName === 'announcement') {
          console.log(`[LOG] ✅ Model is 'announcement'. Processing notification logic.`);
          
          const { title, message, server } = entry;
          const query = strapi.db.query('api::user-notification.user-notification');
          const whereClause = server === 'all' ? {} : { selectedServer: server };

          // --- Log สำหรับตรวจสอบ: การค้นหาผู้ใช้ ---
          console.log(`[LOG] 🔍 Querying for users with server: '${server}'`);
          const userNotifications = await query.findMany({ where: whereClause, select: ['fcmToken'] });
          console.log(`[LOG] 📝 Found ${userNotifications ? userNotifications.length : 0} user notification entries.`);
          // -----------------------------------------

          if (!userNotifications || userNotifications.length === 0) {
            console.log(`[LOG] 📪 No users found. Job finished for this entry.`);
          } else {
            const tokens = userNotifications.map(sub => sub.fcmToken).filter(Boolean);
            console.log(`[LOG] 📱 Found ${tokens.length} valid FCM tokens.`);

            if (tokens.length > 0) {
              const payload = { title, body: message };
              
              // --- Log สำหรับตรวจสอบ: การส่ง Notification ---
              console.log(`[LOG] 🚀 Preparing to send notification...`);
              await strapi.service('api::notification-service.notification').send(tokens, payload);
              console.log(`[LOG] ✅ Notification sent successfully.`);
              // ------------------------------------------
            }
          }
        } else {
            console.log(`[LOG] ⚪️ Model is not 'announcement' (${model.singularName}). Skipping.`);
        }

        setTimeout(() => {
          processedEntryIds.delete(entry.id);
          // --- Log สำหรับตรวจสอบ: การลบ ID ---
          console.log(`[LOG] 🕒 Cleared ID ${entry.id} from duplicate check set after 5 seconds.`);
          // ------------------------------------
        }, 5000);

      } catch (error) {
        if (entry && entry.id) {
          processedEntryIds.delete(entry.id);
        }
        console.error('[LOG] ❌ An error occurred in the event handler:', error);
      }
    });
  },
};