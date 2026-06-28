# Study Notes Site

A documentation-style website, generated automatically from a folder of Obsidian Markdown notes. No backend, no database, no manual JSON editing — point it at GitHub Pages and push.

This repo ships with three example subjects (**Software Engineering**, **Cyber Security**, **DBMS**) so you can see exactly how it behaves. Replace them with your own vault whenever you're ready — see [Adding your own notes](#adding-your-own-notes).

## How it works

```
Your repo
├── index.html, style.css, script.js   ← the site shell (don't need to touch)
├── scripts/build.js                   ← scans folders, writes notes.json
├── .github/workflows/deploy.yml       ← runs the build + deploys on every push
│
├── Software Engineering/              ← a "subject" — any top-level folder
│   ├── defining-software.md           ← a "note" — any .md file inside it
│   ├── diagram.jpg                    ← images live next to the notes that use them
│   └── ...
├── Cyber Security/
└── DBMS/
```

Every time you push to `main`:

1. GitHub Actions checks out the repo and runs `node scripts/build.js`.
2. It scans every top-level folder, finds the `.md` files inside, and reads the first `# Heading` of each one to use as its title.
3. It writes two files **directly into that checkout** — `notes.json` (sidebar structure) and `search-index.json` (search content). You never touch either by hand.
4. The whole checkout (your site shell + subject folders + those two generated files) is uploaded straight to GitHub Pages — no separate build-output folder, no copying.

There's deliberately no `dist/` folder. `index.html`, `style.css`, and `script.js` already sit next to your subject folders at the repo root, so once the two JSON files exist alongside them, the whole thing is already a working site — locally and on Pages. The folder structure is the source of truth: add a folder, add `.md` files, push, and the sidebar updates itself.

The build runs inside a throwaway GitHub Actions checkout, so `notes.json` and `search-index.json` never get committed to your repository — they exist only for the lifetime of each deployment. `.gitignore` keeps them out of your local commits too.

## Setup

1. **Create the repo.** Push this folder to a new GitHub repository.
2. **Enable Pages.** In the repo, go to **Settings → Pages → Build and deployment**, and set **Source** to **GitHub Actions**.
3. **Push to `main`.** The included workflow (`.github/workflows/deploy.yml`) will build and deploy automatically. Check the **Actions** tab for progress; the deployed URL appears there and under **Settings → Pages** once it finishes.

That's it — no npm install required in CI, since the build script has zero dependencies.

## Adding your own notes

1. Create a new top-level folder named after the subject, e.g. `Operating Systems/`.
2. Drop your `.md` files inside it. The **first line that looks like `# A Heading`** becomes the note's title in the sidebar; if a file has no heading, its filename is title-cased instead (`memory-management.md` → "Memory Management").
3. Drop any images the notes reference into the **same folder**.
4. Commit and push. The next Actions run regenerates everything.

You never edit `notes.json` or `search-index.json` by hand — they're build output, not source, and `.gitignore` keeps `dist/` out of the repo entirely.

**Ordering notes:** subjects and notes are sorted alphabetically. If you want a specific order, prefix filenames with numbers: `01-intro.md`, `02-architecture.md`.

**Images:** both Markdown syntaxes work, and resolve relative to the note's own folder:
```markdown
![](diagram.jpg)
![[diagram.jpg]]
```

**Linking between notes:** standard Markdown links and Obsidian wiki-links both work and open in-app (no page reload):
```markdown
[Normalization](normalization.md)
[[Normalization]]
[[Normalization|see normalization]]
```

## Local preview

No dependencies needed:

```bash
npm run build     # writes notes.json + search-index.json to the repo root
npm run preview   # serves the repo root at http://localhost:8080
```

or in one step: `npm start`. Re-run `npm run build` any time you add or rename notes — `npm run preview` doesn't need to be restarted, just refresh the browser.

## Features

- **Sidebar** generated from your folders — expand/collapse, active-note highlight, never shows images, `.md` extensions, or raw paths.
- **Instant search** across subject names, note titles, and full note content, via a command-palette style modal (`Ctrl/Cmd K` or `/`).
- **Markdown rendering**: headings (with anchor links and an auto-built "On this page" outline), tables, ordered/unordered lists, GitHub-style checklists, fenced code blocks with syntax highlighting and a copy button, blockquotes, horizontal rules, and both internal and external links.
- **Dark / light mode**, persisted across visits, defaulting to your OS preference.
- **Responsive**: collapses to a slide-out drawer on mobile; the "On this page" rail hides on narrower screens.
- **Scroll progress bar** and **scroll-to-top button**.
- **Performance**: notes are fetched and parsed once, then cached in memory; the search index is only fetched the first time you open search.

## Customizing

- **Colors, fonts, spacing** — all defined as CSS variables at the top of `style.css` (`:root` for light mode, `:root[data-theme="dark"]` for dark).
- **Reading width** — `--reading-width` in `style.css` (defaults to 850px).
- **Site title** — edit the `<title>` and `.brand-text` in `index.html`.
- **Reserved folder names** the build script ignores (so they're never treated as a "subject") — see `RESERVED_DIRS` in `scripts/build.js`.

## Tech stack

Plain HTML, CSS, and vanilla JavaScript. Three small libraries are loaded from a CDN at runtime — no bundler, no `npm install` in CI:

- [marked](https://marked.js.org/) — Markdown parsing
- [highlight.js](https://highlightjs.org/) — code syntax highlighting
- [DOMPurify](https://github.com/cure53/DOMPurify) — sanitizes rendered HTML before it's inserted into the page

## Notes on the example content

The sample notes and placeholder diagrams under `Software Engineering/`, `Cyber Security/`, and `DBMS/` are just there to prove the pipeline end-to-end. Delete them (or leave them as a reference) once you've added your own vault.

## A note on what gets published

Since there's no separate build-output folder, the deployed site is effectively your whole repo (minus `.git`, which the workflow strips before publishing). That means files like `README.md`, `package.json`, and `scripts/build.js` are publicly fetchable at your Pages URL, the same way they would be if you used GitHub Pages' "deploy from a branch" option. That's normal for an open-source-style static site — just don't put secrets or anything you don't want public anywhere in this repo.
