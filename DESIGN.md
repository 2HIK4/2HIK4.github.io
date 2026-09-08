# Hussam Alkhatib Portfolio — Design System

## 1. Brand direction

**Positioning:** Unity game developer / gameplay programmer who ships complete mobile games, not just isolated mechanics.

**Design idea:** **"Shipped Build"** — the portfolio should feel like a polished game-development interface without becoming a game itself.

The UI combines three priorities:

1. **Recruiter clarity first** — role, proof, projects, résumé and contact must be obvious within seconds.
2. **Game-dev personality second** — grid motifs, build/status language, motion, depth and interactive details should make the portfolio memorable.
3. **Technical credibility throughout** — case studies, systems ownership, shipped status, tools and results should carry more weight than decoration.

The existing PawDoku grid remains the signature visual motif because it belongs to Hussam's own work rather than being a generic portfolio trend.

---

## 2. Reference synthesis

### Bruno Simon — interaction / memorability
Borrow:
- A portfolio can demonstrate the skill being sold, not just describe it.
- Physical-feeling interaction and depth can create a memorable first impression.
- Small discoveries make a site feel authored rather than templated.

Do **not** copy:
- A full 3D world as the primary navigation. Hussam is applying for Unity/gameplay roles, so the website should remain fast and easy for recruiters to scan.

Applied here:
- Subtle 3D tilt on the hero build card.
- Layered "game scene" hero with floating system chips.
- Ambient motion and grid depth.

### Brittany Chiang — recruiter clarity / accessibility
Borrow:
- Extremely clear role statement.
- Strong hierarchy and restrained color system.
- Work and experience are readable before decorative details.
- Accessible interactions and motion discipline.
- Subtle cursor/spotlight treatment rather than constant animation everywhere.

Applied here:
- Strong role and shipped-work statement above the fold.
- High-contrast typography and clear content hierarchy.
- Reduced-motion support, visible focus states and semantic navigation.
- Subtle pointer spotlight.

### Augusto Polonio — game-developer portfolio language
Borrow:
- Game work should visibly feel different from a generic software portfolio.
- Status labels such as released / in development / prototype are useful.
- Interactive terminal/game concepts can add developer personality.

Do **not** copy:
- Multiple competing interaction modes on the landing page.

Applied here:
- Build/status language in the hero.
- "Featured build" visual treatment.
- A recruiter-friendly **Quick Jump** command palette inspired by terminal interaction, opened with `/`.

---

## 3. Color system

### Core palette

| Token | Value | Use |
|---|---|---|
| `--bg` | `#090D12` | Main canvas |
| `--bg-soft` | `#0D131B` | Alternate dark background |
| `--surface` | `#111923` | Cards / panels |
| `--surface-2` | `#16212D` | Raised surfaces |
| `--surface-3` | `#1B2836` | Stronger elevation |
| `--text` | `#F4F7FA` | Primary text |
| `--text-soft` | `#D3DBE3` | Supporting text |
| `--muted` | `#8F9EAD` | Metadata / secondary copy |
| `--mint` | `#7CF3C5` | Primary brand accent |
| `--cyan` | `#72D7FF` | Secondary technical accent |
| `--amber` | `#FFD98A` | Optional warning/highlight |

### Color rules

- Mint is the **brand signal**, not a fill color for large surfaces.
- Cyan appears mainly in technical labels or secondary highlights.
- Avoid rainbow project cards; game screenshots supply most of the page color.
- Never use muted text for critical information or primary CTAs.

---

## 4. Typography

### Display — Space Grotesk
Use for:
- Hero headline
- Section titles
- Project names
- Large metrics

Characteristics: technical, modern, slightly geometric, but still readable.

### Body — Inter
Use for:
- Paragraphs
- Case-study explanations
- Experience descriptions

### Utility — IBM Plex Mono
Use for:
- Tags
- Section numbers
- Build/status labels
- Navigation utility text
- Command palette metadata

### Type rules

- Large headings use tight tracking (`-0.04em` to `-0.075em`).
- Body copy should stay around `55–70ch` maximum.
- Mono labels should usually be uppercase with slight letter spacing.
- Do not turn full paragraphs into monospace text.

---

## 5. Spacing and layout

- Maximum content width: **1240px**.
- Main page sections: **5.5rem–9.5rem** vertical rhythm depending on viewport.
- Card radii: **10 / 18 / 28px**.
- Project layouts should use asymmetry, but text and CTAs must still align to a clear grid.
- Mobile layout becomes one-column before visual density becomes uncomfortable.

The page intentionally alternates between:
- large cinematic work presentation,
- compact proof/data surfaces,
- calm text sections.

This prevents the portfolio from feeling like an endless grid of identical cards.

---

## 6. Core components

### Header
Must always expose:
- Work
- Lab
- Experience
- About
- Contact
- Résumé

Enhancements:
- Sticky translucent background.
- Page-progress line.
- Active-section state.
- Quick Jump utility.

### Hero
Must answer immediately:
1. Who is this?
2. What role does he want?
3. What proof does he have?
4. Where can I see the work or résumé?

Required proof shown above the fold:
- 3 shipped Android games
- Unity / C# / Android
- 250+ students trained
- Building games since 2021

The visual side should showcase **real game imagery**, not abstract decorative mockups.

### Project cards
Every important project should communicate:
- Project name
- Status
- Platform
- Stack
- Hussam's ownership / contribution
- A short explanation of why the project matters
- A direct next action (case study, store, source, video, etc.)

### Case study
Prefer this sequence:
1. Context
2. Responsibility
3. Systems / implementation
4. Problems / constraints
5. Solution
6. Outcome / learning

Use screenshots as evidence, not as decoration.

### Quick Jump
Purpose: add developer personality while helping recruiters move faster.

Shortcut: `/`

Contains only high-value destinations:
- Selected work
- PawDoku case study
- Experience
- Résumé
- GitHub
- Contact

---

## 7. Motion system

### Motion hierarchy

**Level 1 — functional:**
- nav states
- button hover
- active section
- lightbox

**Level 2 — polish:**
- scroll reveal
- image scale on hover
- card lift
- pointer spotlight

**Level 3 — signature:**
- hero device float
- hero card depth/tilt
- ambient grid/glow

Only the hero receives Level 3 motion. This keeps the rest of the page easy to scan.

### Timing

- Micro interaction: `140–250ms`
- Card / image transition: `220–700ms`
- Scroll reveal: about `620ms`
- Ambient motion: `5–8s`

### Accessibility

All decorative animation must obey `prefers-reduced-motion: reduce`.

Never:
- hide required content until an animation completes,
- use scroll-jacking,
- autoplay audio,
- make cursor effects required for navigation,
- make hover the only way to reveal essential information.

---

## 8. Recruiter / hiring UI rules

These rules matter more than visual novelty.

### Above the fold
A recruiter should see without scrolling:
- **Unity Game Developer / C# / Mobile**
- **3 shipped Android games**
- a visible **Selected Work** CTA
- a visible **Résumé** CTA
- GitHub / LinkedIn
- real game imagery

### Within the first project
Show evidence that Hussam can own production systems, not only mechanics:
- gameplay
- progression
- saving/cloud
- monetisation
- analytics
- onboarding
- release work

### Trust signals
Prefer concrete proof over adjectives:

Good:
- `3 shipped Android games`
- `250+ students trained`
- `Published on Google Play`
- `Solo developer`

Avoid:
- "passionate"
- "hardworking"
- percentage skill bars
- arbitrary "expert" ratings

### Scanability
Use the **two-speed portfolio** model:

**10-second path:** Hero → featured project → shipped games → résumé/contact.

**10-minute path:** Case study → lab → experience → about → GitHub.

The portfolio must work for both.

---

## 9. Content rules for future projects

When adding a new project, do not just add another screenshot card. Add these fields:

- `Name`
- `Type` — Released / Prototype / Jam / Tool / Coursework
- `Role`
- `Engine / stack`
- `Platform`
- `Team size` if relevant
- `1-sentence hook`
- `3–5 things I built`
- `Most interesting technical problem`
- `Result / status`
- `Playable / Store / Source / Video` link when available

For a Unity recruiter, technical ownership and completion signal are more important than the number of projects.

---

## 10. Performance target

The site should feel game-inspired but perform like a professional portfolio.

Targets:
- No heavy 3D engine required for the landing page.
- Avoid large video backgrounds.
- Lazy-load images below the fold.
- Keep JavaScript enhancement-only; core content remains HTML.
- Aim for a fast mobile first load.
- Keep visual effects CSS-based where practical.

---

## 11. Do / Don't summary

### Do
- Let actual game screenshots dominate.
- Keep one memorable interactive idea.
- Make shipped status obvious.
- Use strong case studies.
- Keep résumé/contact one click away.
- Show technical depth with plain language.

### Don't
- Turn the whole site into a game that recruiters must learn to navigate.
- Add skill percentage bars.
- Add fake metrics.
- Use animations on every text block.
- Hide project details behind hover.
- Sacrifice mobile UX for desktop effects.


---

## 13. Interaction system — 2026-09 refinement

### Hero hierarchy
The person's name is always the strongest typographic element on the landing screen.

1. `Hussam Alkhatib` — primary identity / largest type.
2. `I build games that make it out of the editor.` — positioning statement.
3. Role, location, CTAs and proof metrics — supporting scan layer.

The positioning statement must never visually compete with the name.

### Persistent navigation
The primary navigation is fixed to the top edge and remains available throughout the scroll. It uses translucency and blur so it feels like a HUD layer without obscuring page content.

### Card response
Recruiter-facing cards may use a pointer-following radial highlight. The effect must:

- stay inside the card boundary;
- remain subtle enough that body text stays readable;
- never be required to discover content or controls;
- be disabled with reduced-motion preferences where appropriate.

### Motion intensity
The site now uses a more visible motion stack while preserving recruiter clarity:

- stronger scroll reveals with small blur + rise;
- section-heading signal lines;
- a slow hero-name highlight sweep;
- a scanning line and drifting grid in the featured-build panel;
- continuous stack/tool marquee;
- hover lift and mouse-follow glow on project, experience and tool cards.

Avoid adding unrelated motion merely to fill empty space. Every recurring animation should reinforce identity, hierarchy or interactivity.

## 14. Interactive ML project pattern

The Handwritten Digit Recognition project is a featured engineering demo rather than a normal project card.

### UI
- 280×280 pointer/touch drawing canvas.
- `Clear` and `Predict digit` actions.
- Large predicted digit.
- Confidence bars for classes 0–9.
- Visible model/runtime status.
- Source link to the original repository.

### Model integrity
The portfolio must use the trained network from the public `2HIK4/Number-Prediction` repository rather than a JavaScript heuristic or unrelated MNIST model.

The static GitHub Pages build performs inference client-side by:

1. preprocessing the canvas to a centered 28×28 inverted MNIST-style input;
2. lazily loading Python/NumPy in the browser;
3. fetching `saved_networks/np_64n_4l_2.pkl` from the project repository;
4. remapping the saved `Neuron` objects when unpickling;
5. running the original dense sigmoid layers + softmax output locally in the visitor's browser.

The expensive runtime is lazy-loaded only when a visitor asks for the first prediction so normal portfolio browsing stays lightweight.

## 15. Stack & tools section

The dedicated Stack & Tools section sits after Experience and before About. It is grouped by how a hiring manager scans capability rather than alphabetically:

- Game development: Unity, Unreal Engine, C#, C++.
- Programming & web: Python, JavaScript, HTML, CSS, PHP, SQL, MySQL, MySQLi, React Native.
- Design, art & media: Aseprite, Figma, Canva, Inkscape, Blender, Pixel art, 2D modeling, Audacity.
- Version control: Git, GitHub.

Use skill labels, not percentage bars. Skill claims should be supported elsewhere by projects, experience or repository evidence whenever possible.
