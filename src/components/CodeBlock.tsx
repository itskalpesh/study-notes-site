/**
 * CodeBlock Component
 * Enhanced code rendering with language highlighting and copy button
 */

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  language?: string;
  title?: string;
  highlight?: string;
  children: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  language = 'text',
  title,
  highlight,
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={styles.codeBlockWrap}>
      <div className={styles.codeBlockHeader}>
        {title && <span className={styles.codeBlockTitle}>{title}</span>}
        <span className={styles.codeBlockLang}>{language}</span>
        <button
          className={styles.copyBtn}
          onClick={copyToClipboard}
          title="Copy code"
          aria-label="Copy code"
        >
          {copied ? '✓ Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter language={language} style={tomorrow} customStyle={{ margin: 0 }}>
        {children}
      </SyntaxHighlighter>
    </div>
  );
};
