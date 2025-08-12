"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// config/server.ts
exports.default = ({ env }) => ({
    host: env('HOST', '0.0.0.0'),
    port: env.int('PORT', 1337),
    app: {
        keys: env.array('APP_KEYS'),
    },
});
