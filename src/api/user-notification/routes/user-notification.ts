// src/api/user-notification/routes/user-notification.ts
'use strict';

/**
 * user-notification router.
 */

import { factories } from '@strapi/strapi';

// ไฟล์นี้จะสร้างเฉพาะ routes พื้นฐานของ Strapi เท่านั้น
export default factories.createCoreRouter('api::user-notification.user-notification');