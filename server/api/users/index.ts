import { users } from '../../database/users';
import { user_identity } from '../../database/user_identity';
import { db } from '../../db';
import { eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const body = method === 'POST' ? await readBody(event) : null;

  if (method === 'GET') {
    // Get all users with foto_url from user_identity
    const allUsers = await db
      .select({
        id: users.id,
        email: users.email,
        full_name: users.full_name,
        role: users.role,
        role_id: users.role_id,
        nip: users.nip,
        is_active: users.is_active,
        avatar_seed: users.avatar_seed,
        is_verified: users.is_verified,
        created_at: users.created_at,
        foto_url: user_identity.foto_url
      })
      .from(users)
      .leftJoin(user_identity, eq(users.id, user_identity.user_id));
    return { users: allUsers };
  }

  if (method === 'POST') {
    // Create new user
    const newUser = await db.insert(users).values(body).returning();
    return { user: newUser[0] };
  }

  return { error: 'Method not allowed' };
});
