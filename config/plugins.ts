// config/plugins.ts

export default ({ env }) => {
  //
  // ✅ ตำแหน่งที่ถูกต้องของ "กล้องวงจรปิด" คือตรงนี้
  // คือ "ก่อน" ที่จะ return object ครับ
  //

  // "เอกสารข้อมูล" เริ่มต้นตรงนี้
  return {
    // --- ของเดิมที่คุณมี ---
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
    
    // --- ส่วนของ email ที่เราเพิ่ม ---
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
  };
};