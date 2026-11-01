# Auto škola NIPROM I&D — sajt

Statičan sajt: `index.html` (sav CSS/JS i slike ugrađeni) + `assets/` (video i slike za SEO/deljenje), `sitemap.xml`, `robots.txt`. Bez build koraka.

**Obavezno postavi ceo sadržaj foldera, uključujući `assets/` — inače video u galeriji neće raditi.**

## Hostovanje na GitHub Pages

1. Repo `misicv89-ops/niprom` — ubaci sadržaj ovog foldera u koren repoa.
2. Push na `main`.
3. Settings → Pages → Source: **Deploy from a branch**, Branch: `main`, folder: `/ (root)` → Save.
4. Sajt će biti na https://misicv89-ops.github.io/niprom/ za minut-dva.

Za sopstveni domen (npr. `niprom.rs`): Settings → Pages → Custom domain, pa kod registrara
podesi CNAME na `<korisnik>.github.io`. Kad kupiš domen, dodaj ga u Settings → Pages → Custom domain.

## SEO i mapa sajta

- `sitemap.xml`, `robots.txt` i `<head>` (og:image, og:url, logo) koriste adresu https://misicv89-ops.github.io/niprom/. Ako se promeni (npr. sopstveni domen), zameni je u sva tri.
- Slanje mape: Google Search Console → Dodaj svojstvo (domen) → verifikuj → Sitemaps → unesi `sitemap.xml` → Pošalji.
- Bing Webmaster Tools → Uvezi iz Search Console (ili Sitemaps → `https://misicv89-ops.github.io/niprom/sitemap.xml`).

## Izmene sadržaja

Tekst, cene i telefone menjaj direktno u `index.html` (ili u izvornom projektu, pa ponovo eksportuj).
