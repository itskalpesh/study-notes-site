/* =========================================================================
   Study Notes — app logic
   No frameworks. No build step on the client. Everything here talks
   directly to notes.json / search-index.json / *.md files that the build
   script generates from the folder structure.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * State
   * --------------------------------------------------------------------- */
  const state = {
    manifest: [],                 // [{ subject, path, notes: [{title, file}] }]
    titleIndex: new Map(),        // lowercased title/filename -> { subject, file }
    noteCache: new Map(),         // "subject/file" -> { html, title, headings }
    searchIndex: null,            // lazy-loaded array
    searchIndexPromise: null,
    currentKey: null,             // "subject/file" currently displayed
    expandedSubjects: new Set(),
  };

  const el = {
    sidebarTree: document.getElementById("sidebarTree"),
    contentInner: document.getElementById("contentInner"),
    tocRail: document.getElementById("tocRail"),
    tocNav: document.getElementById("tocNav"),
    layout: document.querySelector(".layout"),
    progressBar: document.getElementById("progressBar"),
    scrollTopBtn: document.getElementById("scrollTopBtn"),
    themeToggle: document.getElementById("themeToggle"),
    menuToggle: document.getElementById("menuToggle"),
    sidebar: document.getElementById("sidebar"),
    sidebarBackdrop: document.getElementById("sidebarBackdrop"),
    searchTrigger: document.getElementById("searchTrigger"),
    searchModal: document.getElementById("searchModal"),
    searchBackdrop: document.getElementById("searchBackdrop"),
    searchInput: document.getElementById("searchInput"),
    searchResults: document.getElementById("searchResults"),
    mainContent: document.getElementById("main-content"),
  };

  /* ---------------------------------------------------------------------
   * Small utilities
   * --------------------------------------------------------------------- */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slugify(text) {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function noteKey(subject, file) {
    return `${subject}/${file}`;
  }

  function encodePath(subject, file) {
    return `${encodeURIComponent(subject)}/${encodeURIComponent(file)}`;
  }

  /** Join a relative href against a subject "directory", resolving ../ etc. */
  function resolveRelativePath(subject, relativeHref) {
    const base = `https://notes.local/${encodeURIComponent(subject)}/`;
    let resolved;
    try {
      resolved = new URL(relativeHref, base);
    } catch (e) {
      return null;
    }
    if (resolved.origin !== "https://notes.local") return null; // escaped our fake root
    return decodeURIComponent(resolved.pathname.replace(/^\//, ""));
  }

  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  /* ---------------------------------------------------------------------
   * Theme (dark / light)
   * --------------------------------------------------------------------- */
  function initTheme() {
    const saved = localStorage.getItem("study-notes-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("study-notes-theme", next);
  }

  /* ---------------------------------------------------------------------
   * Markdown rendering (marked + custom renderer + DOMPurify + highlight.js)
   * --------------------------------------------------------------------- */
  let currentRenderSubject = "";
  let headingSlugCounts = null;
  let collectedHeadings = null;

  function configureMarked() {
    marked.use({ gfm: true, breaks: false });

    const renderer = {
      heading(token) {
        const text = this.parser.parseInline(token.tokens);
        const plain = token.text;
        let slug = slugify(plain) || "section";
        const count = headingSlugCounts.get(slug) || 0;
        headingSlugCounts.set(slug, count + 1);
        if (count > 0) slug = `${slug}-${count}`;

        if (token.depth >= 2 && token.depth <= 3 && collectedHeadings) {
          collectedHeadings.push({ depth: token.depth, text: plain, id: slug });
        }

        return `<h${token.depth} id="${slug}"><a class="heading-anchor" href="#${slug}" aria-label="Link to this section">#</a>${text}</h${token.depth}>\n`;
      },

      image(token) {
        const resolved = resolveAssetSrc(token.href);
        const alt = escapeHtml(token.text || "");
        const titleAttr = token.title ? ` title="${escapeHtml(token.title)}"` : "";
        const caption = token.title ? `<figcaption>${escapeHtml(token.title)}</figcaption>` : "";
        return `<span class="img-wrap"><img src="${resolved}" alt="${alt}" loading="lazy"${titleAttr}>${caption}</span>`;
      },

      code(token) {
        const lang = (token.lang || "").trim().split(/\s+/)[0];
        let highlighted;
        let langLabel = lang;
        try {
          if (lang && hljs.getLanguage(lang)) {
            highlighted = hljs.highlight(token.text, { language: lang }).value;
          } else {
            const auto = hljs.highlightAuto(token.text);
            highlighted = auto.value;
            langLabel = auto.language || "";
          }
        } catch (e) {
          highlighted = escapeHtml(token.text);
        }
        const langTag = langLabel ? `<span class="code-block-lang">${escapeHtml(langLabel)}</span>` : "";
        return `<div class="code-block-wrap">${langTag}<button class="copy-btn" type="button" aria-label="Copy code" title="Copy code">${copyIconSvg()}</button><pre><code class="hljs">${highlighted}</code></pre></div>`;
      },

      link(token) {
        const href = token.href || "";
        const text = this.parser.parseInline(token.tokens);

        // Obsidian wiki-link, resolved by note title/filename lookup.
        if (href.startsWith("wikilink:")) {
          const target = decodeURIComponent(href.slice("wikilink:".length));
          const match = state.titleIndex.get(target.toLowerCase());
          if (match) {
            return `<a href="#/${encodePath(match.subject, match.file)}" data-internal>${text}</a>`;
          }
          return `<span class="broken-link" title="Note not found: ${escapeHtml(target)}">${text}</span>`;
        }

        // External links.
        if (/^[a-z]+:\/\//i.test(href) || href.startsWith("mailto:")) {
          return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        }

        // In-page anchor.
        if (href.startsWith("#")) {
          return `<a href="${escapeHtml(href)}">${text}</a>`;
        }

        // Relative link to another note in the vault.
        if (/\.md($|[?#])/i.test(href)) {
          const resolved = resolveRelativePath(currentRenderSubject, href);
          if (resolved) {
            const segments = resolved.split("/");
            const file = segments.pop();
            const subject = segments.join("/");
            return `<a href="#/${encodePath(subject, file)}" data-internal>${text}</a>`;
          }
        }

        // Relative link to some other asset — resolve like an image path.
        const resolved = resolveAssetSrc(href);
        return `<a href="${resolved}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      },
    };

    marked.use({ renderer });
  }

  function copyIconSvg() {
    return '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>';
  }

  function resolveAssetSrc(href) {
    if (!href) return href;
    if (/^[a-z]+:\/\//i.test(href) || href.startsWith("data:")) return href;
    const resolved = resolveRelativePath(currentRenderSubject, href);
    if (!resolved) return href;
    return resolved.split("/").map(encodeURIComponent).join("/");
  }

  /**
   * Converts Obsidian-style embeds/wikilinks into standard Markdown the
   * renderer above already knows how to handle, while leaving fenced code
   * blocks untouched.
   */
  function preprocessObsidianSyntax(markdown) {
    const segments = markdown.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/);
    for (let i = 0; i < segments.length; i++) {
      if (i % 2 === 1) continue; // inside a fenced code block — leave as-is
      segments[i] = segments[i]
        // ![[image.jpg]] or ![[image.jpg|alt]]
        .replace(/!\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, target, alias) => {
          const alt = alias || "";
          return `![${alt}](${target.trim()})`;
        })
        // [[Note Name]] or [[Note Name|Alias]] (not preceded by "!")
        .replace(/(^|[^!])\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, pre, target, alias) => {
          const label = (alias || target).trim();
          return `${pre}[${label}](wikilink:${encodeURIComponent(target.trim())})`;
        });
    }
    return segments.join("");
  }

  /** Removes a single leading "# Title" line so it isn't duplicated below the page header. */
  function stripLeadingH1(markdown) {
    return markdown.replace(/^\s*#\s+.+?\s*\n/, "");
  }

  function renderMarkdown(markdown, subject) {
    currentRenderSubject = subject;
    headingSlugCounts = new Map();
    collectedHeadings = [];

    const prepped = preprocessObsidianSyntax(stripLeadingH1(markdown));
    const rawHtml = marked.parse(prepped);
    const safeHtml = DOMPurify.sanitize(rawHtml, {
      ADD_ATTR: ["target", "loading"],
    });

    return { html: safeHtml, headings: collectedHeadings };
  }

  /* ---------------------------------------------------------------------
   * Sidebar
   * --------------------------------------------------------------------- */
  function folderIconSvg() {
    return '<svg class="folder-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>';
  }
  function fileIconSvg() {
    return '<svg class="file-icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"/><path d="M14 3v4h4"/></svg>';
  }
  function chevronSvg() {
    return '<svg class="chevron" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';
  }

  function buildSidebar() {
    el.sidebarTree.innerHTML = "";

    if (state.manifest.length === 0) {
      el.sidebarTree.innerHTML = '<div class="sidebar-loading">No subject folders found yet. Add a folder with .md files and push.</div>';
      return;
    }

    state.manifest.forEach((subject, index) => {
      const block = document.createElement("div");
      block.className = "subject-block";

      const expanded = state.expandedSubjects.has(subject.subject) || (state.expandedSubjects.size === 0 && index === 0);
      if (expanded) state.expandedSubjects.add(subject.subject);

      const toggle = document.createElement("button");
      toggle.className = "subject-toggle";
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", String(expanded));
      toggle.innerHTML = `${chevronSvg()}${folderIconSvg()}<span class="subject-name">${escapeHtml(subject.subject)}</span><span class="note-count">${subject.notes.length}</span>`;

      const list = document.createElement("ul");
      list.className = "note-list" + (expanded ? " expanded" : "");

      subject.notes.forEach((note) => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.className = "note-link";
        a.href = `#/${encodePath(subject.subject, note.file)}`;
        a.dataset.subject = subject.subject;
        a.dataset.file = note.file;
        a.innerHTML = `${fileIconSvg()}<span>${escapeHtml(note.title)}</span>`;
        a.addEventListener("click", () => closeDrawer());
        li.appendChild(a);
        list.appendChild(li);
      });

      toggle.addEventListener("click", () => {
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!isExpanded));
        list.classList.toggle("expanded", !isExpanded);
        if (isExpanded) {
          state.expandedSubjects.delete(subject.subject);
        } else {
          state.expandedSubjects.add(subject.subject);
        }
      });

      block.appendChild(toggle);
      block.appendChild(list);
      el.sidebarTree.appendChild(block);
    });
  }

  function highlightActiveNote(subject, file) {
    const links = el.sidebarTree.querySelectorAll(".note-link");
    links.forEach((link) => {
      const isActive = link.dataset.subject === subject && link.dataset.file === file;
      link.classList.toggle("active", isActive);
      if (isActive) {
        const list = link.closest(".note-list");
        const toggle = list && list.previousElementSibling;
        if (list && !list.classList.contains("expanded")) {
          list.classList.add("expanded");
          if (toggle) toggle.setAttribute("aria-expanded", "true");
          state.expandedSubjects.add(subject);
        }
        link.scrollIntoView({ block: "nearest" });
      }
    });
  }

  /* ---------------------------------------------------------------------
   * Table of contents (right rail)
   * --------------------------------------------------------------------- */
  let tocObserver = null;

  function buildToc(headings) {
    if (tocObserver) {
      tocObserver.disconnect();
      tocObserver = null;
    }

    if (!headings || headings.length === 0) {
      el.tocRail.hidden = true;
      el.layout.classList.add("no-toc");
      el.tocNav.innerHTML = "";
      return;
    }

    el.tocRail.hidden = false;
    el.layout.classList.remove("no-toc");

    const ul = document.createElement("ul");
    headings.forEach((h) => {
      const li = document.createElement("li");
      li.className = h.depth === 3 ? "toc-h3" : "toc-h2";
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.textContent = h.text;
      a.dataset.id = h.id;
      li.appendChild(a);
      ul.appendChild(li);
    });
    el.tocNav.innerHTML = "";
    el.tocNav.appendChild(ul);

    const tocLinks = el.tocNav.querySelectorAll("a");
    tocObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = el.tocNav.querySelector(`a[data-id="${entry.target.id}"]`);
          if (!link) return;
          if (entry.isIntersecting) {
            tocLinks.forEach((l) => l.classList.remove("active"));
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => {
      const target = document.getElementById(h.id);
      if (target) tocObserver.observe(target);
    });
  }

  /* ---------------------------------------------------------------------
   * Note rendering / navigation
   * --------------------------------------------------------------------- */
  function findNoteMeta(subject, file) {
    const subjectEntry = state.manifest.find((s) => s.subject === subject);
    if (!subjectEntry) return null;
    const note = subjectEntry.notes.find((n) => n.file === file);
    if (!note) return null;
    return { subject, file, title: note.title };
  }

  async function loadNote(subject, file) {
    const key = noteKey(subject, file);
    if (state.noteCache.has(key)) return state.noteCache.get(key);

    const url = encodePath(subject, file);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Could not load ${key} (${response.status})`);
    const markdown = await response.text();
    const { html, headings } = renderMarkdown(markdown, subject);

    const result = { html, headings };
    state.noteCache.set(key, result);
    return result;
  }

  async function showNote(subject, file) {
    const meta = findNoteMeta(subject, file);

    el.contentInner.innerHTML = '<div class="sidebar-loading">Loading note…</div>';

    try {
      const { html, headings } = await loadNote(subject, file);
      const title = meta ? meta.title : file.replace(/\.md$/i, "");

      el.contentInner.innerHTML = `
        <article class="note-fade-in">
          <p class="note-breadcrumb">${escapeHtml(subject)}</p>
          <h1 class="note-title">${escapeHtml(title)}</h1>
          <div class="markdown-body">${html}</div>
        </article>
      `;

      wrapTables();
      attachInternalLinkHandlers();
      buildToc(headings);
      highlightActiveNote(subject, file);
      document.title = `${title} · Study Notes`;
      el.mainContent.scrollTo({ top: 0 });
      window.scrollTo({ top: 0 });
      state.currentKey = noteKey(subject, file);
    } catch (err) {
      el.contentInner.innerHTML = `
        <div class="error-state">
          <h2>Couldn't load this note</h2>
          <p>${escapeHtml(err.message)}</p>
        </div>
      `;
      buildToc([]);
    }
  }

  function wrapTables() {
    el.contentInner.querySelectorAll(".markdown-body table").forEach((table) => {
      if (table.parentElement.classList.contains("table-wrapper")) return;
      const wrapper = document.createElement("div");
      wrapper.className = "table-wrapper";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });
  }

  function attachInternalLinkHandlers() {
    // Internal note links already carry href="#/Subject/file.md" so the
    // global hashchange listener handles them automatically. We only need
    // to wire up the per-code-block copy buttons here.
    el.contentInner.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const code = btn.closest(".code-block-wrap").querySelector("code");
        navigator.clipboard.writeText(code.textContent).then(() => {
          btn.classList.add("copied");
          btn.innerHTML = checkIconSvg();
          setTimeout(() => {
            btn.classList.remove("copied");
            btn.innerHTML = copyIconSvg();
          }, 1500);
        });
      });
    });
  }

  function checkIconSvg() {
    return '<svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
  }

  function showLanding() {
    document.title = "Study Notes";
    state.currentKey = null;
    highlightActiveNote("", "");
    buildToc([]);

    const totalNotes = state.manifest.reduce((sum, s) => sum + s.notes.length, 0);

    const cards = state.manifest
      .map(
        (s) => `
        <a class="landing-card" href="#/${encodeURIComponent(s.subject)}/${encodeURIComponent(s.notes[0] ? s.notes[0].file : "")}">
          <div class="card-subject">${escapeHtml(s.subject)}</div>
          <div class="card-count">${s.notes.length} note${s.notes.length === 1 ? "" : "s"}</div>
        </a>`
      )
      .join("");

    el.contentInner.innerHTML = `
      <div class="landing note-fade-in">
        <p class="landing-eyebrow">Obsidian vault → documentation site</p>
        <h1>Study Notes</h1>
        <p class="lede">Generated automatically from a folder of Markdown files. Pick a subject from the sidebar, or search across every note.</p>
        <div class="landing-stats">
          <div class="landing-stat"><div class="num">${state.manifest.length}</div><div class="label">Subjects</div></div>
          <div class="landing-stat"><div class="num">${totalNotes}</div><div class="label">Notes</div></div>
        </div>
        <div class="landing-grid">${cards}</div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
   * Routing (hash-based, so it works as a static SPA on GitHub Pages)
   * --------------------------------------------------------------------- */
  function parseHash() {
    const hash = decodeURIComponent(location.hash || "");
    const match = hash.match(/^#\/(.+)\/([^/]+\.md)$/i);
    if (!match) return null;
    return { subject: match[1], file: match[2] };
  }

  function handleRoute() {
    const route = parseHash();
    if (!route) {
      showLanding();
      return;
    }
    showNote(route.subject, route.file);
  }

  /* ---------------------------------------------------------------------
   * Mobile drawer
   * --------------------------------------------------------------------- */
  function openDrawer() {
    document.body.classList.add("drawer-open");
    el.menuToggle.setAttribute("aria-expanded", "true");
  }
  function closeDrawer() {
    document.body.classList.remove("drawer-open");
    el.menuToggle.setAttribute("aria-expanded", "false");
  }
  function toggleDrawer() {
    if (document.body.classList.contains("drawer-open")) closeDrawer();
    else openDrawer();
  }

  /* ---------------------------------------------------------------------
   * Scroll progress + scroll-to-top
   * --------------------------------------------------------------------- */
  function onScroll() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (scrollTop / max) * 100 : 0;
    el.progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    el.scrollTopBtn.classList.toggle("visible", scrollTop > 420);
  }

  let scrollScheduled = false;
  function onScrollThrottled() {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => {
      onScroll();
      scrollScheduled = false;
    });
  }

  /* ---------------------------------------------------------------------
   * Search
   * --------------------------------------------------------------------- */
  function loadSearchIndex() {
    if (state.searchIndexPromise) return state.searchIndexPromise;
    state.searchIndexPromise = fetch("search-index.json")
      .then((r) => {
        if (!r.ok) throw new Error("search index unavailable");
        return r.json();
      })
      .then((data) => {
        state.searchIndex = data;
        return data;
      })
      .catch(() => {
        state.searchIndex = [];
        return [];
      });
    return state.searchIndexPromise;
  }

  function snippetAround(content, query) {
    const lower = content.toLowerCase();
    const idx = lower.indexOf(query.toLowerCase());
    if (idx === -1) return content.slice(0, 110);
    const start = Math.max(0, idx - 40);
    const end = Math.min(content.length, idx + query.length + 70);
    return (start > 0 ? "…" : "") + content.slice(start, end) + (end < content.length ? "…" : "");
  }

  function highlightMatch(text, query) {
    if (!query) return escapeHtml(text);
    const lower = text.toLowerCase();
    const q = query.toLowerCase();
    let result = "";
    let i = 0;
    let idx;
    while ((idx = lower.indexOf(q, i)) !== -1) {
      result += escapeHtml(text.slice(i, idx));
      result += `<mark>${escapeHtml(text.slice(idx, idx + q.length))}</mark>`;
      i = idx + q.length;
    }
    result += escapeHtml(text.slice(i));
    return result;
  }

  function runSearch(query) {
    const q = query.trim();
    if (!q) {
      renderSearchResults([], "");
      return;
    }
    const lowerQ = q.toLowerCase();
    const index = state.searchIndex || [];

    const scored = [];
    for (const entry of index) {
      const titleHit = entry.title.toLowerCase().includes(lowerQ);
      const subjectHit = entry.subject.toLowerCase().includes(lowerQ);
      const contentHit = entry.content.toLowerCase().includes(lowerQ);
      if (!titleHit && !subjectHit && !contentHit) continue;

      let score = 0;
      if (titleHit) score += 100;
      if (subjectHit) score += 40;
      if (contentHit) score += 10;

      scored.push({ entry, score, titleHit, subjectHit, contentHit });
    }

    scored.sort((a, b) => b.score - a.score);
    renderSearchResults(scored.slice(0, 40), q);
  }

  let selectedResultIndex = -1;

  function renderSearchResults(results, query) {
    selectedResultIndex = -1;
    if (!query) {
      el.searchResults.innerHTML = '<div class="search-hint">Type to search subjects, note titles, and content…</div>';
      return;
    }
    if (results.length === 0) {
      el.searchResults.innerHTML = `<div class="search-empty">No notes match “${escapeHtml(query)}”.</div>`;
      return;
    }

    el.searchResults.innerHTML = results
      .map((r, i) => {
        const titleHtml = highlightMatch(r.entry.title, r.titleHit ? query : "");
        const snippet = r.contentHit && !r.titleHit ? snippetAround(r.entry.content, query) : "";
        const snippetHtml = snippet ? `<div class="result-snippet">${highlightMatch(snippet, query)}</div>` : "";
        return `
          <button class="search-result" type="button" data-index="${i}" data-subject="${escapeHtml(r.entry.subject)}" data-file="${escapeHtml(r.entry.file)}">
            <span class="result-title">${titleHtml}</span><span class="result-subject">${escapeHtml(r.entry.subject)}</span>
            ${snippetHtml}
          </button>`;
      })
      .join("");

    el.searchResults.querySelectorAll(".search-result").forEach((btn) => {
      btn.addEventListener("click", () => {
        goTo(btn.dataset.subject, btn.dataset.file);
        closeSearch();
      });
    });
  }

  function moveSelection(delta) {
    const items = Array.from(el.searchResults.querySelectorAll(".search-result"));
    if (items.length === 0) return;
    items.forEach((it) => it.classList.remove("selected"));
    selectedResultIndex = (selectedResultIndex + delta + items.length) % items.length;
    const active = items[selectedResultIndex];
    active.classList.add("selected");
    active.scrollIntoView({ block: "nearest" });
  }

  function activateSelection() {
    const items = Array.from(el.searchResults.querySelectorAll(".search-result"));
    if (items.length === 0) return;
    const target = selectedResultIndex >= 0 ? items[selectedResultIndex] : items[0];
    goTo(target.dataset.subject, target.dataset.file);
    closeSearch();
  }

  function openSearch() {
    el.searchModal.hidden = false;
    el.searchInput.value = "";
    el.searchResults.innerHTML = '<div class="search-hint">Type to search subjects, note titles, and content…</div>';
    loadSearchIndex().then(() => el.searchInput.focus());
    requestAnimationFrame(() => el.searchInput.focus());
  }
  function closeSearch() {
    el.searchModal.hidden = true;
  }

  /* ---------------------------------------------------------------------
   * Navigation helper
   * --------------------------------------------------------------------- */
  function goTo(subject, file) {
    const target = `#/${encodePath(subject, file)}`;
    if (location.hash === target) {
      showNote(subject, file);
    } else {
      location.hash = target;
    }
  }

  /* ---------------------------------------------------------------------
   * Boot
   * --------------------------------------------------------------------- */
  function buildTitleIndex() {
    state.titleIndex.clear();
    state.manifest.forEach((subject) => {
      subject.notes.forEach((note) => {
        const bare = note.file.replace(/\.md$/i, "");
        state.titleIndex.set(note.title.toLowerCase(), { subject: subject.subject, file: note.file });
        state.titleIndex.set(bare.toLowerCase(), { subject: subject.subject, file: note.file });
      });
    });
  }

  async function init() {
    initTheme();
    configureMarked();

    try {
      const res = await fetch("notes.json");
      state.manifest = res.ok ? await res.json() : [];
    } catch (e) {
      state.manifest = [];
    }

    buildTitleIndex();
    buildSidebar();
    handleRoute();

    window.addEventListener("hashchange", handleRoute);
    window.addEventListener("scroll", onScrollThrottled, { passive: true });
    onScroll();

    el.themeToggle.addEventListener("click", toggleTheme);
    el.menuToggle.addEventListener("click", toggleDrawer);
    el.sidebarBackdrop.addEventListener("click", closeDrawer);
    el.scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    el.searchTrigger.addEventListener("click", openSearch);
    el.searchBackdrop.addEventListener("click", closeSearch);
    el.searchInput.addEventListener("input", debounce((e) => runSearch(e.target.value), 90));
    el.searchInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") { e.preventDefault(); moveSelection(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); moveSelection(-1); }
      else if (e.key === "Enter") { e.preventDefault(); activateSelection(); }
      else if (e.key === "Escape") { closeSearch(); }
    });

    document.addEventListener("keydown", (e) => {
      const isTypingTarget = ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName);
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        openSearch();
      } else if (e.key === "/" && !isTypingTarget) {
        e.preventDefault();
        openSearch();
      } else if (e.key === "Escape" && !el.searchModal.hidden) {
        closeSearch();
      } else if (e.key === "Escape" && document.body.classList.contains("drawer-open")) {
        closeDrawer();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
