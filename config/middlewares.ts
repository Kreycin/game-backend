// config/middlewares.ts
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'http:', 'https:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            // เพิ่มโดเมนของ Cloudinary เข้าไปในรายการที่อนุญาต
            'res.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            // เพิ่มโดเมนของ Cloudinary เข้าไปในรายการที่อนุญาต
            'res.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  // vvvv นี่คือส่วนที่แก้ไข vvvv
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      headers: '*',
      origin: [
        'http://localhost:1337',
        'http://localhost:5173',
        'https://demonslayerhub.vercel.app',
        'https://newcharacterleaked.vercel.app'
      ]
    }
  },
  // ^^^^ สิ้นสุดส่วนที่แก้ไข ^^^^
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];