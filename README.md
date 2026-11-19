# Small Web

The learning site for **Web Technologies 2026** at BiUH. Four pages, hand-written:
a wall of quotations, five project ideas, and a machine that switches itself off.

## Pages

| Page | What is on it |
| --- | --- |
| `index.html` | Hero image, what the site is, the three sections |
| `quotes.html` | 19 quotations with author and source; the hero picks one at random |
| `project.html` | Five project ideas, who each one is for, and the one I chose |
| `machine.html` | The useless machine, plus a 20-second game |

## How it is built

- Semantic HTML, one stylesheet (`style.css`), three small scripts.
- The navigation and footer are written once — `nav.html`, `footer.html` — and
  fetched into every page by `nav.js`. No page carries its own copy.
- No framework, no build step, no tracking.
- `quotes.js` picks the random quote; `machine.js` runs the machine and the game.

## Running it

The shared navigation is fetched, so the pages must be served over http — opening
the files directly from disk will leave the menu empty.

```powershell
python -m http.server 8099
```

Then open <http://localhost:8099/>.

## Pictures

`tools/make_images.py` draws the hero, the Open Graph image and the icons with
Pillow — no stock images. Run it from the site folder:

```powershell
python tools/make_images.py
```

Outputs go to `images/`: `hero.jpg` (1600 × 900), `og-image.jpg` (1200 × 630,
under 100 KB), `icon-512.png`, `apple-touch-icon.png` (180 × 180) and
`favicon-32.png` (32 × 32).

## Deploying

The site is live at <https://wanshengtianjun.github.io/my-site/>, served by
GitHub Pages from this repository. `.github/workflows/pages.yml` builds and
deploys it on every push to `main`; nothing else needs to be run.
