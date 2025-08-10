// config/middlewares.ts
module.exports = [
    'strapi::errors',
    {
        name: 'strapi::security',
        config: {
            contentSecurityPolicy: {
                useDefaults: true,
                directives: {
                    'connect-src': ["'self'", 'http:', 'https:'],
                    'img-src': [
                        "'self'",
                        'data:',
                        'blob:',
                        'market-assets.strapi.io',
                        'res.cloudinary.com',
                    ],
                    'media-src': [
                        "'self'",
                        'data:',
                        'blob:',
                        'market-assets.strapi.io',
                        'res.cloudinary.com',
                    ],
                    upgradeInsecureRequests: null,
                },
            },
        },
    },
    {
        name: 'strapi::cors',
        config: {
            headers: '*',
            origin: [
                'http://localhost:1337',
                'http://localhost:5173',
                'https://demonslayerhub.vercel.app',
                'https://newcharacterleaked.vercel.app'
            ]
        }
    },
    'strapi::poweredBy',
    'strapi::logger',
    {
        name: 'strapi::query',
        config: {
            qs: {
                depth: 10,
            },
        },
    },
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
];
