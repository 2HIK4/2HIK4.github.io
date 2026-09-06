# Hussam Alkhatib — Portfolio

Static GitHub Pages portfolio built with **HTML, CSS and vanilla JavaScript**.

## Live URL

After pushing these files to the root of the `2HIK4.github.io` repository:

`https://2hik4.github.io/`

## Files

```text
/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── Hussam-Alkhatib-CV.pdf        # add this when your CV is ready
    ├── icons/
    │   └── favicon.svg
    ├── games/
    │   ├── pawdoku/
    │   │   ├── cover.png
    │   │   ├── screenshot-1.png
    │   │   ├── screenshot-2.png
    │   │   ├── screenshot-3.png
    │   │   ├── screenshot-4.png
    │   │   └── screenshot-5.png
    │   ├── orbix/
    │   │   ├── cover.png
    │   │   ├── screenshot-1.png
    │   │   └── screenshot-2.png
    │   └── risky-landing/
    │       ├── cover.png
    │       ├── screenshot-1.png
    │       └── screenshot-2.png
    └── images/
        ├── unity-projects.png
        ├── tcrt24.jpg
        ├── ctc-training.jpg
        ├── ieee-training.jpg
        ├── social-preview.png
        └── linkedin-banner-reference.png
```

## Images already included

The first version uses images/screenshots supplied in the conversation for:

- PawDoku
- OrbiX
- Risky Landing
- Unity project/prototype folders
- TCRT24 award
- CTC training
- IEEE Arduino training

You can replace any image later without changing the layout, as long as you keep the same filename.

## Images worth replacing later

For the strongest final version, replace the temporary/cropped game assets with original high-resolution files:

- `assets/games/orbix/cover.png` — original OrbiX key art
- `assets/games/orbix/screenshot-1.png` and `screenshot-2.png` — clean gameplay screenshots
- `assets/games/risky-landing/cover.png` — original Risky Landing key art
- `assets/games/risky-landing/screenshot-1.png` and `screenshot-2.png` — clean gameplay screenshots
- `assets/images/tcrt24.jpg` — original award photo rather than a crop from LinkedIn
- `assets/images/ctc-training.jpg` — original training photo
- `assets/images/ieee-training.jpg` — original training photo
- `assets/Hussam-Alkhatib-CV.pdf` — final CV

## Contact details

The phone number is marked with an HTML comment in `index.html`. To remove it from the public website, delete the `<a href="tel:...">...</a>` element directly beneath the `PHONE:` comment.

## Publish on GitHub Pages

1. Open your `2HIK4.github.io` repository.
2. Upload/replace the files in the repository root with this project.
3. Commit the changes to `main`.
4. Open **Settings → Pages**.
5. Select **Deploy from a branch → main → /(root)** if it is not already selected.
6. Visit `https://2hik4.github.io/` after deployment finishes.

No npm, build step, backend, or framework is required.


## v6 update
- Added the IEEE Sponsorship Leader image.
- Swapped the Sponsorship Leader and CTC Arduino Instructor timeline positions.
- Includes all prior v5 layout/mobile fixes.


## v7 mobile card fix
- PawDoku now uses the exact same published-game image ratio/behavior as OrbiX and Risky Landing on phones.
- Updated social preview image and cache version.
