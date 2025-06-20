export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  // บรรทัดนี้สำคัญที่สุด! 
  // ต้องมี 'url' และค่าของมันต้องเป็น URL ของ Render backend
  url: 'https://game-backend-demonslayer.onrender.com', 

  app: {
    keys: env.array('APP_KEYS'),
  },
});