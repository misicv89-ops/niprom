# Auto škola Niprom — sajt

Statičan sajt, jedan samostalan fajl (`index.html`) — bez build koraka i bez zavisnosti.

## Hostovanje na GitHub Pages

1. Napravi repo (npr. `niprom-sajt`) i ubaci sadržaj ovog foldera u koren repoa.
2. Push na `main`.
3. Settings → Pages → Source: **Deploy from a branch**, Branch: `main`, folder: `/ (root)` → Save.
4. Sajt će biti na `https://<korisnik>.github.io/<repo>/` za minut-dva.

Za sopstveni domen (npr. `niprom.rs`): Settings → Pages → Custom domain, pa kod registrara
podesi CNAME na `<korisnik>.github.io`. Fajl `CNAME` u korenu se kreira automatski.

## Izmene sadržaja

Tekst, cene i telefone menjaj direktno u `index.html` (ili u izvornom projektu, pa ponovo eksportuj).
