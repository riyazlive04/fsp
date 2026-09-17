/**
 * Derives web-ready logo variants from the supplied opaque logo
 * (public/fsp-logo.png, flat #F7F7F7 background).
 *
 * Each pixel is un-mixed against the background: we find the brand colour
 * (navy or orange) that best explains it and recover an alpha value, so
 * anti-aliased edges stay smooth on any background.
 *
 * Outputs:
 *   public/brand/fsp-logo.png          navy + orange, transparent (light surfaces)
 *   public/brand/fsp-logo-reverse.png  white + orange, transparent (dark surfaces)
 *   app/icon.png                       square favicon source
 *   app/apple-icon.png                 180px touch icon
 *
 * Run: node scripts/build-logo-assets.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/fsp-logo.png";
const BG = [247, 247, 247];
const NAVY = [38, 54, 114];
const ORANGE = [251, 168, 28];
const WHITE = [255, 255, 255];

const { data, info } = await sharp(SRC).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

function unmix(r, g, b, fg) {
  const d = [fg[0] - BG[0], fg[1] - BG[1], fg[2] - BG[2]];
  const c = [r - BG[0], g - BG[1], b - BG[2]];
  const len2 = d[0] * d[0] + d[1] * d[1] + d[2] * d[2];
  const a = Math.min(1, Math.max(0, (c[0] * d[0] + c[1] * d[1] + c[2] * d[2]) / len2));
  // residual error of the reconstruction
  const err = Math.hypot(c[0] - a * d[0], c[1] - a * d[1], c[2] - a * d[2]);
  return { a, err };
}

function render(navyTarget) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    const r = data[i * 3], g = data[i * 3 + 1], b = data[i * 3 + 2];
    const n = unmix(r, g, b, NAVY);
    const o = unmix(r, g, b, ORANGE);
    const useNavy = n.err <= o.err;
    let a = useNavy ? n.a : o.a;
    if (a < 0.03) a = 0;
    const col = useNavy ? navyTarget : ORANGE;
    out[i * 4] = col[0];
    out[i * 4 + 1] = col[1];
    out[i * 4 + 2] = col[2];
    out[i * 4 + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

await mkdir("public/brand", { recursive: true });

const light = await render(NAVY).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toBuffer();
await sharp(light).toFile("public/brand/fsp-logo.png");
await render(WHITE).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile("public/brand/fsp-logo-reverse.png");

// Square icon: full logo centred on the brand background.
async function icon(size, file) {
  const pad = Math.round(size * 0.1);
  const mark = await sharp(light)
    .resize({ width: size - pad * 2, height: size - pad * 2, fit: "inside" })
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: { r: 247, g: 247, b: 247, alpha: 1 } } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toFile(file);
}
await icon(512, "app/icon.png");
await icon(180, "app/apple-icon.png");

const meta = await sharp("public/brand/fsp-logo.png").metadata();
console.log(`logo variants written (${meta.width}x${meta.height})`);
