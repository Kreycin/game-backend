// src/api/migrate-data/controllers/migrate-data.ts

export default {
  // นี่คือฟังก์ชันหลักของ "แผนกรับของ" ของเรา
  async migrate(ctx: any) {
    try {
      // 1. เช็ค "บัตรพนักงาน" ของคนที่ส่งของมา (คนที่ล็อกอินอยู่)
      const user = ctx.state.user;
      if (!user) {
        // ถ้าไม่มีบัตร ให้ไล่กลับไปเลย
        return ctx.unauthorized('You must be logged in to migrate data.');
      }

      // 2. เปิด "กล่องพัสดุ" (request body) ที่ Frontend ส่งมาดูว่ามีอะไรบ้าง
      const { builds, settings } = ctx.request.body;

      console.log(`[Backend] ได้รับคำขอย้ายข้อมูลจาก User ID: ${user.id}`);

      // 3. เริ่มย้ายข้อมูล "Builds" (ถ้ามี)
      if (builds && builds.length > 0) {
        console.log(`[Backend] กำลังย้ายข้อมูล Builds จำนวน ${builds.length} ชิ้น...`);
        for (const build of builds) {
          // *** สำคัญ: แก้ 'api::build.build' ให้ตรงกับชื่อ API ของ Build ที่คุณมี ***
          // ตัวอย่าง: ถ้า Collection ของคุณชื่อ "CharacterBuild" ชื่อ API อาจจะเป็น "api::character-build.character-build"
          await strapi.entityService.create('api::build.build' as any , {
            data: {
              ...build,
              // ...ใส่ข้อมูลของ build ตามปกติ...
              // Title: build.Title,
              // Description: build.Description,

              // *** สำคัญที่สุด: ประทับตราว่าของชิ้นนี้เป็นของ "พนักงาน" คนไหน ***
              users_permissions_user: user.id, // หรือชื่อ field relation ที่คุณตั้งไว้
              publishedAt: new Date().toISOString(), // สั่งให้ Publish ทันที
            },
          });
        }
      }

      // (ในอนาคต) ทำเช่นเดียวกันกับ Settings

      // 4. ส่งข้อความกลับไปบอก Frontend ว่า "รับของเรียบร้อย"
      return ctx.send({ message: 'Data migrated successfully!' });

    } catch (error) {
      console.error('[Backend] Migration failed:', error);
      return ctx.badRequest('Migration failed.', { details: error.message });
    }
  },
};