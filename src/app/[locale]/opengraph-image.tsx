import { ImageResponse } from "next/og";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "setup.devnads.com";

const BG = "#fafafa";
const PANEL = "#ffffff";
const LINE = "#e4e4e9";
const TEXT = "#16161b";
const DIM = "#6a6a75";
const VERY_DIM = "#9a9aa3";
const BRAND = "#6e54ff";

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = isLocale(locale) ? getDictionary(locale) : getDictionary("en");
  const description = dict.meta.description;
  const title = dict.meta.title;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: BG,
          padding: 56,
          color: TEXT,
        }}
      >
        <div
          style={{
            position: "relative",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            background: PANEL,
            border: `1px solid ${LINE}`,
            padding: 72,
          }}
        >
          <div style={{ position: "absolute", top: -3, left: -3, width: 6, height: 6, background: LINE, display: "flex" }} />
          <div style={{ position: "absolute", top: -3, right: -3, width: 6, height: 6, background: LINE, display: "flex" }} />
          <div style={{ position: "absolute", bottom: -3, left: -3, width: 6, height: 6, background: LINE, display: "flex" }} />
          <div style={{ position: "absolute", bottom: -3, right: -3, width: 6, height: 6, background: LINE, display: "flex" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: DIM,
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 12, height: 12, background: BRAND, display: "flex", marginRight: 16 }} />
              <span style={{ color: TEXT }}>devnads / setup</span>
            </div>
            <span>setup.devnads.com</span>
          </div>

          <div
            style={{
              marginTop: 96,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 64,
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                color: TEXT,
                maxWidth: 940,
              }}
            >
              {title}.
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 32,
                fontSize: 30,
                lineHeight: 1.35,
                color: DIM,
                maxWidth: 940,
              }}
            >
              {description}
            </div>
          </div>

          <div style={{ flex: 1, display: "flex" }} />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 18,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ display: "flex", color: TEXT }}>
              <span>Windows</span>
              <span style={{ color: VERY_DIM, marginLeft: 14, marginRight: 14 }}>·</span>
              <span>macOS</span>
              <span style={{ color: VERY_DIM, marginLeft: 14, marginRight: 14 }}>·</span>
              <span>Linux</span>
            </div>
            <div style={{ display: "flex", color: DIM }}>scaffold-eth 2 · monad testnet</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
