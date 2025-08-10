"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/api/site-counter/routes/site-counter.ts
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/site-counter',
            handler: 'site-counter.find',
            config: { auth: false },
        },
        {
            method: 'PUT',
            path: '/site-counter/increment',
            handler: 'site-counter.increment',
            config: { auth: false },
        },
    ],
};
