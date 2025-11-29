/**
 * Call this at the entry point of scripts running outside Next.js
 * (e.g., database migrations, CLI tools).
 *
 * Next.js config uses its own dotenv loading inline.
 */

import path from "node:path";
import { config } from "dotenv";

const envDir = path.resolve(process.cwd(), "../../");

config({ path: path.join(envDir, ".env") });
config({ path: path.join(envDir, ".env.local") });
