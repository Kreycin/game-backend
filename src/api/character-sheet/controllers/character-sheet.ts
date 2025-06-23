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
              // In here, we only populate the 'skill' relation.
              // 'Description' is a simple field and will be fetched automatically.
              populate: {
                // REMOVED 'Description: true' FROM HERE
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
        populate: populateOptions
      });

      const transformedData = entities.map(entity => {
        const { id, ...attributes } = entity;
        return { id, attributes };
      });

      ctx.body = { data: transformedData };

    } catch (err) {
      console.error('--- [DEBUG] An error occurred in the final controller:', err);
      ctx.body = err;
    }
  }
};