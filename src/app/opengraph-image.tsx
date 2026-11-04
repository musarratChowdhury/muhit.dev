import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.shortName} — ${site.role}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          background: "#0f0e1a",
          color: "#f3f3f7",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(600px 300px at 75% 20%, rgba(0,255,153,0.16), transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            opacity: 0.5,
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#00ff99",
              color: "#04110b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 24, color: "#9a9aab" }}>muhit.dev</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 88,
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
            }}
          >
            <span>{site.firstName}</span>
            <span style={{ color: "#00ff99" }}>{site.lastName}</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#9a9aab" }}>
            {`${site.role} · Full-stack · Dhaka`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            color: "#9a9aab",
          }}
        >
          <span>.NET · React · Cloud · AI</span>
          <span style={{ color: "#00ff99" }}>Open to conversations</span>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
