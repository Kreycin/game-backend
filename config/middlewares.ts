// path: config/middlewares.ts
export default [
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // ไม่ต้องมี enabled: true แล้วครับ
      origin: [
        'http://localhost:5173', 
        'http://localhost:1337',
        // --- ★★★ เพิ่ม URL ของเว็บ Vercel ของนายตรงนี้เลย! ★★★ ---
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
