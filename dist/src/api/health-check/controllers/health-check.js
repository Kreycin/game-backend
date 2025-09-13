"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/health-check/controllers/health-check.ts
exports.default = {
    index: async (ctx) => {
        ctx.body = 'OK';
    },
};
