'use strict';

/**
 * character-sheet router
 */

export default {
  routes: [
    {
      method: 'GET',
      path: '/character-sheet',
      handler: 'character-sheet.find',
    },
  ],
};