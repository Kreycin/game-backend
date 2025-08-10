'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * character-sheet router
 */
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/character-sheet',
            handler: 'character-sheet.find',
        },
    ],
};
