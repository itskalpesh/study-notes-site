/**
 * Todo Component
 * Highlighted task or incomplete item
 */

import React from 'react';
import styles from './Todo.module.css';

interface TodoProps {
  children?: React.ReactNode;
  completed?: boolean;
}

export const Todo: React.FC<TodoProps> = ({ children, completed = false }) => {
  return (
    <div className={`${styles.todo} ${completed ? styles.completed : ''}`}>
      <span className={styles.icon}>{completed ? '✓' : '○'}</span>
      <span className={styles.text}>{children}</span>
    </div>
  );
};
