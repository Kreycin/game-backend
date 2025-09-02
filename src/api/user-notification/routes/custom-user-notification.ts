// src/api/user-notification/routes/custom-user-notification.ts

export default {
  routes: [
    {
      method: 'POST',
      path: '/user-notifications/upsert',
      handler: 'user-notification.upsert',
    }
  ]
};