// Draws the ID card faces and the strap pattern on canvases at runtime, so the card
// always uses the current /portrait.jpg and the site's own fonts. Returns data URLs.
import { SITE, BASED_IN } from "../../lib/site";
import { SERVICES } from "../../data/services";

const W = 1024;
const H = 1600; // matches the Lanyard portrait card (1.6 x 2.5)
const INK = "#EEF1F8";
const INK2 = "#A9B2C7";
const INK3 = "#6E7894";
const ACCENT = "#FFB357";

const loadImage = (src) =>
  new Promise((res) => {
    const im = new Image();
    im.onload = () => res(im);
    im.onerror = () => res(null);
    im.src = src;
  });

const roundRect = (ctx, x, y, w, h, r) => {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

const ground = (ctx) => {
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#161E30");
  g.addColorStop(1, "#090C15");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  // soft glow + fine dot grid
  const r = ctx.createRadialGradient(W * 0.8, H * 0.15, 0, W * 0.8, H * 0.15, W * 0.9);
  r.addColorStop(0, "rgba(255,179,87,.14)");
  r.addColorStop(1, "rgba(255,179,87,0)");
  ctx.fillStyle = r;
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "rgba(160,180,255,.07)";
  for (let y = 24; y < H; y += 28) for (let x = 24; x < W; x += 28) ctx.fillRect(x, y, 2, 2);
};

const barcode = (ctx, x, y, w, h, seed = 7) => {
  let s = seed;
  const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
  let cx = x;
  ctx.fillStyle = INK;
  while (cx < x + w) {
    const bw = 2 + Math.floor(rnd() * 7);
    if (rnd() > 0.35) ctx.fillRect(cx, y, bw, h);
    cx += bw + 3;
  }
};

const mark = (ctx, x, y, size) => {
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(120,150,255,.12)";
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "rgba(255,255,255,.22)";
  ctx.stroke();
  ctx.fillStyle = INK;
  ctx.font = `800 ${size * 0.36}px Syne, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("AA", x + size / 2, y + size / 2 + 2);
  ctx.restore();
};

// Largest font size (<= max) at which `text` fits in `width`.
const fitFont = (ctx, text, weight, family, max, width) => {
  let size = max;
  ctx.font = `${weight} ${size}px ${family}`;
  while (ctx.measureText(text).width > width && size > 20) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${family}`;
  }
  return ctx.font;
};

async function drawFront(portrait) {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  ground(ctx);

  // header (the clip slot sits above this)
  mark(ctx, 72, 150, 96);
  ctx.textAlign = "right";
  ctx.fillStyle = INK3;
  ctx.font = "500 26px 'JetBrains Mono', monospace";
  ctx.fillText("ID · AAM-01", W - 72, 188);
  ctx.fillStyle = ACCENT;
  ctx.fillText("● AVAILABLE", W - 72, 228);

  // photo: tall, so face and shoulders fit
  const px = 72, py = 270, pw = W - 144, ph = 880;
  ctx.save();
  roundRect(ctx, px, py, pw, ph, 36);
  ctx.clip();
  ctx.fillStyle = "#1B2336";
  ctx.fillRect(px, py, pw, ph);
  if (portrait) {
    const s = Math.max(pw / portrait.width, ph / portrait.height);
    const iw = portrait.width * s, ih = portrait.height * s;
    ctx.drawImage(portrait, px + (pw - iw) / 2, py + (ph - ih) * 0.3, iw, ih);
  }
  const fade = ctx.createLinearGradient(0, py + ph * 0.65, 0, py + ph);
  fade.addColorStop(0, "rgba(9,12,21,0)");
  fade.addColorStop(1, "rgba(9,12,21,.5)");
  ctx.fillStyle = fade;
  ctx.fillRect(px, py, pw, ph);
  ctx.restore();

  // name + role, sized to fit
  const maxW = W - 144;
  ctx.textAlign = "left";
  ctx.fillStyle = INK;
  ctx.font = fitFont(ctx, "ABDULQUAWIY", 800, "Syne, sans-serif", 104, maxW);
  ctx.fillText("ABDULQUAWIY", 72, 1262);
  ctx.fillStyle = INK3;
  ctx.fillText("ADEBIYI", 72, 1362);
  const role = `${SITE.title.toUpperCase()} · ${SITE.altTitle.toUpperCase()}`;
  ctx.fillStyle = ACCENT;
  ctx.font = fitFont(ctx, role, 500, "'JetBrains Mono', monospace", 32, maxW);
  ctx.fillText(role, 72, 1424);

  // footer
  ctx.strokeStyle = "rgba(160,180,255,.16)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(72, 1462);
  ctx.lineTo(W - 72, 1462);
  ctx.stroke();
  ctx.fillStyle = INK2;
  ctx.font = "500 26px 'JetBrains Mono', monospace";
  ctx.fillText(BASED_IN.toUpperCase(), 72, 1515);
  ctx.fillStyle = INK3;
  ctx.fillText("ABDULQUAWIY.ONLINE", 72, 1555);
  barcode(ctx, W - 72 - 300, 1485, 300, 80);
  return c.toDataURL("image/png");
}

function drawBack() {
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d");
  ground(ctx);

  mark(ctx, 72, 150, 96);
  ctx.textAlign = "right";
  ctx.fillStyle = INK3;
  ctx.font = "500 26px 'JetBrains Mono', monospace";
  ctx.fillText("$ cat services.txt", W - 72, 208);
  ctx.textAlign = "left";

  ctx.fillStyle = INK;
  ctx.font = fitFont(ctx, "What I build", 800, "Syne, sans-serif", 96, W - 144);
  ctx.fillText("What I build", 72, 400);

  let y = 520;
  SERVICES.forEach((s, i) => {
    ctx.fillStyle = ACCENT;
    ctx.font = "500 26px 'JetBrains Mono', monospace";
    ctx.fillText(`0${i + 1}`, 72, y);
    ctx.fillStyle = INK;
    ctx.font = fitFont(ctx, s.short, 600, "'Hanken Grotesk', sans-serif", 44, W - 222);
    ctx.fillText(s.short, 150, y);
    ctx.strokeStyle = "rgba(160,180,255,.12)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(72, y + 36);
    ctx.lineTo(W - 72, y + 36);
    ctx.stroke();
    y += 96;
  });

  ctx.fillStyle = INK2;
  ctx.font = "500 28px 'JetBrains Mono', monospace";
  ctx.fillText("React · Next.js · Django · GraphQL", 72, y + 50);
  ctx.fillText("PostgreSQL · Supabase · AI agents", 72, y + 96);

  const cta = "Let's build it → abdulquawiy.online";
  ctx.fillStyle = ACCENT;
  ctx.font = fitFont(ctx, cta, 700, "'Hanken Grotesk', sans-serif", 42, W - 144);
  ctx.fillText(cta, 72, 1440);
  barcode(ctx, 72, 1480, W - 144, 60, 21);
  return c.toDataURL("image/png");
}

function drawStrap() {
  const c = document.createElement("canvas");
  c.width = 2200;
  c.height = 200;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#0C0F18";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.fillStyle = "rgba(255,179,87,.9)";
  ctx.fillRect(0, 14, c.width, 4);
  ctx.fillRect(0, c.height - 18, c.width, 4);
  ctx.textBaseline = "middle";
  ctx.font = "800 64px Syne, sans-serif";
  let x = 40;
  const parts = [["ABDULQUAWIY", "#EEF1F8"], ["✦", "#FFB357"], ["SOFTWARE DEVELOPER", "#EEF1F8"], ["✦", "#FFB357"]];
  while (x < c.width) {
    for (const [t, col] of parts) {
      ctx.fillStyle = col;
      ctx.fillText(t, x, c.height / 2 + 4);
      x += ctx.measureText(t).width + 40;
    }
  }
  return c.toDataURL("image/png");
}

export async function makeCardFaces(portraitSrc = "/portrait.jpg") {
  try {
    await Promise.all([
      document.fonts.load("800 96px Syne"),
      document.fonts.load("600 40px 'Hanken Grotesk'"),
      document.fonts.load("500 28px 'JetBrains Mono'"),
    ]);
  } catch { /* fall back to system fonts */ }
  const portrait = await loadImage(portraitSrc);
  return { front: await drawFront(portrait), back: drawBack(), strap: drawStrap() };
}
