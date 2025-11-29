import { os } from "@orpc/server";
import type { Database, UserRole } from "@repo/database";
import type { AuthSession } from "@repo/database/auth/server";
import z from "zod";

export type Meta = {
  roles?: UserRole[];
};

export const base = os
  .$context<{
    headers: Headers;
    db: Database;
    session?: AuthSession | null;
    userRole?: UserRole;
  }>()
  .errors({
    RATE_LIMIT_EXCEEDED: {
      status: 429,
      data: z.object({
        retryAfterSeconds: z
          .number()
          .describe("The number of seconds to wait before retrying."),
        totalRequests: z
          .number()
          .describe("The total number of requests made."),
        remainingRequests: z
          .number()
          .describe("The number of requests remaining."),
      }),
    },
    UNAUTHORIZED: {
      status: 401,
    },
    FORBIDDEN: {
      status: 403,
    },
  })
  .$meta<Meta>({ roles: undefined });
