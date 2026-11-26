// NationScope hand-in program (Node 22, standard library only).
//
// The entry is the static site in app/ plus its screenshots/. This program
// copies both into /output and writes /output/dossier.json with the kit's
// buildDossier library (vendor/makefun-frontend.ts, unchanged), so the
// scorer's own rebuild matches byte for byte.
//
// Locally:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Fail loudly, before handing anything in, if the screenshots break the
// entry rules: 3-4 images, each at most 256 KiB.
const shotsDir = join(repoRoot, "screenshots");
const shotNames = existsSync(shotsDir)
  ? readdirSync(shotsDir).filter((name) => /\.(png|jpe?g)$/i.test(name)).sort()
  : [];
if (shotNames.length < 3 || shotNames.length > 4) {
  throw new Error(`screenshots/ must hold 3-4 images, found ${shotNames.length}`);
}
// Read pixel dimensions straight from the image header: PNG stores them
// in the IHDR chunk (bytes 16-24, big-endian); JPEG in its SOF0/SOF2
// segment. The entry rules want the long side at most 1280 px and the
// short side at least 360 px.
function imageSize(path: string): { width: number; height: number } {
  const buf = readFileSync(path);
  if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let off = 2;
    while (off + 9 < buf.length) {
      if (buf[off] !== 0xff) break;
      const marker = buf[off + 1];
      const segLen = buf.readUInt16BE(off + 2);
      if (marker === 0xc0 || marker === 0xc2) {
        return { height: buf.readUInt16BE(off + 5), width: buf.readUInt16BE(off + 7) };
      }
      off += 2 + segLen;
    }
  }
  throw new Error(`${path}: could not read image dimensions (not a PNG or JPEG?)`);
}

for (const name of shotNames) {
  const { size } = statSync(join(shotsDir, name));
  if (size > 262144) throw new Error(`screenshots/${name} is ${size} bytes, over the 256 KiB limit`);
  const { width, height } = imageSize(join(shotsDir, name));
  const longSide = Math.max(width, height);
  const shortSide = Math.min(width, height);
  if (longSide > 1280) throw new Error(`screenshots/${name} is ${width}x${height}, long side over 1280 px`);
  if (shortSide < 360) throw new Error(`screenshots/${name} is ${width}x${height}, short side under 360 px`);
}

mkdirSync(outputDir, { recursive: true });
cpSync(join(repoRoot, "app"), join(outputDir, "app"), { recursive: true });
mkdirSync(join(outputDir, "screenshots"), { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), join(outputDir, "screenshots"), { recursive: true });
}

const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, "dossier.json"), dossier);
console.log(
  `NationScope handed in: app/ + ${shotNames.length} screenshots (${shotNames.join(", ")}) ` +
    `+ dossier.json (${dossier.length} bytes) -> ${outputDir}`,
);
