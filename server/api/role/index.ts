import { roles } from '../../database/role';
import { db } from '../../db';
import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const method = event.req.method;
  const body = method === 'POST' ? await readBody(event) : null;

  if (method === 'GET') {
    // Get all roles
    const allRoles = await db.select().from(roles);
    return { roles: allRoles };
  }

  if (method === 'POST') {
    // Create new role
    const newRole = await db.insert(roles).values(body).returning();
    return { role: newRole[0] };
  }

  return { error: 'Method not allowed' };
});
