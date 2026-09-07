# Hussam Alkhatib — portfolio redesign

A static HTML/CSS/JavaScript portfolio designed around real work, case-study depth, and recruiter readability rather than decorative developer-template UI.

## Files

- `index.html` — portfolio homepage
- `pawdoku.html` — dedicated PawDoku case study
- `style.css` — all desktop/mobile styling
- `script.js` — navigation, reveal motion and image lightbox
- `assets/images/ctc-team.jpg` — the new CTC photo supplied in this chat

## Existing assets

The design intentionally reuses the game and project images that are already live in the current `2HIK4.github.io` repository. The HTML currently references those existing images through `https://2hik4.github.io/assets/...`, so this package can be previewed without copying the full old asset tree.

When you are ready to deploy, keep the existing `assets/` folder in the repository and add `assets/images/ctc-team.jpg` from this package.

## Deploy

1. Back up the current repository.
2. Replace root `index.html`, `style.css`, and `script.js` with the files in this package.
3. Add `pawdoku.html` to the repository root.
4. Upload `assets/images/ctc-team.jpg`.
5. Keep the rest of the existing `assets/` directory unchanged.
6. Commit to `main`; GitHub Pages should redeploy automatically.

## Next portfolio pass

The `Game lab` section intentionally uses the existing Unity-project-folder image for now. When the prototype audit is finished, replace that section with 6–10 real gameplay screenshots/GIFs and a one-line note about what each prototype tested.
