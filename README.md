# Luminary Market Group — Marketing Website

A fast, fully static single-page site built with plain **HTML, CSS, and vanilla
JavaScript**. No build step, no framework, no dependencies — just open it or drop
it on any static host.

```
LMG Website/
├── index.html            ← page content & structure
├── styles.css            ← all styling (colors/fonts/type scale in :root)
├── script.js             ← nav, smooth scroll, scroll animations
├── favicon.svg           ← browser-tab icon (vector, modern browsers)
├── favicon-32.png        ← 32×32 tab-icon fallback
├── apple-touch-icon.png  ← 180×180 iOS home-screen icon
├── icon-192.png          ← 192×192 Android icon (manifest)
├── icon-512.png          ← 512×512 Android icon / splash (manifest)
├── site.webmanifest      ← "Add to Home Screen" name, colors, icons
├── og-image.jpg          ← 1200×630 social share preview image
└── README.md             ← this file
```

---

## Preview it locally

Just double-click `index.html`, or run a tiny local server (nicer for testing):

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

---

## Editing the content

| Want to change…            | Where to look                                              |
| -------------------------- | ---------------------------------------------------------- |
| Headline / subhead / text  | `index.html` — each section is labeled with a comment      |
| **Colors**                 | `styles.css` → `:root` block (`--color-gold`, etc.)        |
| **Fonts**                  | `styles.css` → `--font-serif` / `--font-sans` in `:root`   |
| Logo monogram              | `index.html` → the `#lmg-emblem` `<symbol>` near the top   |
| Hero / About visuals       | `index.html` — inline SVG (no photos); edit shapes/colors  |
| Service cards              | `index.html` → `.services-grid` (title, description, icon) |
| Email address              | search `index.html` for `LuminaryMarketGroup@gmail.com`    |

All colors are CSS variables, so changing the single line `--color-gold` recolors
every button, link, divider, and accent at once.

---

## Adding your Calendly scheduler

1. In Calendly, go to **Share → Add to website → Inline Embed**.
2. Copy the snippet Calendly gives you (a `<div>` plus a `<script>`).
3. In `index.html`, find:

   ```html
   <div class="calendly-placeholder reveal" id="calendly-embed" ...>
       <!-- 👇 PASTE CALENDLY EMBED HERE 👇 -->
       ...placeholder note...
       <!-- 👆 PASTE CALENDLY EMBED HERE 👆 -->
   </div>
   ```

4. Replace **everything between the two paste markers** with your Calendly snippet.
5. (Optional) remove the dashed border by deleting `border: 2px dashed var(--color-gold);`
   from `.calendly-placeholder` in `styles.css`.

The **“Email to schedule”** button below the embed always works as a fallback, so
the page is functional even before Calendly is connected.

---

## Before you go live (1-minute step)

The page includes SEO + social-share meta tags (title, description, Open Graph,
Twitter card) so links unfurl with a branded preview. Once you know your real
URL, open `index.html` and replace every **`https://YOUR-DOMAIN.com`** with it —
there are a few, in the `<head>` (canonical, `og:url`, `og:image`, `twitter:image`).
That's the only edit needed; the share image (`og-image.jpg`) is already generated.

> Tip: paste your live URL into the [OpenGraph debugger](https://www.opengraph.xyz/)
> or LinkedIn's [Post Inspector](https://www.linkedin.com/post-inspector/) to see
> the preview and refresh any cached version.

---

## Deploying (free options)

**GitHub Pages**
1. Push these files to a GitHub repo.
2. Repo → **Settings → Pages** → Source: `main` branch, `/root` → **Save**.
3. Your site goes live at `https://<username>.github.io/<repo>/`.

**Netlify** — drag the project folder onto <https://app.netlify.com/drop>.

**Vercel** — `vercel` in the project folder, or import the repo at vercel.com.

---

## Notes

- **Responsive & mobile-first** — layouts adapt at 380px, 640px, 880px, and 1100px.
- **Accessible** — semantic landmarks, skip link, visible keyboard focus, ARIA labels
  on controls, decorative SVGs hidden from screen readers, and respect for the OS
  “reduce motion” setting.
- **Consistent type scale** — every size comes from the `--fs-*` tokens in `:root`;
  edit one step to reflow the whole hierarchy.
- **No external images** — logo, hero, and About visuals are inline SVG; the favicon
  and social image are small local files. Zero third-party image requests, instant
  load, razor-sharp on any display.
