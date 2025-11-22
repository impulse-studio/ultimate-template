import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../database";
import { getBaseUrl } from "./utils";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  baseURL: getBaseUrl(),
  trustedOrigins: [getBaseUrl()],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [admin(), nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;