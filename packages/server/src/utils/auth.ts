import { headers } from "next/headers";
import { auth } from "@repo/database/auth/server";

export async function getServerSession() {
  return await auth.api.getSession({ headers: await headers() });
}
