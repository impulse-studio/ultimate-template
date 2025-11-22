import type { account, session, user, verification } from "./auth";

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Account = typeof account.$inferSelect;
export type Verification = typeof verification.$inferSelect;

export const USER_ROLES = {
  ADMIN: "admin",
  USER: "user",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
export const ALL_USER_ROLES = Object.values(USER_ROLES);
