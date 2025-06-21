// path: src/api/character-sheet/controllers/character-sheet.ts

'use strict';

export default {
  find: async (ctx) => {
    try {
      // 1. กลับมาใช้ populate object แบบเต็มที่ถูกต้อง
      const entities = await strapi.entityService.findMany('api::character.character', {
        populate: {
          Main_Art: true,
          Avatar: true,
          skills: {
            populate: {
              Skill_Icon: true,
              skill_effects: {
                populate: {
                  Effect_Icon: true
                }
              }
            }
          },
          enhancements: {
            populate: {
              Enhancement_Icon: true
            }
          }
        }
      });

      // 2. ใช้วิธีแปลงข้อมูลที่ปลอดภัยและถูกต้องกว่าเดิม
      const transformedData = entities.map(entity => {
        const { id, ...attributes } = entity;
        return { id, attributes };
      });

      ctx.body = { data: transformedData };
    } catch (err) {
      console.error(err);
      ctx.body = err;
    }
  },
};