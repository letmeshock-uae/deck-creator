import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import * as schema from './schema';

// Use the Vercel Postgres client connected via POSTGRES_URL
export const db = drizzle(sql, { schema });
