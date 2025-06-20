// path: src/api/character-sheet/controllers/character-sheet.ts

'use strict';

export default {
  find: async (ctx) => {
    try {
      // ใช้ 'deep' เพื่อให้ populate ข้อมูลทั้งหมดที่ซ้อนกันอยู่
      const entities = await strapi.entityService.findMany('api::character.character', {
        populate: 'deep', 
      });

      // ★★★ นี่คือขั้นตอนสำคัญที่ขาดไป ★★★
      // เราจะแปลงข้อมูลให้อยู่ในรูปแบบ { id, attributes: { ... } }
      // เหมือนกับที่ API ปกติของ Strapi ทำ เพื่อให้ Frontend ทำงานได้
      const transformedData = entities.map(entity => {
        const { id, createdBy, updatedBy, createdAt, updatedAt, publishedAt, ...attributes } = entity;
        return { id, attributes };
      });

      ctx.body = { data: transformedData };
    } catch (err) {
      // Log error ที่ฝั่ง server เพื่อให้เห็นปัญหาได้ง่ายขึ้น
      console.error(err);
      ctx.body = err;
    }
  },
};