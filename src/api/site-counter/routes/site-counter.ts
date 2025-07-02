export default {
  routes: [
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