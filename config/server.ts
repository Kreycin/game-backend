export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // --- ★★★ เพิ่มบรรทัดนี้เข้าไปตามแผน B ของเรา ★★★ ---
  url: 'https://game-backend-demonslayer.onrender.com', 
  app: {
    keys: env.array('APP_KEYS'),
  },
});