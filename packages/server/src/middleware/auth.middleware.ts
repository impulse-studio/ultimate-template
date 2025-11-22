import type { UserRole } from "@repo/database";
import { getServerSession } from "../utils/auth";
import { base } from "../context";

export const authMiddleware = base.middleware(async (opts) => {
  const { next, procedure, errors, context } = opts;

  const session = context.session ?? (await getServerSession());

  // Authentication check
  if (!session) {
    throw errors.UNAUTHORIZED();
  }

  // Role check
  const cachedUserRole = session.user.role as UserRole | undefined;

  if (procedure["~orpc"].meta.roles) {
    const requiredRoles = procedure["~orpc"].meta.roles;

    if (requiredRoles && requiredRoles.length > 0) {
      const userRole = cachedUserRole;
      if (!userRole) {
        throw errors.UNAUTHORIZED();
      }
      if (!requiredRoles.includes(userRole)) {
        throw errors.FORBIDDEN();
      }
    }
  }

  return next({
    context: {
      ...context,
      session,
      userRole: cachedUserRole,
    },
  });
});
