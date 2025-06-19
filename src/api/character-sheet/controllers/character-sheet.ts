'use strict';

export default {
  find: async (ctx) => {
    try {
      const data = await strapi.entityService.findMany('api::character.character', {
        
        // --- ★★★ โค้ด Populate ที่ถูกต้องสำหรับ TypeScript ★★★ ---
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
        // ----------------------------------------------------

      });
      ctx.body = { data };
    } catch (err) {
      ctx.body = err;
    }
  },
};