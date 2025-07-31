import type { Config } from 'drizzle-kit';

export default {
  schema: './server/database/schema.ts', // path ke schema
  out: './drizzle/migrations',           // folder migration
  dialect: 'postgresql',                 // gunakan 'postgresql'
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;

