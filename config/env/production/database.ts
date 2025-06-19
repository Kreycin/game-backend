import path from 'path';

export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      connectionString: env('DATABASE_URL'),
    },
    debug: false,
  },
});
