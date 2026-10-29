# Global Migration — Cultures in Motion

A 20-slide interactive GEC 3 presentation on **Migration of Cultures Around the World**, with a focus on ASEAN Studies. Built with React, Vite, TypeScript, Tailwind CSS, Motion and Lucide icons. All visual assets, slides and quiz data are bundled locally. No login, database, runtime CDN or live data requests are required.

## Local setup

Use Node.js 22.12 or newer (Node 24 recommended).

```sh
npm install
npm run dev
```

Open the URL printed by Vite. On Windows with restricted PowerShell scripts, use `npm.cmd` in place of `npm`.

```sh
npm run build
npm run preview
```

The build checks TypeScript and generates `dist/`. Do not open `index.html` directly using a file URL; serve the application over HTTP.

## Classroom controls

- Next/previous buttons and Left/Right arrows change slides. Home returns to the title.
- Explore slides opens the table of contents; References jumps to slide 20.
- Fullscreen button or F toggles browser fullscreen when supported. Escape closes an overlay or exits browser fullscreen.
- Edit group details on the title slide to add group members, instructor and date. These values are saved in this browser only.
- Presenter notes opens a separate presenter window. Keep it on a private display and share only the audience window. Notes follow slide changes between tabs in the same browser.
- Plan approximately one minute per slide (20 minutes), plus 3–5 minutes for the quiz. For four presenters, assign slides 1–5, 6–10, 11–15 and 16–20; adapt the split to your group size.
- The quiz has exactly ten supplied questions, four choices each, answer revision, final confirmation, total score, percentage and retry. It never displays correctness feedback, an answer review or an answer key.

Answer keys are internal client-side logic, so they are discoverable by inspecting source code. This offline application prevents disclosure through the ordinary interface; it does not provide secure examination secrecy. Presenter notes are separate from the audience screen but are not access-controlled.

## Offline presentation

After building, run `npm run preview` locally; it can serve the bundled presentation without internet access. The production application also registers a service worker on HTTPS or localhost. Visit once while online and wait for caching before presenting offline. Reload once before disconnecting to ensure the page is controlled by the service worker. External reference links need internet access. Browser storage clearing removes the offline cache and saved group details. The Vite development server does not install the production offline cache.

## Vercel

Import `futuretechresearchers-crypto/GEC-3-Presentation_Benz` in Vercel and select:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Vite |
| Root directory | repository root |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 24.x |
| Environment variables | None required |

`vercel.json` declares the framework, build and output directory. Vercel account access and repository integration are needed to publish. A Git push alone is not proof of a deployed public site. Confirm the deployment is Ready, open its production URL in a signed-out browser, and disable deployment protection for classroom access if applicable.

## Content and sources

Slide data, notes and citations are in `src/data.ts`. Quiz wording is in `src/questions.json`. Full source links and definitions appear on slide 20. Statistics are explicitly historical: UN DESA/IOM mid-2024 international migrant estimates and BSP calendar-year 2024 personal remittances. Do not describe them as a live count. The globe is an original local SVG illustration; routes are illustrative, not geographic flow measurements. No external image licenses or online fonts are needed.

## Verification

```sh
npm test
npm run test:e2e
npm run build
```

Unit tests verify quiz structure and scoring. Browser tests cover the slide deck, keyboard controls, notes, quiz navigation and confirmation, score-only results, reset, fullscreen, mobile layout and an offline reload. `playwright.config.ts` uses the installed Windows Chrome executable; change `executablePath` for another platform or install Playwright Chromium and remove that option.

See [TESTING.md](TESTING.md) for executed checks and remaining limits.
