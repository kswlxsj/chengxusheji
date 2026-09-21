import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const gameDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceDirectory = path.join(gameDirectory, "src");
const assetPattern = /assets\/[\w\- ./\u4e00-\u9fff]+\.(?:avif|gif|jpe?g|json|mp3|mp4|ogg|png|svg|wav|webm|webp|woff2?)/gi;

async function collectSourceFiles(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await collectSourceFiles(absolute));
    else if (entry.isFile() && /\.(?:html|js)$/i.test(entry.name)) result.push(absolute);
  }
  return result;
}

async function checkExactCase(relativePath) {
  let current = gameDirectory;
  for (const segment of relativePath.split("/")) {
    const entries = await readdir(current);
    if (!entries.includes(segment)) return false;
    current = path.join(current, segment);
  }
  return (await stat(current)).isFile();
}

const rootPages = (await readdir(gameDirectory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith(".html"))
  .map((entry) => path.join(gameDirectory, entry.name));
const sourceFiles = [...rootPages, ...await collectSourceFiles(sourceDirectory)];
const failures = [];
const checked = new Set();

for (const sourceFile of sourceFiles) {
  const content = await readFile(sourceFile, "utf8");
  for (const match of content.matchAll(assetPattern)) {
    const resourcePath = match[0].replaceAll("\\", "/");
    if (resourcePath.includes("${") || checked.has(resourcePath)) continue;
    checked.add(resourcePath);
    if (!await checkExactCase(resourcePath)) {
      failures.push(`${path.relative(gameDirectory, sourceFile)}: ${resourcePath}`);
    }
  }
}

if (failures.length) {
  console.error(`资源路径大小写或文件存在性校验失败（${failures.length} 项）：`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`资源路径校验通过：${checked.size} 个静态 assets 引用均与磁盘大小写一致。`);
}
