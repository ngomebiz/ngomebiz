// Renders the social share image and touch icon from SVG sources.
import { readFileSync, writeFileSync } from "node:fs";
import { Resvg } from "@resvg/resvg-js";

const render = (src, out, width) => {
  const png = new Resvg(readFileSync(src), {
    fitTo: { mode: "width", value: width },
    font: { loadSystemFonts: true, defaultFontFamily: "Helvetica" },
  }).render().asPng();
  writeFileSync(out, png);
  console.log(`${out} ${(png.length / 1024).toFixed(0)} KB`);
};

render("scripts/og.svg", "site/og-image.png", 1200);
render("site/favicon.svg", "site/apple-touch-icon.png", 180);
