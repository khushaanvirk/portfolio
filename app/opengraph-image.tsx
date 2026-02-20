import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Khushaan Virk — Electrical Engineering Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 100px",
          position: "relative",
        }}
      >
        {/* Subtle inner border */}
        <div
          style={{
            position: "absolute",
            inset: "40px",
            border: "1px solid #1F1F1F",
            borderRadius: "20px",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Tag */}
          <div
            style={{
              background: "#141414",
              border: "1px solid #1F1F1F",
              color: "#737373",
              fontSize: "13px",
              fontFamily: "monospace",
              padding: "6px 16px",
              borderRadius: "6px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              display: "flex",
              width: "fit-content",
            }}
          >
            Portfolio
          </div>

          {/* Name */}
          <div
            style={{
              color: "#F5F5F5",
              fontSize: "88px",
              fontWeight: "700",
              lineHeight: "1",
              letterSpacing: "-4px",
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              display: "flex",
            }}
          >
            Khushaan Virk
          </div>

          {/* Subtitle */}
          <div
            style={{
              color: "#737373",
              fontSize: "30px",
              fontFamily: "-apple-system, BlinkMacSystemFont, sans-serif",
              display: "flex",
            }}
          >
            Electrical Engineering · UBC
          </div>

          {/* URL */}
          <div
            style={{
              color: "#404040",
              fontSize: "20px",
              fontFamily: "monospace",
              marginTop: "8px",
              display: "flex",
            }}
          >
            khushaanvirk.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
