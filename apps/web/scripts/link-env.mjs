/* eslint-disable no-undef, turbo/no-undeclared-env-vars */
/**
 * Creates symlinks for .env files from monorepo root to apps/web.
 * Runs automatically via postinstall.
 * Cross-platform (works on Windows, macOS, Linux).
 *
 * Symlinks are only created in local dev (skipped in CI/Vercel).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Skip in CI/deployment environments
const isCI =
  process.env.CI ||
  process.env.VERCEL ||
  process.env.NETLIFY ||
  process.env.RAILWAY_ENVIRONMENT ||
  process.env.RENDER ||
  process.env.FLY_APP_NAME ||
  process.env.HEROKU ||
  process.env.AWS_EXECUTION_ENV ||
  process.env.GOOGLE_CLOUD_PROJECT ||
  process.env.AZURE_FUNCTIONS_ENVIRONMENT;

if (isCI) {
  console.log("○ Skipping env symlinks (CI/deployment detected)");
  process.exit(0);
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webDir = path.resolve(__dirname, "..");

// Relative path from apps/web to monorepo root
const relativeRoot = "../..";

const envFiles = [".env", ".env.local"];

for (const file of envFiles) {
  const relativePath = path.join(relativeRoot, file);
  const target = path.join(webDir, file);

  // Remove existing file/symlink
  try {
    fs.unlinkSync(target);
  } catch {
    // Ignore if doesn't exist
  }

  // Create relative symlink (works even if source doesn't exist yet for pnpm install → pnpm env:pull workflow)
  try {
    fs.symlinkSync(relativePath, target, "file");
    console.log(`✓ Linked ${file} → ${relativePath}`);
  } catch (err) {
    // On Windows without admin, try absolute path or skip
    if (err.code === "EPERM") {
      console.warn(`⚠ ${file}: symlinks require admin on Windows`);
    } else {
      console.warn(`⚠ Could not link ${file}:`, err.message);
    }
  }
}

