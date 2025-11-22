import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
import { config } from "dotenv";
import path from "path";

config({ path: path.join(__dirname, "../../.env") });
config({ path: path.join(__dirname, "../../.env.local") });

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    REDIS_URL: z.string().url(),

    VERCEL_URL: z.string().optional(),
    VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
    VERCEL_BRANCH_URL: z.string().optional(),
    VERCEL_PROJECT_PRODUCTION_URL: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_REACT_QUERY_DEVTOOLS: z
      .enum(["true", "false"])
      .default("false"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_REACT_QUERY_DEVTOOLS:
      process.env.NEXT_PUBLIC_REACT_QUERY_DEVTOOLS,
  },
  onValidationError: (issues) => {
    throw new Error(`Invalid environment variables: ${JSON.stringify(issues)}`);
  },
});
