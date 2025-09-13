"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/health/controllers/health.ts
exports.default = {
    async check(ctx) {
        ctx.body = { status: 'ok' };
    },
};
