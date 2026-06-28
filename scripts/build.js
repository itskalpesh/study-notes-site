#!/usr/bin/env node
/**
 * build.js
 * ---------------------------------------------------------------------------
 * Scans the repository for "subject" folders (any top-level folder that isn't
 * reserved/infra), finds every Markdown file inside each one, and writes two
 * files to the repo root:
 *
 *   notes.json         -> sidebar/navigation structure
 *   search-index.json  -> note content used for instant search
 *
 * That's it — there is no copy step and no separate "dist" output folder.
 * index.html / style.css / script.js and your subject folders already live
 * at the repo root, so the site can be served from exactly where it sits.
 *
 * Both generated files are listed in .gitignore, so running this locally
 * never adds anything to your git history. In CI, the workflow runs this in
 * a throwaway checkout and uploads the whole root as the Pages artifact —
 * the generated files exist only for the lifetime of that deployment.
 *
 * This script has ZERO npm dependencies on purpose — it only uses Node's
 * built-in fs/path modules, so `npm install` is never required.
 *
 * You should never need to edit this file to add notes. Just add a folder,
 * add Markdown files inside it, and push. This script does the rest.
 * ---------------------------------------------------------------------------
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

// Folders that are never treated as "subjects", even though they live at the
// repository root.
const RESERVED_DIRS = new Set([
  ".git",
  ".github",
  ".vscode",
  ".idea",
  "node_modules",
  "dist",
  "scripts",
  ".obsidian",
]);

function log(message) {
  console.log(`[build] ${message}`);
}

/** Turn "waterfall-model" or "waterfall_model" into "Waterfall Model". */
function titleCaseFromFilename(filename) {
  const base = filename.replace(/\.md$/i, "");
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .map((word) => (word.length ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

/**
 * Reads a Markdown file and returns { title, content }.
 * The title is taken from the first ATX heading (`# Heading`). If no heading
 * is found, the title is derived from the filename instead.
 */
function readNote(fullPath, filename) {
  const content = fs.readFileSync(fullPath, "utf8");
  const headingMatch = content.match(/^#\s+(.+?)\s*$/m);
  const title = headingMatch ? headingMatch[1].trim() : titleCaseFromFilename(filename);
  return { title, content };
}

/**
 * Strips Markdown syntax down to plain, searchable text. This does not need
 * to be perfect — it just needs to avoid polluting search results with raw
 * symbols like `#`, `**`, table pipes, etc.
 */
function toPlainText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ") // fenced code blocks
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/!\[\[([^\]]+)\]\]/g, " ") // obsidian image embeds
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // markdown images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // markdown links -> link text
    .replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, link, alias) => alias || link) // wiki links
    .replace(/^#{1,6}\s+/gm, "") // heading markers
    .replace(/[*_~>`#-]/g, " ") // remaining markdown punctuation
    .replace(/\|/g, " ") // table pipes
    .replace(/\s+/g, " ")
    .trim();
}

function isReservedEntry(name) {
  return RESERVED_DIRS.has(name) || name.startsWith(".");
}

function discoverSubjects() {
  const entries = fs.readdirSync(ROOT, { withFileTypes: true });
  const subjects = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (isReservedEntry(entry.name)) continue;

    const subjectPath = path.join(ROOT, entry.name);
    const files = fs.readdirSync(subjectPath, { withFileTypes: true });
    const mdFiles = files.filter((f) => f.isFile() && f.name.toLowerCase().endsWith(".md"));

    // Skip folders that don't contain any Markdown — they're probably not a
    // "subject" folder (e.g. an assets-only or unrelated directory).
    if (mdFiles.length === 0) continue;

    subjects.push({ name: entry.name, dirPath: subjectPath, mdFiles });
  }

  // Alphabetical order. Prefix filenames with numbers (01-, 02-, ...) if you
  // want explicit manual ordering within a subject — it sorts naturally.
  subjects.sort((a, b) => a.name.localeCompare(b.name));
  return subjects;
}

function build() {
  log("Starting build...");

  const subjects = discoverSubjects();

  if (subjects.length === 0) {
    log("WARNING: no subject folders with Markdown files were found.");
  }

  const notesManifest = [];
  const searchIndex = [];

  for (const subject of subjects) {
    const notes = [];
    const sortedFiles = [...subject.mdFiles].sort((a, b) => a.name.localeCompare(b.name));

    for (const file of sortedFiles) {
      const fullPath = path.join(subject.dirPath, file.name);
      const { title, content } = readNote(fullPath, file.name);

      notes.push({ title, file: file.name });

      searchIndex.push({
        subject: subject.name,
        path: subject.name,
        title,
        file: file.name,
        content: toPlainText(content).slice(0, 20000),
      });
    }

    notesManifest.push({
      subject: subject.name,
      path: subject.name,
      notes,
    });

    log(`Subject "${subject.name}": ${notes.length} note(s)`);
  }

  fs.writeFileSync(path.join(ROOT, "notes.json"), JSON.stringify(notesManifest, null, 2));
  fs.writeFileSync(path.join(ROOT, "search-index.json"), JSON.stringify(searchIndex, null, 2));

  // Sanity-check that the site shell is actually present — these files are
  // never generated by this script, just verified.
  for (const file of ["index.html", "style.css", "script.js"]) {
    if (!fs.existsSync(path.join(ROOT, file))) {
      log(`WARNING: expected site file "${file}" was not found at repo root.`);
    }
  }

  log(`Done. ${subjects.length} subject(s), ${searchIndex.length} note(s). notes.json and search-index.json written to the repo root.`);
}

build();
