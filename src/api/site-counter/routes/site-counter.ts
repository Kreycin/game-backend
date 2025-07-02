// src/api/site-counter/routes/site-counter.ts
export default {
  routes: [
    {
      method: 'GET',
      path: '/site-counter',
      handler: 'site-counter.find',
      config: {
        auth: false,
      },
    },
    {
      method: 'PUT',
      path: '/site-counter/increment',
      handler: 'site-counter.increment',
      config: {
        auth: false,
      },
    },
  ],
};