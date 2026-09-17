import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Facilitator Support Program — Learn. Lead. Impact.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/brand/fsp-logo-reverse.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#263672",
          color: "#ffffff",
          padding: "72px 80px",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={240} height={110} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 30, letterSpacing: 6, textTransform: "uppercase", color: "#FBA81C" }}>
            Facilitator Support Program
          </div>
          <div style={{ fontSize: 118, fontWeight: 800, lineHeight: 1, marginTop: 20, letterSpacing: -3 }}>
            LEARN. LEAD. IMPACT.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
