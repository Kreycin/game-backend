// config/middlewares.ts
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: { /* ... */ },
  },
  {
    name: 'strapi::cors',
    config: {
      headers: '*',
      origin: [
        'http://localhost:1337',
        'http://localhost:5173', // สำหรับ Local Dev
        'https://newcharacterleaked.vercel.app',
        'https://demonslayerhub.vercel.app' // สำหรับ Production

      ]
    }
  },
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query', // กลับไปใช้แบบง่ายๆ ได้
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];