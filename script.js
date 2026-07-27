/* =========================================================================
   Study Notes — App Logic with Quiz Engine & Knowledge Chatbot
   No frameworks. Pure modern JavaScript. Fully compatible with static sites
   and Obsidian vault structures.
   ========================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   * State
   * --------------------------------------------------------------------- */
  const state = {
    manifest: [],                 // [{ subject, path, notes: [{title, file}] }]
    flatNotesList: [],            // [{ subject, file, title }]
    titleIndex: new Map(),        // lowercased title/filename -> { subject, file }
    noteCache: new Map(),         // "subject/file" -> { html, headings, rawText }
    searchIndex: null,            // lazy-loaded array
    searchIndexPromise: null,
    currentKey: null,             // "subject/file" currently displayed
    expandedSubjects: new Set(),
    activeQuiz: null,             // current quiz state
    chatHistory: [],              // [{ sender: "user"|"bot", text: string, citations: [] }]
  };

  const el = {
    sidebarTree: document.getElementById("sidebarTree"),
    sidebarFilter: document.getElementById("sidebarFilter"),
    sidebarFilterClear: document.getElementById("sidebarFilterClear"),
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
    navHome: document.getElementById("navHome"),
    navQuiz: document.getElementById("navQuiz"),
    navChat: document.getElementById("navChat"),
  };

  /* ---------------------------------------------------------------------
   * Small utilities
   * --------------------------------------------------------------------- */
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function slugify(text) {
    return String(text || "")
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

  function resolveRelativePath(subject, relativeHref) {
    const base = `https://notes.local/${encodeURIComponent(subject)}/`;
    let resolved;
    try {
      resolved = new URL(relativeHref, base);
    } catch (e) {
      return null;
    }
    if (resolved.origin !== "https://notes.local") return null;
    return decodeURIComponent(resolved.pathname.replace(/^\//, ""));
  }

  function debounce(fn, wait) {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  }

  function countWords(str) {
    if (!str) return 0;
    const clean = str.replace(/<[^>]*>/g, " ").replace(/[^\w\s]/g, " ");
    const matches = clean.trim().match(/\s+/g);
    return matches ? matches.length + 1 : (clean.trim().length ? 1 : 0);
  }

  function estimateReadingTime(wordCount) {
    const wpm = 200;
    return Math.max(1, Math.ceil(wordCount / wpm));
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
   * Markdown rendering & Obsidian callouts
   * --------------------------------------------------------------------- */
  let currentRenderSubject = "";
  let headingSlugCounts = null;
  let collectedHeadings = null;

  function getCalloutIconSvg(type) {
    switch (type) {
      case "info":
      case "note":
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
      case "tip":
      case "hint":
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A6 6 0 1 1 18 10c0 1.96-.94 3.7-2.4 4.8-.8.6-1.1 1.2-1.1 2.2v1a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-1c0-1-.3-1.6-1.1-2.2z"/><path d="M9 21h6"/></svg>';
      case "warning":
      case "caution":
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
      case "danger":
      case "error":
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
      case "success":
      case "check":
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>';
      case "question":
      case "faq":
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
      case "quote":
      case "cite":
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 7-4 8z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h3c0 4-2 7-4 8z"/></svg>';
      default:
        return '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }
  }

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
        if (lang === "mermaid") {
          return `<div class="mermaid">${escapeHtml(token.text)}</div>`;
        }

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

        if (href.startsWith("wikilink:")) {
          const target = decodeURIComponent(href.slice("wikilink:".length));
          const match = state.titleIndex.get(target.toLowerCase());
          if (match) {
            return `<a href="#/${encodePath(match.subject, match.file)}" data-internal>${text}</a>`;
          }
          return `<span class="broken-link" title="Note not found: ${escapeHtml(target)}">${text}</span>`;
        }

        if (/^[a-z]+:\/\//i.test(href) || href.startsWith("mailto:")) {
          return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        }

        if (href.startsWith("#")) {
          return `<a href="${escapeHtml(href)}">${text}</a>`;
        }

        if (/\.md($|[?#])/i.test(href)) {
          const resolved = resolveRelativePath(currentRenderSubject, href);
          if (resolved) {
            const segments = resolved.split("/");
            const file = segments.pop();
            const subject = segments.join("/");
            return `<a href="#/${encodePath(subject, file)}" data-internal>${text}</a>`;
          }
        }

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

  function preprocessObsidianSyntax(markdown) {
    const segments = markdown.split(/(```[\s\S]*?```|~~~[\s\S]*?~~~)/);
    for (let i = 0; i < segments.length; i++) {
      if (i % 2 === 1) continue;

      // Transform Obsidian Callouts: > [!info] Title
      segments[i] = segments[i].replace(/^>\s*\[!([\w-]+)\]-?\s*(.*)$/gm, (_, type, title) => {
        const calloutType = type.toLowerCase();
        const calloutTitle = title.trim() || (calloutType.charAt(0).toUpperCase() + calloutType.slice(1));
        const iconSvg = getCalloutIconSvg(calloutType);
        return `\n<div class="callout callout-${calloutType}"><div class="callout-title"><span class="callout-icon">${iconSvg}</span>${escapeHtml(calloutTitle)}</div><div class="callout-content">\n`;
      });

      segments[i] = segments[i]
        // Obsidian image embeds
        .replace(/!\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, target, alias) => {
          const alt = alias || "";
          return `![${alt}](${target.trim()})`;
        })
        // Obsidian wiki-links
        .replace(/(^|[^!])\[\[([^\]|]+)\|?([^\]]*)\]\]/g, (_, pre, target, alias) => {
          const label = (alias || target).trim();
          return `${pre}[${label}](wikilink:${encodeURIComponent(target.trim())})`;
        });
    }
    return segments.join("");
  }

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
      ADD_ATTR: ["target", "loading", "checked", "disabled"],
      ADD_TAGS: ["svg", "path", "circle", "line", "polyline", "rect", "use"],
    });

    return { html: safeHtml, headings: collectedHeadings, rawText: markdown };
  }

  /* ---------------------------------------------------------------------
   * Sidebar & Live Quick Filter
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
      el.sidebarTree.innerHTML = '<div class="sidebar-loading">No subject folders found yet.</div>';
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

  function filterSidebarTree(query) {
    const q = (query || "").trim().toLowerCase();
    el.sidebarFilterClear.hidden = !q;

    const blocks = el.sidebarTree.querySelectorAll(".subject-block");
    blocks.forEach((block) => {
      const subjectToggle = block.querySelector(".subject-toggle");
      const subjectName = subjectToggle.querySelector(".subject-name").textContent.toLowerCase();
      const links = block.querySelectorAll(".note-link");
      const list = block.querySelector(".note-list");

      let hasMatch = subjectName.includes(q);
      links.forEach((link) => {
        const title = link.textContent.toLowerCase();
        const matches = !q || title.includes(q) || subjectName.includes(q);
        link.parentElement.style.display = matches ? "" : "none";
        if (matches && q) hasMatch = true;
      });

      if (!q) {
        block.style.display = "";
        const isExpanded = state.expandedSubjects.has(subjectToggle.querySelector(".subject-name").textContent);
        list.classList.toggle("expanded", isExpanded);
        subjectToggle.setAttribute("aria-expanded", String(isExpanded));
      } else if (hasMatch) {
        block.style.display = "";
        list.classList.add("expanded");
        subjectToggle.setAttribute("aria-expanded", "true");
      } else {
        block.style.display = "none";
      }
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
   * Table of Contents
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
   * Note Navigation & Metadata
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
    const { html, headings, rawText } = renderMarkdown(markdown, subject);

    const result = { html, headings, rawText };
    state.noteCache.set(key, result);
    return result;
  }

  function getPrevNextNotes(subject, file) {
    const idx = state.flatNotesList.findIndex((n) => n.subject === subject && n.file === file);
    if (idx === -1) return { prev: null, next: null };
    return {
      prev: idx > 0 ? state.flatNotesList[idx - 1] : null,
      next: idx < state.flatNotesList.length - 1 ? state.flatNotesList[idx + 1] : null,
    };
  }

  async function showNote(subject, file) {
    const meta = findNoteMeta(subject, file);
    el.contentInner.innerHTML = '<div class="sidebar-loading">Loading note…</div>';

    try {
      const { html, headings, rawText } = await loadNote(subject, file);
      const title = meta ? meta.title : file.replace(/\.md$/i, "");
      const words = countWords(rawText);
      const timeEst = estimateReadingTime(words);
      const { prev, next } = getPrevNextNotes(subject, file);

      const prevHtml = prev
        ? `<a class="pagination-btn prev" href="#/${encodePath(prev.subject, prev.file)}"><span class="pagination-label">← Previous Note</span><span class="pagination-title">${escapeHtml(prev.title)}</span></a>`
        : `<div></div>`;

      const nextHtml = next
        ? `<a class="pagination-btn next" href="#/${encodePath(next.subject, next.file)}"><span class="pagination-label">Next Note →</span><span class="pagination-title">${escapeHtml(next.title)}</span></a>`
        : `<div></div>`;

      el.contentInner.innerHTML = `
        <article class="note-fade-in">
          <div class="note-meta-bar">
            <span class="note-breadcrumb-chip">${escapeHtml(subject)}</span>
            <span class="note-meta-item">⏱️ ${timeEst} min read</span>
            <span class="note-meta-item">📝 ${words.toLocaleString()} words</span>
          </div>
          <h1 class="note-title">${escapeHtml(title)}</h1>
          <div class="markdown-body">${html}</div>
          <div class="note-pagination">
            ${prevHtml}
            ${nextHtml}
          </div>
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

      // Trigger KaTeX rendering
      if (typeof renderMathInElement === "function") {
        try {
          renderMathInElement(el.contentInner, {
            delimiters: [
              { left: "$$", right: "$$", display: true },
              { left: "$", right: "$", display: false },
              { left: "\\(", right: "\\)", display: false },
              { left: "\\[", right: "\\]", display: true },
            ],
            throwOnError: false,
          });
        } catch (e) {}
      }

      // Trigger Mermaid Rendering
      if (typeof mermaid !== "undefined") {
        try {
          const mermaidDivs = el.contentInner.querySelectorAll(".mermaid");
          mermaidDivs.forEach((node, i) => {
            const wrap = document.createElement("div");
            wrap.className = "mermaid-wrap";
            const code = node.textContent;
            const id = `mermaid-id-${Date.now()}-${i}`;
            mermaid.render(id, code).then(({ svg }) => {
              wrap.innerHTML = svg;
              node.replaceWith(wrap);
            }).catch(() => {});
          });
        } catch (e) {}
      }

      updateActiveNavLinks();
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
    updateActiveNavLinks();

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
        <p class="landing-eyebrow">Obsidian Vault Knowledge Base</p>
        <h1>Study Notes Hub</h1>
        <p class="lede">Explore course materials, test your knowledge with auto-generated quizzes, or ask questions to the AI assistant grounded in your notes.</p>
        <div class="landing-stats">
          <div class="landing-stat"><div class="num">${state.manifest.length}</div><div class="label">Subjects</div></div>
          <div class="landing-stat"><div class="num">${totalNotes}</div><div class="label">Notes</div></div>
        </div>
        <div class="landing-grid">${cards}</div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
   * Subject-Wise Quiz System (`#/quiz`) — Content-Driven Question Engine
   * --------------------------------------------------------------------- */
  async function generateQuizForSubject(subjectName) {
    const subject = state.manifest.find((s) => s.subject === subjectName);
    if (!subject || !subject.notes.length) return null;

    // Filter out syllabus files, question papers, and MCQ dumps
    const validNotes = subject.notes.filter((n) => {
      const lower = n.file.toLowerCase();
      return !lower.includes("syllabus") && !lower.includes("questions paper") && !lower.includes("mcq");
    });

    const notesToUse = validNotes.length ? validNotes : subject.notes;
    const questions = [];

    for (const note of notesToUse) {
      try {
        const { rawText } = await loadNote(subjectName, note.file);
        if (!rawText) continue;

        const lines = rawText.split("\n");
        let currentHeading = note.title;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i].trim();
          if (line.startsWith("#")) {
            currentHeading = line.replace(/^#+\s*/, "").replace(/[-_]/g, " ").trim();
            continue;
          }

          // 1. Definition Extraction: "Term is/refers to/defines..."
          const defMatch = line.match(/^([A-Z][A-Za-z0-9\s()/\-]{2,45})\s+(is|refers to|defines|provides|enables)\s+(.+)$/i);
          if (defMatch && defMatch[3].length > 15 && defMatch[3].length < 220) {
            const concept = defMatch[1].trim();
            const verb = defMatch[2].toLowerCase();
            const defDetail = defMatch[3].trim().replace(/\.$/, "");

            const correctOpt = `${concept} ${verb} ${defDetail}.`;
            const distractors = [
              `${concept} is a legacy deprecated configuration setting in older systems.`,
              `${concept} refers to manual thread register synchronization in kernel space.`,
              `${concept} is an unmanaged hardware buffer allocation strategy.`
            ];

            questions.push({
              question: `In ${escapeHtml(subjectName)}, what is the definition or purpose of **${escapeHtml(concept)}**?`,
              options: [correctOpt, ...distractors],
              correctAnswer: correctOpt,
              explanation: `From note "${escapeHtml(note.title)}": "${escapeHtml(concept)} ${escapeHtml(verb)} ${escapeHtml(defDetail)}."`,
              sourceFile: note.file
            });
          }

          // 2. Key Features & Bullet Points
          const featureMatch = line.match(/^(?:[-*]|\d+\.)\s+\*\*([^*]+)\*\*(?::|\s+-|\s+is|\s+-\s+)?\s*(.*)$/);
          if (featureMatch) {
            const featName = featureMatch[1].trim();
            const featDesc = featureMatch[2].trim();

            if (featName.length > 2 && featName.length < 55) {
              const correctOpt = featDesc ? `${featName}: ${featDesc.slice(0, 90)}` : featName;
              const distractors = [
                "Unrestricted Global Memory Swapping",
                "Automated Routing Protocol Partitioning",
                "Static Hardware Register Balancing"
              ];

              questions.push({
                question: `Which of the following is a key feature or component discussed under **${escapeHtml(currentHeading)}**?`,
                options: [correctOpt, ...distractors],
                correctAnswer: correctOpt,
                explanation: `Documented in note "${escapeHtml(note.title)}" under section "${escapeHtml(currentHeading)}".`,
                sourceFile: note.file
              });
            }
          }
        }
      } catch (e) {}
    }

    // Fallback if specific definitions were not matched in note text
    if (questions.length < 3) {
      notesToUse.forEach((n) => {
        questions.push({
          question: `Which core study module covers the key principles of **${escapeHtml(n.title)}**?`,
          options: [
            escapeHtml(n.title),
            "Unrelated Subject Module A",
            "Deprecated Framework Module B",
            "External System Protocol C"
          ],
          correctAnswer: escapeHtml(n.title),
          explanation: `Covered in ${escapeHtml(subjectName)} → note: "${escapeHtml(n.title)}".`,
          sourceFile: n.file
        });
      });
    }

    // Shuffle options and set answerIndex
    questions.forEach((q) => {
      const correctText = q.correctAnswer;
      for (let i = q.options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [q.options[i], q.options[j]] = [q.options[j], q.options[i]];
      }
      q.answerIndex = q.options.indexOf(correctText);
    });

    return {
      subject: subjectName,
      questions: questions.slice(0, 15),
    };
  }

  async function generateMasterQuiz() {
    let allQuestions = [];
    for (const s of state.manifest) {
      const qObj = await generateQuizForSubject(s.subject);
      if (qObj && qObj.questions) {
        allQuestions.push(...qObj.questions);
      }
    }

    // Shuffle master questions
    for (let i = allQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
    }

    return {
      subject: "Full Vault Master Exam",
      questions: allQuestions.slice(0, 20),
    };
  }

  async function showQuiz(subjectName) {
    document.title = "Interactive Quizzes · Study Notes";
    state.currentKey = null;
    highlightActiveNote("", "");
    buildToc([]);
    updateActiveNavLinks();

    if (!subjectName) {
      // Show Subject Selection Hub + Master Quiz Banner
      const cards = state.manifest
        .map(
          (s) => `
          <div class="quiz-subject-card" onclick="location.hash='#/quiz/${encodeURIComponent(s.subject)}'">
            <div class="quiz-card-title">${escapeHtml(s.subject)}</div>
            <div class="quiz-card-meta">🎯 ${s.notes.length} note modules • Take Quiz →</div>
          </div>`
        )
        .join("");

      el.contentInner.innerHTML = `
        <div class="quiz-container note-fade-in">
          <div class="quiz-hero">
            <h1>Subject Quizzes & Master Exam</h1>
            <p>Select a subject quiz below or challenge yourself with the Full Vault Master Exam.</p>
          </div>
          
          <div class="master-quiz-banner">
            <div class="master-quiz-info">
              <h2>🏆 Full-Vault Master Exam</h2>
              <p>Test your knowledge across all 15 subjects in a 20-question comprehensive exam.</p>
            </div>
            <button class="master-quiz-start-btn" onclick="location.hash='#/quiz/master'">Start Master Exam →</button>
          </div>

          <h2 style="font-family:var(--font-display); font-size:1.4rem; margin-bottom:16px;">Subject Quizzes</h2>
          <div class="subject-quiz-grid">${cards}</div>
        </div>
      `;
      return;
    }

    el.contentInner.innerHTML = '<div class="sidebar-loading">Generating quiz questions from note content…</div>';

    const quiz = subjectName === "master" ? await generateMasterQuiz() : await generateQuizForSubject(subjectName);
    if (!quiz || !quiz.questions.length) {
      showQuiz("");
      return;
    }

    state.activeQuiz = {
      subject: quiz.subject,
      questions: quiz.questions,
      currentIndex: 0,
      score: 0,
      userAnswers: [],
    };

    renderActiveQuizQuestion();
  }

  function renderActiveQuizQuestion() {
    const qState = state.activeQuiz;
    const q = qState.questions[qState.currentIndex];

    const optsHtml = q.options
      .map(
        (opt, i) => `
        <button class="quiz-opt-btn" data-opt="${i}">
          <span>${String.fromCharCode(65 + i)}.</span> ${escapeHtml(opt)}
        </button>`
      )
      .join("");

    el.contentInner.innerHTML = `
      <div class="quiz-container note-fade-in">
        <div class="quiz-active-wrap">
          <div class="quiz-header-bar">
            <a href="#/quiz" style="text-decoration:none; color:var(--accent); font-weight:600;">← Back to Quizzes</a>
            <span class="quiz-progress-text">Question ${qState.currentIndex + 1} of ${qState.questions.length}</span>
          </div>
          <div class="quiz-question-box">
            <h2>${escapeHtml(q.question)}</h2>
            <div class="quiz-options">${optsHtml}</div>
            <div id="quizExpBox" class="quiz-explanation-box" hidden></div>
            <button id="quizNextBtn" class="quiz-next-btn" hidden>Next Question →</button>
          </div>
        </div>
      </div>
    `;

    const optBtns = el.contentInner.querySelectorAll(".quiz-opt-btn");
    const expBox = document.getElementById("quizExpBox");
    const nextBtn = document.getElementById("quizNextBtn");

    optBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectedOpt = parseInt(btn.dataset.opt, 10);
        optBtns.forEach((b) => (b.disabled = true));

        const isCorrect = selectedOpt === q.answerIndex;
        if (isCorrect) {
          qState.score++;
          btn.classList.add("correct");
        } else {
          btn.classList.add("incorrect");
          optBtns[q.answerIndex].classList.add("correct");
        }

        expBox.hidden = false;
        expBox.innerHTML = `<strong>${isCorrect ? "✅ Correct!" : "❌ Incorrect."}</strong> ${escapeHtml(q.explanation)}`;
        nextBtn.hidden = false;
      });
    });

    nextBtn.addEventListener("click", () => {
      qState.currentIndex++;
      if (qState.currentIndex < qState.questions.length) {
        renderActiveQuizQuestion();
      } else {
        renderQuizSummary();
      }
    });
  }

  function renderQuizSummary() {
    const qState = state.activeQuiz;
    const pct = Math.round((qState.score / qState.questions.length) * 100);

    el.contentInner.innerHTML = `
      <div class="quiz-container note-fade-in">
        <div class="quiz-active-wrap quiz-score-card">
          <h1>Quiz Completed!</h1>
          <p>Subject: <strong>${escapeHtml(qState.subject)}</strong></p>
          <div class="quiz-score-circle">${pct}%</div>
          <p>You scored ${qState.score} out of ${qState.questions.length} questions correctly.</p>
          <div style="margin-top:24px; display:flex; justify-content:center; gap:12px;">
            <button class="quiz-next-btn" style="float:none;" onclick="location.hash='#/quiz/${encodeURIComponent(qState.subject)}'">Retake Quiz</button>
            <a href="#/quiz" class="pagination-btn" style="padding:10px 20px;">All Quizzes</a>
          </div>
        </div>
      </div>
    `;
  }

  /* ---------------------------------------------------------------------
   * Vault AI Knowledge Chatbot (`#/chat`) — Grounded Definition Engine
   * --------------------------------------------------------------------- */
  function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function expandQueryTerms(q) {
    const norm = q.toLowerCase();
    const stopWords = new Set(["define", "what", "is", "are", "explain", "the", "a", "an", "for", "in", "of", "to", "and", "how", "does"]);
    const words = norm.split(/[^\w#+]+/).filter((s) => s && !stopWords.has(s));

    const expanded = [q];

    words.forEach((w) => {
      if (w === "r") expanded.push("r programming", "data analysis with r", "r programing");
      if (w === "wcms" || w === "wcm") expanded.push("web content management", "wcm", "wcms");
      if (w === "clr") expanded.push("common language runtime", "clr");
      if (w === "cts") expanded.push("common type system", "cts");
      if (w === "cls") expanded.push("common language specification", "cls");
      if (w === "oop" || w === "oops") expanded.push("object oriented", "inheritance", "polymorphism");
      if (w === "aiml" || w === "ai" || w === "ml") expanded.push("artificial intelligence", "machine learning", "aiml");
      if (w === "laravel") expanded.push("laravel framework", "composer");
      if (w === "waterfall") expanded.push("waterfall model", "software engineering");
    });

    return { rawQuery: q, normQuery: norm, keyWords: words, expandedTerms: Array.from(new Set(expanded)) };
  }

  function synthesizeAIAnswer(query, index) {
    const { keyWords, expandedTerms } = expandQueryTerms(query);

    const scored = [];
    index.forEach((entry) => {
      const fileLower = entry.file.toLowerCase();
      const subjectLower = entry.subject.toLowerCase();
      const titleLower = entry.title.toLowerCase();
      const contentLower = entry.content.toLowerCase();

      const isExamOrSyllabus = fileLower.includes("questions paper") || fileLower.includes("syllabus") || fileLower.includes("mcq");

      let score = 0;

      keyWords.forEach((kw) => {
        if (!kw) return;
        // Word boundary matching for terms (e.g. \bR\b or \bwcms\b)
        const regex = new RegExp(`(?:^|\\b|\\s|[-_])${escapeRegExp(kw)}(?:$|\\b|\\s|[-_])`, "i");

        if (regex.test(subjectLower)) score += 350;
        if (regex.test(titleLower)) score += 250;

        const matches = contentLower.match(new RegExp(`(?:^|\\b|\\s)${escapeRegExp(kw)}(?:$|\\b|\\s)`, "gi"));
        if (matches) {
          score += Math.min(120, matches.length * 20);
        }
      });

      expandedTerms.forEach((term) => {
        if (term.length < 2) return;
        const tLower = term.toLowerCase();
        if (titleLower.includes(tLower)) score += 90;
        if (subjectLower.includes(tLower)) score += 70;
        if (contentLower.includes(tLower)) score += 25;
      });

      // Heavily downweight question paper & syllabus index files so actual unit content is selected
      if (isExamOrSyllabus) {
        score = Math.floor(score * 0.05);
      }

      if (score > 0) scored.push({ entry, score });
    });

    scored.sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
      return {
        html: `I couldn't find detailed notes matching "<strong>${escapeHtml(query)}</strong>". Try asking about topics in <em>Data Analysis With R, Web Content Management, Cyber Security, AI/ML, PHP, or C#</em>!`,
        citations: [],
      };
    }

    const topMatches = scored.slice(0, 3);
    const primary = topMatches[0].entry;

    // Search primary entry content for definition or key paragraph
    let extractedDef = "";
    const paragraphs = primary.content.split(/(?:\r?\n){2,}|\n(?=###|####|--)/);

    for (const p of paragraphs) {
      const cleanP = p.trim().replace(/^#+\s*/, "");
      if (cleanP.length < 20) continue;

      for (const kw of keyWords) {
        const regexDef = new RegExp(`(?:^|\\b)${escapeRegExp(kw)}(?:\\b|\\s).*\\b(is|refers to|defines|was developed|provides|enables)\\b`, "i");
        if (regexDef.test(cleanP)) {
          extractedDef = cleanP;
          break;
        }
      }
      if (extractedDef) break;
    }

    if (!extractedDef) {
      for (const p of paragraphs) {
        const cleanP = p.trim().replace(/^#+\s*/, "");
        if (cleanP.length > 25) {
          for (const kw of keyWords) {
            if (new RegExp(`(?:^|\\b)${escapeRegExp(kw)}(?:\\b|\\s)`, "i").test(cleanP)) {
              extractedDef = cleanP;
              break;
            }
          }
        }
        if (extractedDef) break;
      }
    }

    if (!extractedDef) {
      extractedDef = primary.content.slice(0, 350) + "…";
    }

    let answerHtml = `<div class="chat-answer-card">`;
    answerHtml += `<p style="margin-top:0; font-weight:600; color:var(--accent);">📘 ${escapeHtml(primary.subject)} → ${escapeHtml(primary.title)}</p>`;
    answerHtml += `<p><strong>Answer & Concept Explanation:</strong></p>`;
    answerHtml += `<div style="line-height:1.65; background:var(--accent-soft); padding:14px 16px; border-radius:10px; border-left:4px solid var(--accent); margin-bottom:12px;">${escapeHtml(extractedDef)}</div>`;
    answerHtml += `</div>`;

    const citations = topMatches.map((m) => ({
      subject: m.entry.subject,
      file: m.entry.file,
      title: m.entry.title,
    }));

    return { html: answerHtml, citations };
  }

  function showChat() {
    document.title = "Ask AI Assistant · Study Notes";
    state.currentKey = null;
    highlightActiveNote("", "");
    buildToc([]);
    updateActiveNavLinks();

    el.contentInner.innerHTML = `
      <div class="chat-container note-fade-in">
        <div class="chat-header">
          <h1>Study Notes AI Assistant</h1>
          <p>Ask any question about your course materials, subjects, or concepts.</p>
        </div>
        <div id="chatMessages" class="chat-messages">
          <div class="chat-msg chat-msg-bot">
            👋 Hi! I am your vault knowledge assistant. Ask me anything like <em>"Define R"</em>, <em>"Define WCMS"</em>, or <em>"What is CLR?"</em>.
          </div>
        </div>
        <div class="chat-suggestions">
          <button class="suggestion-chip">Define R Programming</button>
          <button class="suggestion-chip">Define WCMS</button>
          <button class="suggestion-chip">Explain CLR and .NET Architecture</button>
          <button class="suggestion-chip">What is Supervised Learning?</button>
          <button class="suggestion-chip">What is Waterfall Model?</button>
        </div>
        <div class="chat-input-row">
          <input id="chatInput" type="text" class="chat-input" placeholder="Ask a question (e.g., Define R, Define WCMS)…" autocomplete="off" />
          <button id="chatSendBtn" class="chat-send-btn">Send</button>
        </div>
      </div>
    `;

    const chatInput = document.getElementById("chatInput");
    const chatSendBtn = document.getElementById("chatSendBtn");
    const chatMessages = document.getElementById("chatMessages");

    function sendQuery(userText) {
      const q = userText.trim();
      if (!q) return;

      // Add user message
      const userDiv = document.createElement("div");
      userDiv.className = "chat-msg chat-msg-user";
      userDiv.textContent = q;
      chatMessages.appendChild(userDiv);
      chatInput.value = "";

      // Add bot typing placeholder
      const botDiv = document.createElement("div");
      botDiv.className = "chat-msg chat-msg-bot";
      botDiv.innerHTML = "Thinking… searching study notes…";
      chatMessages.appendChild(botDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;

      loadSearchIndex().then((index) => {
        const { html, citations } = synthesizeAIAnswer(q, index);

        let resultHtml = html;
        if (citations && citations.length > 0) {
          const citationsHtml = citations
            .map(
              (c) =>
                `<a class="citation-tag" href="#/${encodePath(c.subject, c.file)}">📄 ${escapeHtml(c.subject)} / ${escapeHtml(c.title)}</a>`
            )
            .join(" ");
          resultHtml += `<div class="chat-citations">Source Notes: ${citationsHtml}</div>`;
        }

        botDiv.innerHTML = resultHtml;
        chatMessages.scrollTop = chatMessages.scrollHeight;
      });
    }

    chatSendBtn.addEventListener("click", () => sendQuery(chatInput.value));
    chatInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") sendQuery(chatInput.value);
    });

    el.contentInner.querySelectorAll(".suggestion-chip").forEach((chip) => {
      chip.addEventListener("click", () => sendQuery(chip.textContent));
    });
  }

  /* ---------------------------------------------------------------------
   * Spaced Repetition Flashcards (`#/flashcards`)
   * --------------------------------------------------------------------- */
  async function generateFlashcards() {
    const cards = [];
    const index = state.searchIndex || (await loadSearchIndex());

    index.forEach((entry) => {
      if (entry.file.toLowerCase().includes("syllabus") || entry.file.toLowerCase().includes("questions paper")) return;

      const paragraphs = entry.content.split(/(?:\r?\n){2,}/);
      paragraphs.forEach((p) => {
        const clean = p.trim().replace(/^#+\s*/, "");
        const defMatch = clean.match(/^([A-Z][A-Za-z0-9\s()/\-]{2,40})\s+(is|refers to|defines|provides)\s+(.+)$/i);
        if (defMatch && defMatch[3].length > 15 && defMatch[3].length < 200) {
          cards.push({
            subject: entry.subject,
            title: entry.title,
            concept: defMatch[1].trim(),
            definition: `${defMatch[1].trim()} ${defMatch[2].toLowerCase()} ${defMatch[3].trim()}`,
          });
        }
      });
    });

    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }

    return cards.slice(0, 20);
  }

  async function showFlashcards() {
    document.title = "Spaced Repetition Flashcards · Study Notes";
    state.currentKey = null;
    highlightActiveNote("", "");
    buildToc([]);
    updateActiveNavLinks();

    el.contentInner.innerHTML = '<div class="sidebar-loading">Building study flashcard deck from notes…</div>';

    const deck = await generateFlashcards();
    if (!deck.length) {
      el.contentInner.innerHTML = '<div class="error-state"><h2>No flashcards available</h2></div>';
      return;
    }

    let currentIndex = 0;

    function renderCard() {
      const card = deck[currentIndex];
      el.contentInner.innerHTML = `
        <div class="flashcard-deck-container note-fade-in">
          <div class="flashcard-deck-header">
            <h1>Study Flashcards</h1>
            <p>Click card to flip • Card ${currentIndex + 1} of ${deck.length}</p>
          </div>
          <div class="flashcard-scene" id="flashcardScene">
            <div class="flashcard" id="flashcardElement">
              <div class="flashcard-face flashcard-front">
                <div class="flashcard-badge">${escapeHtml(card.subject)} • ${escapeHtml(card.title)}</div>
                <div class="flashcard-prompt">What is ${escapeHtml(card.concept)}?</div>
                <div class="flashcard-hint">💡 Tap card to reveal definition</div>
              </div>
              <div class="flashcard-face flashcard-back">
                <div class="flashcard-badge">Definition</div>
                <div class="flashcard-answer">${escapeHtml(card.definition)}</div>
              </div>
            </div>
          </div>
          <div class="flashcard-controls">
            <button class="flashcard-btn" id="fcPrevBtn" ${currentIndex === 0 ? "disabled" : ""}>← Previous</button>
            <button class="flashcard-btn" id="fcFlipBtn">🔄 Flip Card</button>
            <button class="flashcard-btn" id="fcNextBtn" ${currentIndex === deck.length - 1 ? "disabled" : ""}>Next →</button>
          </div>
        </div>
      `;

      const fcScene = document.getElementById("flashcardScene");
      const fcElem = document.getElementById("flashcardElement");
      const fcFlipBtn = document.getElementById("fcFlipBtn");
      const fcPrevBtn = document.getElementById("fcPrevBtn");
      const fcNextBtn = document.getElementById("fcNextBtn");

      function toggleFlip() {
        fcElem.classList.toggle("flipped");
      }

      fcScene.addEventListener("click", toggleFlip);
      fcFlipBtn.addEventListener("click", toggleFlip);

      if (fcPrevBtn) {
        fcPrevBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (currentIndex > 0) {
            currentIndex--;
            renderCard();
          }
        });
      }
      if (fcNextBtn) {
        fcNextBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (currentIndex < deck.length - 1) {
            currentIndex++;
            renderCard();
          }
        });
      }
    }

    renderCard();
  }

  function updateActiveNavLinks() {
    const hash = location.hash || "#/";
    const navFlashcards = document.getElementById("navFlashcards");
    if (el.navHome) el.navHome.classList.toggle("active", hash === "#/" || (hash.startsWith("#/") && !hash.startsWith("#/quiz") && !hash.startsWith("#/chat") && !hash.startsWith("#/flashcards")));
    if (el.navQuiz) el.navQuiz.classList.toggle("active", hash.startsWith("#/quiz"));
    if (navFlashcards) navFlashcards.classList.toggle("active", hash.startsWith("#/flashcards"));
    if (el.navChat) el.navChat.classList.toggle("active", hash.startsWith("#/chat"));
  }

  /* ---------------------------------------------------------------------
   * Routing
   * --------------------------------------------------------------------- */
  function parseHash() {
    const hash = decodeURIComponent(location.hash || "");
    if (hash === "#/quiz" || hash.startsWith("#/quiz")) {
      const matchQuiz = hash.match(/^#\/quiz\/(.+)$/);
      return { type: "quiz", subject: matchQuiz ? matchQuiz[1] : "" };
    }
    if (hash === "#/flashcards") {
      return { type: "flashcards" };
    }
    if (hash === "#/chat") {
      return { type: "chat" };
    }
    const match = hash.match(/^#\/(.+)\/([^/]+\.md)$/i);
    if (!match) return null;
    return { type: "note", subject: match[1], file: match[2] };
  }

  function handleRoute() {
    const route = parseHash();
    if (!route) {
      showLanding();
      return;
    }
    if (route.type === "quiz") {
      showQuiz(route.subject);
      return;
    }
    if (route.type === "flashcards") {
      showFlashcards();
      return;
    }
    if (route.type === "chat") {
      showChat();
      return;
    }
    showNote(route.subject, route.file);
  }

  /* ---------------------------------------------------------------------
   * Mobile drawer & Scroll progress
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
  function buildIndices() {
    state.titleIndex.clear();
    state.flatNotesList = [];

    state.manifest.forEach((subject) => {
      subject.notes.forEach((note) => {
        const bare = note.file.replace(/\.md$/i, "");
        state.titleIndex.set(note.title.toLowerCase(), { subject: subject.subject, file: note.file });
        state.titleIndex.set(bare.toLowerCase(), { subject: subject.subject, file: note.file });
        state.flatNotesList.push({ subject: subject.subject, file: note.file, title: note.title });
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

    buildIndices();
    buildSidebar();
    handleRoute();

    window.addEventListener("hashchange", handleRoute);
    window.addEventListener("scroll", onScrollThrottled, { passive: true });
    onScroll();

    el.themeToggle.addEventListener("click", toggleTheme);
    el.menuToggle.addEventListener("click", toggleDrawer);
    el.sidebarBackdrop.addEventListener("click", closeDrawer);
    el.scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

    if (el.sidebarFilter) {
      el.sidebarFilter.addEventListener("input", (e) => filterSidebarTree(e.target.value));
      el.sidebarFilterClear.addEventListener("click", () => {
        el.sidebarFilter.value = "";
        filterSidebarTree("");
      });
    }

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
