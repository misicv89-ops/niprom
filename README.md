# Auto škola Niprom — sajt

Statičan sajt: `index.html` (sav CSS/JS i slike ugrađeni) + `assets/` (video i slike za SEO/deljenje), `sitemap.xml`, `robots.txt`, `CNAME`. Bez build koraka.

**Obavezno postavi ceo sadržaj foldera, uključujući `assets/` — inače video u galeriji neće raditi.**

## Hostovanje na GitHub Pages

1. Napravi repo (npr. `niprom-sajt`) i ubaci sadržaj ovog foldera u koren repoa.
2. Push na `main`.
3. Settings → Pages → Source: **Deploy from a branch**, Branch: `main`, folder: `/ (root)` → Save.
4. Sajt će biti na `https://<korisnik>.github.io/<repo>/` za minut-dva.

Za sopstveni domen (npr. `niprom.rs`): Settings → Pages → Custom domain, pa kod registrara
podesi CNAME na `<korisnik>.github.io`. Fajl `CNAME` (`niprom.rs`) je već uključen — ako koristiš drugi domen ili samo github.io adresu, izmeni ga ili obriši.

## SEO i mapa sajta

- `sitemap.xml` i `robots.txt` su u korenu. Ako domen nije `https://niprom.rs/`, zameni ga u oba fajla i u `<head>` od `index.html`.
- Slanje mape: Google Search Console → Dodaj svojstvo (domen) → verifikuj → Sitemaps → unesi `sitemap.xml` → Pošalji.
- Bing Webmaster Tools → Uvezi iz Search Console (ili Sitemaps → `https://niprom.rs/sitemap.xml`).

## Izmene sadržaja

Tekst, cene i telefone menjaj direktno u `index.html` (ili u izvornom projektu, pa ponovo eksportuj).
