import { env } from "./index";

export const BASE_URL = (() => {
  if (env.VERCEL_ENV === "preview") {
    return `https://${env.VERCEL_BRANCH_URL}`;
  }
  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "http://localhost:3000";
})();

export const PROJECT = {
  NAME: "Ultimate Template",
  COMPANY: "Impulse Lab",
  DOMAIN: BASE_URL.replace(/^https?:\/\//, ""),
} as const;
