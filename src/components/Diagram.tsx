/**
 * Diagram Component
 * Renders Mermaid diagrams and ASCII art
 */

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import styles from './Diagram.module.css';

interface DiagramProps {
  type?: 'mermaid' | 'ascii';
  title?: string;
  children: string;
}

export const Diagram: React.FC<DiagramProps> = ({ type = 'mermaid', title, children }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === 'mermaid' && ref.current) {
      try {
        mermaid.contentLoaded();
      } catch (e) {
        console.error('Mermaid rendering error:', e);
      }
    }
  }, [type, children]);

  if (type === 'ascii') {
    return (
      <figure className={styles.diagram}>
        {title && <figcaption>{title}</figcaption>}
        <pre className={styles.ascii}>{children}</pre>
      </figure>
    );
  }

  return (
    <figure className={styles.diagram} ref={ref}>
      {title && <figcaption>{title}</figcaption>}
      <div className="mermaid">{children}</div>
    </figure>
  );
};
