export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      // <<< ปรับแก้บรรทัดนี้ >>>
      // ให้ใช้ค่าเดียวกับ apiToken.salt เพื่อแก้ปัญหา warning
      salt: env('API_TOKEN_SALT'),
    },
  },
  // ส่วนที่เหลือปล่อยไว้เหมือนเดิม
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});