import { env } from "./index";

export const BASE_URL = env.VERCEL_ENV === "preview" ? `https://${env.VERCEL_BRANCH_URL}` : (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const PROJECT = {
  NAME: "Ultimate Template",
  COMPANY: "Impulse Lab",
  DOMAIN: BASE_URL.replace(/^https?:\/\//, ""),
} as const;

