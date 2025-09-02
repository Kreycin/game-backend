// src/api/user-notification/routes/user-notification.ts
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * user-notification router.
 */
const strapi_1 = require("@strapi/strapi");
// ไฟล์นี้จะสร้างเฉพาะ routes พื้นฐานของ Strapi เท่านั้น
exports.default = strapi_1.factories.createCoreRouter('api::user-notification.user-notification');
