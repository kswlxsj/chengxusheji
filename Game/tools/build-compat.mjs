import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { transformAsync } from "@babel/core";
import presetEnv from "@babel/preset-env";
import postcss from "postcss";
import customProperties from "postcss-custom-properties";
import autoprefixer from "autoprefixer";
import sharp from "sharp";

const gameDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryDirectory = path.resolve(gameDirectory, "..");
const sourceAssetsDirectory = path.join(repositoryDirectory, "Assets");
const compatDirectory = path.join(gameDirectory, "compat");
const checkOnly = process.argv.includes("--check");
const slash = (value) => value.split(path.sep).join("/");
const hash = (value) => createHash("sha256").update(value).digest("hex");
const cleanGeneratedCss = (value) => `${value.replace(/^ +\t/gm, "\t").replace(/[ \t]+$/gm, "").trimEnd()}\n`;

async function filesBelow(directory, predicate) {
  const result = [];
  async function visit(current) {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      if (entry.name === "node_modules" || entry.name === "compat") continue;
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) await visit(absolute);
      else if (entry.isFile() && predicate(absolute)) result.push(absolute);
    }
  }
  await visit(directory);
  return result.sort();
}

async function ensureWrite(filename, content) {
  const bytes = Buffer.isBuffer(content) ? content : Buffer.from(content);
  if (checkOnly) {
    let current;
    try { current = await readFile(filename); } catch { throw new Error(`缺少兼容生成文件：${slash(path.relative(gameDirectory, filename))}`); }
    if (!current.equals(bytes)) throw new Error(`兼容生成文件已过期：${slash(path.relative(gameDirectory, filename))}`);
    return;
  }
  await mkdir(path.dirname(filename), { recursive: true });
  let current = null;
  try { current = await readFile(filename); } catch { /* 首次生成 */ }
  if (!current || !current.equals(bytes)) await writeFile(filename, bytes);
}

const webpFiles = [
  ...await filesBelow(path.join(gameDirectory, "assets"), (file) => /\.webp$/i.test(file)),
  ...await filesBelow(path.join(gameDirectory, "GroupIntro"), (file) => /\.webp$/i.test(file))
];
const assetMap = {};
const assetManifest = [];

for (const source of webpFiles) {
  const relative = slash(path.relative(gameDirectory, source));
  const sourceBytes = await readFile(source);
  const metadata = await sharp(sourceBytes).metadata();
  const extension = metadata.hasAlpha ? ".ie.png" : ".ie.jpg";
  const output = source.replace(/\.webp$/i, extension);
  const generated = metadata.hasAlpha
    ? await sharp(sourceBytes).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
    : await sharp(sourceBytes).jpeg({ quality: 92, chromaSubsampling: "4:4:4", mozjpeg: true }).toBuffer();
  await ensureWrite(output, generated);
  const outputRelative = slash(path.relative(gameDirectory, output));
  assetMap[relative] = outputRelative;
  assetManifest.push({ source: relative, sourceSha256: hash(sourceBytes), fallback: outputRelative, fallbackSha256: hash(generated) });

  if (relative.startsWith("assets/")) {
    const mirror = path.join(sourceAssetsDirectory, ...outputRelative.slice("assets/".length).split("/"));
    await ensureWrite(mirror, generated);
  }
}

function replaceAssetReferences(text, baseDirectory = "") {
  return text.replace(/(?:\.\.\/|\.\/)?(?:[\w\- .\u4e00-\u9fff]+\/)*[\w\- .\u4e00-\u9fff]+\.webp/gi, (reference) => {
    const normalized = slash(path.posix.normalize(path.posix.join(baseDirectory, reference)));
    const mapped = assetMap[normalized];
    if (!mapped) return reference;
    const relative = path.posix.relative(baseDirectory || ".", mapped);
    return relative.startsWith(".") ? relative : relative;
  });
}

const javascriptFiles = [
  ...await filesBelow(path.join(gameDirectory, "src"), (file) => /\.js$/i.test(file) && !/compat-loader|ie-polyfills/i.test(file)),
  ...await filesBelow(path.join(gameDirectory, "GroupIntro"), (file) => /\.js$/i.test(file))
];

for (const source of javascriptFiles) {
  const relative = slash(path.relative(gameDirectory, source));
  const pageBase = relative.startsWith("src/") ? "" : path.posix.dirname(relative);
  const input = replaceAssetReferences(await readFile(source, "utf8"), pageBase);
  const transformed = await transformAsync(input, {
    filename: source,
    sourceType: "script",
    comments: true,
    compact: false,
    presets: [[presetEnv, { targets: { ie: "11" }, modules: false }]]
  });
  await ensureWrite(path.join(compatDirectory, ...relative.split("/")), `${transformed.code}\n`);
}

const compiledData = replaceAssetReferences(
  await readFile(path.join(gameDirectory, "data", "compiled-game-data.js"), "utf8"),
  ""
);
await ensureWrite(path.join(compatDirectory, "data", "compiled-game-data.js"), compiledData);

const cssFiles = [
  ...await filesBelow(path.join(gameDirectory, "styles"), (file) => /\.css$/i.test(file) && !/\.ie\.css$/i.test(file) && !/ie-overrides\.css$/i.test(file)),
  ...await filesBelow(path.join(gameDirectory, "GroupIntro"), (file) => /\.css$/i.test(file) && !/\.ie\.css$/i.test(file))
];
for (const source of cssFiles) {
  const relative = slash(path.relative(gameDirectory, source));
  const base = path.posix.dirname(relative);
  const input = replaceAssetReferences(await readFile(source, "utf8"), base);
  const result = await postcss([
    customProperties({ preserve: false }),
    autoprefixer({ overrideBrowserslist: ["ie 11"], grid: "autoplace" })
  ]).process(input, { from: source, map: false });
  await ensureWrite(source.replace(/\.css$/i, ".ie.css"), cleanGeneratedCss(result.css));
}

const inlineStylePages = ["GroupIntro/index.html", "GroupIntro/lty/demo.html", "GroupIntro/xyx/index.html", "GroupIntro/zxy/index.html", "GroupIntro/czh/index.html"];
for (const relative of inlineStylePages) {
  const source = await readFile(path.join(gameDirectory, ...relative.split("/")), "utf8");
  const blocks = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((match) => match[1]);
  if (!blocks.length) continue;
  const base = path.posix.dirname(relative);
  const result = await postcss([
    customProperties({ preserve: false }),
    autoprefixer({ overrideBrowserslist: ["ie 11"], grid: "autoplace" })
  ]).process(replaceAssetReferences(blocks.join("\n"), base), { from: relative, map: false });
  await ensureWrite(path.join(gameDirectory, ...base.split("/"), "inline.ie.css"), cleanGeneratedCss(result.css));
}

const coreBundle = await readFile(path.join(gameDirectory, "node_modules", "core-js-bundle", "minified.js"), "utf8");
const customPolyfills = await readFile(path.join(gameDirectory, "src", "ie-polyfills.js"), "utf8");
await ensureWrite(path.join(compatDirectory, "polyfills.js"), `${coreBundle.trimEnd()}\n${customPolyfills.trimEnd()}\n`);

const sortedMap = Object.fromEntries(Object.entries(assetMap).sort(([left], [right]) => left.localeCompare(right)));
await ensureWrite(path.join(compatDirectory, "asset-map.json"), `${JSON.stringify(sortedMap, null, 2)}\n`);
await ensureWrite(
  path.join(compatDirectory, "asset-map.js"),
  `(function(){window.TRAIN_GAME_ROOT_URL=${JSON.stringify("__ROOT__")};var s=document.currentScript.src;window.TRAIN_GAME_ROOT_URL=s.slice(0,s.indexOf("compat/asset-map.js"));window.TRAIN_GAME_IE_ASSET_MAP=${JSON.stringify(sortedMap)};}());\n`
);

const manifest = {
  version: 1,
  generatedAt: "deterministic",
  scripts: javascriptFiles.map((file) => slash(path.relative(gameDirectory, file))),
  styles: cssFiles.map((file) => slash(path.relative(gameDirectory, file))),
  assets: assetManifest.sort((left, right) => left.source.localeCompare(right.source))
};
await ensureWrite(path.join(compatDirectory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`${checkOnly ? "兼容产物检查" : "兼容产物生成"}完成：${javascriptFiles.length} 个脚本、${cssFiles.length} 个样式、${webpFiles.length} 个 WebP 后备素材。`);
