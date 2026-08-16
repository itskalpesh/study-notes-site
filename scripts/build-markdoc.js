#!/usr/bin/env node
/**
 * build-markdoc.js
 * Compiles Markdoc files from subject folders and generates:
 * - notes.json (sidebar/navigation structure)
 * - search-index.json (searchable content index)
 * - HTML output for Next.js pages
 */

const fs = require('fs');
const path = require('path');
const Markdoc = require('@markdoc/markdoc');
const { tags, nodes, functions } = require('../markdoc.config');

const ROOT = path.resolve(__dirname, '..');
const CONTENT_DIR = path.join(ROOT, 'content');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SRC_DIR = path.join(ROOT, 'src');

const RESERVED_DIRS = new Set([
  '.git',
  '.github',
  '.vscode',
  '.idea',
  'node_modules',
  'dist',
  '.next',
  'scripts',
  '.obsidian',
  'public',
  'src',
]);

function log(message) {
  console.log(`[build] ${message}`);
}

/**
 * Title case from filename
 */
function titleCaseFromFilename(filename) {
  const base = filename.replace(/\.(md|markdoc)$/i, '');
  return base
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((word) => (word.length ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
}

/**
 * Read Markdoc file and extract metadata
 */
function readMarkdocFile(fullPath, filename) {
  const content = fs.readFileSync(fullPath, 'utf8');
  const ast = Markdoc.parse(content);
  const frontmatter = ast.attributes.frontmatter ? JSON.parse(ast.attributes.frontmatter) : {};
  
  // Extract first heading as title
  let title = frontmatter.title;
  if (!title) {
    const headingNode = findFirstHeading(ast);
    title = headingNode ? headingNode.attributes.content : titleCaseFromFilename(filename);
  }

  return { title, content, frontmatter, ast };
}

/**
 * Find first heading in AST
 */
function findFirstHeading(ast) {
  if (ast.type === 'heading' && ast.level === 1) {
    return ast;
  }
  if (ast.children) {
    for (const child of ast.children) {
      const result = findFirstHeading(child);
      if (result) return result;
    }
  }
  return null;
}

/**
 * Convert Markdoc AST to plain text for search
 */
function astToPlainText(ast) {
  if (typeof ast === 'string') return ast;
  if (!ast) return '';

  let text = '';

  if (ast.children) {
    for (const child of ast.children) {
      text += astToPlainText(child) + ' ';
    }
  }

  if (typeof ast.content === 'string') {
    text += ast.content + ' ';
  }

  return text
    .replace(/`[^`]+`/g, ' ') // inline code
    .replace(/\[.*?\]/g, ' ') // links
    .replace(/[#*_~>-]/g, ' ') // markdown symbols
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Check if entry is reserved
 */
function isReservedEntry(name) {
  return RESERVED_DIRS.has(name) || name.startsWith('.');
}

/**
 * Discover subject folders
 */
function discoverSubjects() {
  if (!fs.existsSync(CONTENT_DIR)) {
    log('WARNING: content/ directory not found. Creating it.');
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    return [];
  }

  const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const subjects = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (isReservedEntry(entry.name)) continue;

    const subjectPath = path.join(CONTENT_DIR, entry.name);
    const files = fs.readdirSync(subjectPath, { withFileTypes: true });
    const mdFiles = files.filter(
      (f) => f.isFile() && /\.(md|markdoc)$/i.test(f.name)
    );

    if (mdFiles.length === 0) continue;

    subjects.push({ name: entry.name, dirPath: subjectPath, mdFiles });
  }

  subjects.sort((a, b) => a.name.localeCompare(b.name));
  return subjects;
}

/**
 * Main build function
 */
async function build() {
  log('Starting Markdoc build...');

  const subjects = discoverSubjects();

  if (subjects.length === 0) {
    log('WARNING: no subject folders with Markdoc files were found.');
  }

  const notesManifest = [];
  const searchIndex = [];

  for (const subject of subjects) {
    const notes = [];
    const sortedFiles = [...subject.mdFiles].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    for (const file of sortedFiles) {
      const fullPath = path.join(subject.dirPath, file.name);
      try {
        const { title, content, ast } = readMarkdocFile(fullPath, file.name);
        const plainText = astToPlainText(ast).slice(0, 20000);

        const noteKey = `${subject.name}/${file.name.replace(/\.(md|markdoc)$/i, '')}`;
        notes.push({
          title,
          file: file.name,
          key: noteKey,
        });

        searchIndex.push({
          subject: subject.name,
          path: subject.name,
          title,
          file: file.name,
          key: noteKey,
          content: plainText,
        });
      } catch (e) {
        log(`ERROR reading ${file.name}: ${e.message}`);
      }
    }

    notesManifest.push({
      subject: subject.name,
      path: subject.name,
      notes,
    });

    log(`Subject "${subject.name}": ${notes.length} note(s)`);
  }

  // Ensure public directory exists
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  // Write JSON files for frontend
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'notes.json'),
    JSON.stringify(notesManifest, null, 2)
  );
  fs.writeFileSync(
    path.join(PUBLIC_DIR, 'search-index.json'),
    JSON.stringify(searchIndex, null, 2)
  );

  log(
    `Done. ${subjects.length} subject(s), ${searchIndex.length} note(s). ` +
    `notes.json and search-index.json written to public/`
  );
}

build().catch((err) => {
  console.error('Build failed:', err);
  process.exit(1);
});
