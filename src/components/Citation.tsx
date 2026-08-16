/**
 * Citation Component
 * Formatted citation with metadata
 */

import React from 'react';
import styles from './Citation.module.css';

interface CitationProps {
  url?: string;
  author?: string;
  date?: string;
  children?: React.ReactNode;
}

export const Citation: React.FC<CitationProps> = ({ url, author, date, children }) => {
  return (
    <blockquote className={styles.citation}>
      <p className={styles.text}>{children}</p>
      <footer className={styles.footer}>
        {author && <span className={styles.author}>— {author}</span>}
        {date && <span className={styles.date}>{date}</span>}
        {url && (
          <a href={url} target="_blank" rel="noopener noreferrer" className={styles.link}>
            Source
          </a>
        )}
      </footer>
    </blockquote>
  );
};
