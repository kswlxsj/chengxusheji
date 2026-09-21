import { parse } from "acorn";
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const gameDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const compatDirectory = path.join(gameDirectory, "compat");

const build = spawnSync(process.execPath, [path.join(gameDirectory, "tools", "build-compat.mjs"), "--check"], {
  cwd: gameDirectory,
  encoding: "utf8"
});
if (build.status !== 0) {
  process.stderr.write(build.stdout || "");
  process.stderr.write(build.stderr || "");
  process.exit(build.status || 1);
}
process.stdout.write(build.stdout);

async function filesBelow(directory, extension) {
  const result = [];
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile() && absolute.endsWith(extension)) result.push(absolute);
    }
  }
  await visit(directory);
  return result;
}

const scripts = await filesBelow(compatDirectory, ".js");
for (const script of scripts) {
  parse(await readFile(script, "utf8"), { ecmaVersion: 5, allowReserved: true });
}

const assetMap = JSON.parse(await readFile(path.join(compatDirectory, "asset-map.json"), "utf8"));
for (const [source, fallback] of Object.entries(assetMap)) {
  const sourceStat = await stat(path.join(gameDirectory, ...source.split("/")));
  const fallbackStat = await stat(path.join(gameDirectory, ...fallback.split("/")));
  if (!sourceStat.size || !fallbackStat.size) throw new Error(`空素材：${source} -> ${fallback}`);
}

console.log(`IE11 ES5 校验通过：${scripts.length} 个脚本、${Object.keys(assetMap).length} 个图片映射。`);
