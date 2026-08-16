/**
 * Search utilities for notes and content
 */

export interface SearchResult {
  subject: string;
  title: string;
  file: string;
  key: string;
  snippet?: string;
}

let searchIndex: any[] | null = null;

export async function loadSearchIndex() {
  if (searchIndex) return searchIndex;
  const res = await fetch('/search-index.json');
  searchIndex = await res.json();
  return searchIndex;
}

export function search(query: string, index: any[]): SearchResult[] {
  const q = query.toLowerCase();
  const scored = [];

  for (const entry of index) {
    const titleMatch = entry.title.toLowerCase().includes(q);
    const subjectMatch = entry.subject.toLowerCase().includes(q);
    const contentMatch = entry.content.toLowerCase().includes(q);

    if (!titleMatch && !subjectMatch && !contentMatch) continue;

    let score = 0;
    if (titleMatch) score += 100;
    if (subjectMatch) score += 40;
    if (contentMatch) score += 10;

    const snippet = extractSnippet(entry.content, q);

    scored.push({ ...entry, score, snippet });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 40);
}

function extractSnippet(content: string, query: string, contextLength = 100): string {
  const idx = content.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return content.slice(0, contextLength);
  const start = Math.max(0, idx - contextLength / 2);
  const end = Math.min(content.length, idx + query.length + contextLength / 2);
  return (start > 0 ? '…' : '') + content.slice(start, end) + (end < content.length ? '…' : '');
}

export function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}
