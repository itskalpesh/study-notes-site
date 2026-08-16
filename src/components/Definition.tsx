/**
 * Definition Component
 * Glossary term with explanation
 */

import React from 'react';
import styles from './Definition.module.css';

interface DefinitionProps {
  term: string;
  id?: string;
  children?: React.ReactNode;
}

export const Definition: React.FC<DefinitionProps> = ({ term, id, children }) => {
  return (
    <div className={styles.definition} id={id}>
      <dt className={styles.term}>{term}</dt>
      <dd className={styles.explanation}>{children}</dd>
    </div>
  );
};
