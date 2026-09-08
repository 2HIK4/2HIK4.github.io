# Hussam Alkhatib — portfolio

Static Unity / game-development portfolio. Plain HTML, CSS, and JavaScript; no build step is required for GitHub Pages.

## Design direction

The current UI follows the **Shipped Build** design system documented in [`DESIGN.md`](DESIGN.md): a dark, cinematic game-development interface that stays recruiter-friendly and fast to scan.

Reference synthesis:

- **Bruno Simon:** memorable physical interaction and depth, reduced here to one subtle 3D hero interaction instead of a full 3D navigation world.
- **Brittany Chiang:** strong hierarchy, role clarity, accessibility, and restrained motion.
- **Augusto Polonio:** game-developer language and playful developer utilities, represented here by build/status language and the `/` Quick Jump palette.

The PawDoku/Sudoku grid remains the project's signature visual motif so the identity comes from Hussam's own work rather than from a generic template.

## Recruiter-first additions

- Role and specialization visible immediately: Unity / C# / mobile.
- Concrete proof above the fold: 3 shipped Android games and 250+ students trained.
- Primary routes to Selected Work, Resume, GitHub, LinkedIn, and Contact.
- PawDoku featured as the flagship shipped project and full case study.
- Status / platform / stack labels designed for fast scanning.
- Sticky navigation with page progress and active-section feedback.
- `/` Quick Jump palette for fast recruiter navigation.
- Accessible focus states, reduced-motion support, skip link, semantic sections, and lightbox keyboard handling.
- CSS-driven visual effects; no heavy 3D engine or video background.

## Structure

```text
index.html              Homepage — hero, work, lab, experience, about, contact
pawdoku.html            PawDoku case study
404.html                 Not-found page
DESIGN.md                Design system and hiring-focused UI rules
robots.txt, sitemap.xml
css/style.css            Shared design tokens + components
css/case-study.css       Case-study-specific rules
js/main.js               Navigation, reveal, Quick Jump, lightbox, subtle interactions
assets/images/           Portfolio imagery
```

## Run locally

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Copy the contents of this folder to the root of the `2hik4.github.io` repository.
2. Commit and push to the branch GitHub Pages serves from (usually `main`).
3. In **Settings → Pages**, confirm that branch/root is the publishing source.

## Before publishing

### 1. Add the résumé PDF

The site intentionally links to:

```text
assets/Hussam-Alkhatib-CV.pdf
```

That PDF was **not included in the uploaded ZIP**, so add the real résumé at that exact path before deployment.

### 2. Replace placeholder imagery with real evidence

The images included in this working copy are placeholder boards/photos carried over from the supplied portfolio package. Replace them at the same paths with your strongest real game screenshots and experience photos. The layout will keep working without HTML changes.

The most important replacements are:

- `assets/images/games/pawdoku/screenshot-1.jpg` — strongest PawDoku gameplay/store image; this is also used in the hero.
- `assets/images/games/pawdoku/screenshot-2.jpg` through `screenshot-5.jpg` — gameplay, Daily Challenge, collection/progression, polished UI.
- `assets/images/games/orbix/cover.jpg`
- `assets/images/games/risky-landing/cover.jpg`
- `assets/images/misc/unity-projects.jpg`
- `assets/images/experience/ctc-team.jpg`
- `assets/images/experience/ieee-training.jpg`
- `assets/images/social-preview.jpg`

For hiring impact, prefer **real gameplay/build evidence** over decorative mockups.

## Design changes

For the full visual rules, component hierarchy, typography, color tokens, motion policy, recruiter scan path, project-card content schema, and performance targets, see [`DESIGN.md`](DESIGN.md).

## Interactive digit recognizer

The Engineering section contains a real canvas demo wired to the saved neural network in `2HIK4/Number-Prediction`.

The portfolio itself remains static/GitHub-Pages compatible. On the first prediction only, the page loads Pyodide + NumPy, fetches `saved_networks/np_64n_4l_2.pkl` from the public GitHub repository, then performs inference in the visitor's browser. No custom backend is required.

If the model file is renamed or moved in that repository, update `MODEL_URL` in `js/main.js`.
