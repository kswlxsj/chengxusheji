import { createHash } from "node:crypto";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const gameDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const runtimeDirectory = path.join(gameDirectory, "assets");
const sourceDirectory = path.resolve(gameDirectory, "..", "Assets");

async function directoryExists(directory) {
  try {
    return (await stat(directory)).isDirectory();
  } catch {
    return false;
  }
}

async function collectFiles(directory, relativeDirectory = "") {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(absolutePath, relativePath));
    } else if (entry.isFile()) {
      files.push(relativePath);
    }
  }
  return files;
}

async function sha256(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

if (!(await directoryExists(sourceDirectory))) {
  console.log("素材同步校验已跳过：独立发布目录未附带可选的上级 Assets 源素材库。");
  process.exit(0);
}

const runtimeFiles = await collectFiles(runtimeDirectory);
const failures = [];
let verified = 0;
for (const relativePath of runtimeFiles) {
  // Runtime-only SVG placeholders are intentionally not copied into the art source library.
  if (path.extname(relativePath).toLowerCase() === ".svg") continue;

  const runtimePath = path.join(runtimeDirectory, relativePath);
  const sourcePath = path.join(sourceDirectory, relativePath);
  try {
    if (!(await stat(sourcePath)).isFile()) {
      failures.push(`${relativePath}: Assets counterpart is not a file`);
      continue;
    }
  } catch {
    failures.push(`${relativePath}: missing from Assets`);
    continue;
  }

  if (await sha256(runtimePath) !== await sha256(sourcePath)) {
    failures.push(`${relativePath}: SHA-256 differs from Assets counterpart`);
    continue;
  }
  verified += 1;
}

if (failures.length) {
  console.error(`素材同步校验失败（${failures.length} 项）：`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`素材同步校验通过：${verified} 个运行素材与 Assets 同路径同字节一致；SVG 占位符已豁免。`);
}
