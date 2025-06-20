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
            'res.cloudinary.com', // <--- บอกให้โหลดรูปจาก Cloudinary ได้
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'res.cloudinary.com', // <--- บอกให้โหลดวิดีโอ/สื่อจาก Cloudinary ได้
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
        'https://demonslayergame-hub.vercel.app' 
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