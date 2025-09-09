import { roles } from '../database/role';
import { db } from '../db';

export default defineEventHandler(async (event) => {
  // GET only: return all roles
  const allRoles = await db.select().from(roles);
  return { roles: allRoles };
});
