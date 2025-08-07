'use strict';

/**
 * A custom controller for the tier-list.
 */

// Helper function to transform the data structure
const transformEntity = (entity) => {
  if (!entity) return null;
  const { id, createdAt, updatedAt, publishedAt, ...attributes } = entity;
  return { id, attributes };
};


export default {
  async findPublic(ctx) {
    try {
      const results = await (strapi as any).entityService.findMany('api::tier-list.tier-list', {
        // --- นี่คือส่วนที่แก้ไข ---
        populate: {
          tiers: {
            populate: {
              dps_characters: { 
                populate: { 
                  tier_list_character: { 
                    // บอกให้ดึงข้อมูล icon และ field ใหม่ๆ ทั้งหมด
                    populate: ['icon', 'condition', 'condition_detail', 'highlight'] 
                  } 
                } 
              },
              support_characters: { 
                populate: { 
                  tier_list_character: { 
                    populate: ['icon', 'condition', 'condition_detail', 'highlight'] 
                  } 
                } 
              },
              def_characters: { 
                populate: { 
                  tier_list_character: { 
                    populate: ['icon', 'condition', 'condition_detail', 'highlight'] 
                  } 
                } 
              },
            },
          },
        },
        // -------------------------
      });

      const data = results.map(transformEntity);

      ctx.body = { data };

    } catch (err) {
      console.error("Error in custom controller:", err);
      ctx.body = err;
    }
  },
};