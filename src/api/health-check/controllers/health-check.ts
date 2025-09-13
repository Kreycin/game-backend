// src/api/health-check/controllers/health-check.ts
export default {
  index: async (ctx) => {
    ctx.body = 'OK';
  },
};