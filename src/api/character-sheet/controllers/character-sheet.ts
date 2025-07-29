'use strict';

export default {
  find: async (ctx) => {
    try {
      const populateOptions: any = {
        Main_Art: true,
        Avatar: true,
        Star_Levels: {
          populate: {
            enhancements: {
              populate: {
                Enhancement_Icon: true,
              }
            },
            skill_descriptions: {
              populate: {
                skill: {
                  populate: {
                    Skill_Icon: true,
                    effects: {
                      populate: {
                        Effect_Icon: true,
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };

      const entities = await strapi.entityService.findMany('api::character.character', {
        populate: populateOptions,
        sort: { updatedAt: 'desc' }

      });

      const transformedData = entities.map(entity => {
        const { id, ...attributes } = entity;
        return { id, attributes };
      });

      ctx.body = { data: transformedData };

    } catch (err) {
      console.error('--- [DEBUG] An error occurred in the controller:', err);
      // ปรับปรุงการจัดการ Error ให้ปลอดภัยขึ้น
      ctx.internalServerError('An unexpected error occurred.');
    }
  }
};