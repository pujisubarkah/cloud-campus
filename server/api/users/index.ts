import { users } from '../../database/users';
import { db } from '../../db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const body = method === 'POST' ? await readBody(event) : null;

  if (method === 'GET') {
    // Get all users
    const allUsers = await db.select().from(users);
    return { users: allUsers };
  }

  if (method === 'POST') {
    // Create new user
    const newUser = await db.insert(users).values(body).returning();
    return { user: newUser[0] };
  }

  return { error: 'Method not allowed' };
});
