// src/api/user-notification/services/user-notification.ts
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * user-notification service
 */
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreService('api::user-notification.user-notification');
