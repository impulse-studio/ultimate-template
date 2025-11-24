import { z } from "zod";

export const serverVariables = {
  BETTER_AUTH_SECRET: z.string(),

  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url(),

  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),

  VERCEL_URL: z.string().optional(),
  VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
  VERCEL_BRANCH_URL: z.string().optional(),
  VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
};

export const clientVariables = {
  NEXT_PUBLIC_REACT_QUERY_DEVTOOLS: z.enum(["true", "false"]).default("false"),
};

export const serverEnvSchema = z.object(serverVariables);
export const clientEnvSchema = z.object(clientVariables);

export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;
