# Auto škola NIPROM I&D — sajt za GitHub Pages

Statičan sajt, bez build koraka. Sadrži sve izmene za desktop i mobilnu verziju.

```
index.html                 početna
politika-privatnosti.html  politika privatnosti
404.html                   stranica za nepostojeće adrese
js/                        React + runtime koji prikazuje stranice (lokalno, bez CDN-a)
assets/                    slike, logo, og-image, video
favicon.ico, favicon-32.png, apple-touch-icon.png
sitemap.xml, robots.txt, .nojekyll
```

## Postavljanje

1. U repo `misicv89-ops/niprom` ubaci CEO sadržaj ovog foldera u koren (uključujući `js/`, `assets/` i skriveni fajl `.nojekyll`).
2. Push na `main`.
3. Settings → Pages → Source: **Deploy from a branch**, Branch: `main`, folder `/ (root)` → Save.
4. Sajt je za minut-dva na https://misicv89-ops.github.io/niprom/

## Ako promeniš adresu (npr. kupiš domen niprom.rs)

Zameni `https://misicv89-ops.github.io/niprom/` novom adresom u `index.html`, `politika-privatnosti.html`, `404.html`, `sitemap.xml` i `robots.txt`.
U `404.html` putanje `/niprom/js/...` i `/niprom/favicon...` promeni u `/js/...` i `/favicon...` (na sopstvenom domenu sajt je u korenu).

## Napomene

- Forma šalje prijave preko FormSubmit na niprom.nis@gmail.com. Prvo slanje traži potvrdu na tom emailu (FormSubmit pošalje link za aktivaciju).
- Politika privatnosti još ima polja za popunjavanje: [datum], [Puno pravno ime firme], [MB], [PIB] i naziv hosting usluge.
- Sajt se ne otvara dvoklikom na index.html sa računara; mora da ide preko servera (GitHub Pages).
