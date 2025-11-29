/**
 * Creates symlinks for .env files from monorepo root to apps/web.
 * Runs automatically via postinstall.
 * Cross-platform (works on Windows, macOS, Linux).
 *
 * Symlinks are created even if source doesn't exist yet (dangling symlinks).
 * This allows `pnpm install` → `pnpm env:pull` workflow to work correctly.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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

  // Create relative symlink (works even if source doesn't exist yet)
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

