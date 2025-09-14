// kreycin/game-backend/game-backend-5fc21ef3d609d1301319516fdcdfb29fc91df3dd/config/plugins.ts

export default ({ env }) => ({
  // --- ของเดิมที่คุณมี (Cloudinary) ---
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },

  // --- ของเดิมที่คุณมี (SendGrid) ---
  email: {
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: process.env.SENDGRID_API_KEY,
      },
      settings: {
        defaultFrom: 'kreycingame@gmail.com',
        defaultReplyTo: 'kreycingame@gmail.com',
      },
    },
  },

  // --- ส่วนของ Cache ที่เราเพิ่มเข้ามาใหม่ ---
  'rest-cache': {
    enabled: true,
    config: {
      provider: {
        name: 'memory',
        options: {
          maxAge: 81600, // แคชข้อมูลไว้ วินาที)
        },
      },
      strategy: {
        contentTypes: [
          // รายชื่อที่ได้จากการวิเคราะห์ Log
          'api::character.character',
          'api::tier-list.tier-list',
          'api::tier-list-guide.tier-list-guide',
        ],
      },
    },
  },
});