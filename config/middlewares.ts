// path: game-backend/config/middlewares.ts

export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:5173', 
        'http://localhost:1337',
        'https://demonslayergame-hub.vercel.app', // URL เก่า
        'https://game-frontend-red.vercel.app',   // URL ที่สร้างใหม่ตอนแรก
        'https://demonslayer-character-hub.vercel.app' // ★★★ URL ปัจจุบันที่ถูกต้อง ★★★
      ],
      headers: '*',
    },
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];