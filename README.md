# NgomeBiz landing page

Static, single-page marketing site. Plain HTML + Tailwind CSS v4 (compiled, no CDN).

```
pnpm install
pnpm dev      # watch Tailwind while editing site/index.html
pnpm build    # minified CSS + og-image.png + apple-touch-icon.png
pnpm serve    # preview site/ locally
```

Deploy the `site/` folder to any static host.

## Before launch
- Store links: `STORE_LINKS` in `site/main.js`
- Footer: WhatsApp number, social URLs, /privacy and /terms pages
- Testimonials are placeholders: replace with real, permissioned quotes
- Have a native speaker review the Kiswahili hero copy
