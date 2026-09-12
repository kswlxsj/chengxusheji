import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const sourceAssetsRoot = resolve(root, "..", "Assets");
const host = "127.0.0.1";
const port = Number(process.argv[2] || 4173);
const defaultPage = "conductor-tug-preview.html";
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
};

function resolveRequestPath(requestUrl) {
  const url = new URL(requestUrl || "/", `http://${host}:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  if (pathname.startsWith("/__source-assets__/")) {
    const requested = pathname.slice("/__source-assets__/".length);
    const target = resolve(sourceAssetsRoot, requested);
    const relativeTarget = relative(sourceAssetsRoot, target);
    if (isAbsolute(relativeTarget) || relativeTarget.startsWith("..")) return null;
    return target;
  }
  const requested = pathname === "/" ? defaultPage : pathname.replace(/^\/+/, "");
  const target = resolve(root, requested);
  const relativeTarget = relative(root, target);
  if (isAbsolute(relativeTarget) || relativeTarget.startsWith("..")) return null;
  return target;
}

const server = createServer(async (request, response) => {
  try {
    const target = resolveRequestPath(request.url);
    if (!target) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }
    const info = await stat(target);
    if (!info.isFile()) throw new Error("Not a file");
    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Length": info.size,
      "Content-Type": contentTypes[extname(target).toLowerCase()] || "application/octet-stream"
    });
    createReadStream(target).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, host, () => {
  console.log(`卡牌 UI 预览：http://${host}:${port}/`);
  console.log(`项目根目录：${root}`);
});
