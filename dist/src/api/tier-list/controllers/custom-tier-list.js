'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A custom controller for the tier-list.
 */
// Helper function to transform the data structure
const transformEntity = (entity) => {
    if (!entity)
        return null;
    const { id, createdAt, updatedAt, publishedAt, ...attributes } = entity;
    return { id, attributes };
};
exports.default = {
    async findPublic(ctx) {
        try {
            const results = await strapi.entityService.findMany('api::tier-list.tier-list', {
                populate: {
                    tiers: {
                        populate: {
                            // --- ส่วนแก้ไข: ใช้ '*' เพื่อดึงข้อมูลทุก field ของตัวละคร ---
                            dps_characters: { populate: { tier_list_character: { populate: '*' } } },
                            support_characters: { populate: { tier_list_character: { populate: '*' } } },
                            def_characters: { populate: { tier_list_character: { populate: '*' } } },
                        },
                    },
                },
            });
            const data = results.map(transformEntity);
            ctx.body = { data };
        }
        catch (err) {
            // --- ส่วนแก้ไข: เพิ่มการจัดการ Error ที่ดีขึ้น ---
            console.error("Error in custom controller:", err);
            ctx.status = 500;
            ctx.body = {
                data: null,
                error: {
                    status: 500,
                    name: 'InternalServerError',
                    message: err.message || 'An error occurred in the custom controller.',
                    details: err,
                },
            };
        }
    },
};
