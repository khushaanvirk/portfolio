import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const runtime = "edge";
export const alt = "Khushaan Virk";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The link preview card: name, headline and address, white on near-black.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0B0B0C",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "24px",
          padding: "0 100px",
          fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            color: "#EDEDED",
            fontSize: "84px",
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: "-3px",
            display: "flex",
          }}
        >
          {site.name}
        </div>
        <div style={{ color: "#9A9A9A", fontSize: "32px", display: "flex" }}>
          {site.headline}
        </div>
        <div
          style={{
            color: "#8C8C8C",
            fontSize: "22px",
            fontFamily: "monospace",
            marginTop: "12px",
            display: "flex",
          }}
        >
          khushaanvirk.com
        </div>
      </div>
    ),
    { ...size }
  );
}
