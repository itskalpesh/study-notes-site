/**
 * Callout Component
 * Renders admonition boxes (info, warning, danger, tip, success, etc.)
 */

import React from 'react';
import styles from './Callout.module.css';

interface CalloutProps {
  type?: 'info' | 'note' | 'tip' | 'hint' | 'warning' | 'caution' | 'danger' | 'error' | 'success' | 'check' | 'question' | 'faq' | 'quote' | 'cite';
  title?: string;
  children?: React.ReactNode;
}

const iconMap = {
  info: '📘',
  note: '📝',
  tip: '💡',
  hint: '🔍',
  warning: '⚠️',
  caution: '⚠️',
  danger: '🚨',
  error: '❌',
  success: '✅',
  check: '✓',
  question: '❓',
  faq: '❓',
  quote: '"',
  cite: '📄',
};

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  title,
  children,
}) => {
  const defaultTitle = type.charAt(0).toUpperCase() + type.slice(1);
  const displayTitle = title || defaultTitle;
  const icon = iconMap[type] || '📌';

  return (
    <div className={`${styles.callout} ${styles[`callout-${type}`]}`}>
      <div className={styles.calloutTitle}>
        <span className={styles.calloutIcon}>{icon}</span>
        <span>{displayTitle}</span>
      </div>
      <div className={styles.calloutContent}>{children}</div>
    </div>
  );
};
