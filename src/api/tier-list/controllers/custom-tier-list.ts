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
        populate: {
          tiers: {
            populate: {
              dps_characters: { populate: { tier_list_character: { populate: 'icon' } } },
              support_characters: { populate: { tier_list_character: { populate: 'icon' } } },
              def_characters: { populate: { tier_list_character: { populate: 'icon' } } },
            },
          },
        },
      });

      // --- นี่คือส่วนที่แก้ไข: เราจะแปลงข้อมูลก่อนส่งกลับไป ---
      const data = results.map(transformEntity);

      ctx.body = { data };

    } catch (err) {
      console.error("Error in custom controller:", err);
      ctx.body = err;
    }
  },
};