# Auto škola NIPROM I&D — statički sajt

Čist HTML/CSS/JS, bez build koraka i bez spoljnih biblioteka.

```
index.html                 početna
politika-privatnosti.html  politika privatnosti
404.html                   stranica za nepostojeće adrese
robots.txt, sitemap.xml
favicon.ico, favicon-32.png, apple-touch-icon.png
css/style.css              fontovi, hover stanja, animacije, responsive
js/main.js                 intro, pojavljivanje pri skrolu, brojači, galerija, video, forma
assets/                    slike (WebP), logo, og-image, video + poster
fonts/                     Space Grotesk i IBM Plex Sans (woff2, latin + latin-ext)
```

## Pre postavljanja zameni

1. `[FORMSUBMIT_ALIAS]` u `index.html` (atribut `action` forme), npr. tvoj FormSubmit alias ili email.
2. `https://misicv89-ops.github.io/niprom/` → pravi domen (Find & Replace u `index.html`, `politika-privatnosti.html`, `404.html`, `sitemap.xml`, `robots.txt`). Svi takvi tagovi su označeni komentarom na vrhu `<head>`.

## GitHub Pages

Ubaci sadržaj ovog foldera u koren repoa → Settings → Pages → Deploy from a branch → `main` / `(root)`.
