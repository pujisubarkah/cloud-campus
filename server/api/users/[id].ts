import { users } from '../../database/users';
import { db } from '../../db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const id = event.context.params?.id;
  const body = (method === 'PUT' || method === 'DELETE') ? await readBody(event) : null;

  if (!id) return { error: 'User ID is required' };

  if (method === 'GET') {
    // Get user by ID
    const user = await db.select().from(users).where(eq(users.id, id));
    return { user: user[0] };
  }

  if (method === 'PUT') {
    // Update user by ID
    const updated = await db.update(users).set(body).where(eq(users.id, id)).returning();
    return { user: updated[0] };
  }

  if (method === 'DELETE') {
    // Delete user by ID
    const deleted = await db.delete(users).where(eq(users.id, id)).returning();
    if (!deleted.length) {
      return { error: 'User not found or already deleted' };
    }
    return { success: true };
  }

  return { error: 'Method not allowed' };
});
