/**
 * FlashcardDeck Component
 * Interactive spaced repetition flashcards
 */

import React, { useState } from 'react';
import styles from './FlashcardDeck.module.css';

interface FlashcardProps {
  front: string;
  back: string;
}

interface FlashcardDeckProps {
  children?: React.ReactNode;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Extract card children
  const cards: FlashcardProps[] = [];
  React.Children.forEach(children, (child: any) => {
    if (child?.props?.front && child?.props?.back) {
      cards.push({
        front: child.props.front,
        back: child.props.back,
      });
    }
  });

  if (cards.length === 0) {
    return <div className={styles.empty}>No flashcards available.</div>;
  }

  const card = cards[currentIndex];

  return (
    <div className={styles.flashcardContainer}>
      <div className={styles.flashcardHeader}>
        <h3>Flashcard Deck</h3>
        <span className={styles.counter}>
          Card {currentIndex + 1} of {cards.length}
        </span>
      </div>

      <div className={styles.flashcardScene}>
        <div
          className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className={styles.flashcardFace}>
            <p className={styles.label}>Question</p>
            <p>{card.front}</p>
          </div>
          <div className={styles.flashcardFace}>
            <p className={styles.label}>Answer</p>
            <p>{card.back}</p>
          </div>
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.btn}
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>
        <button className={styles.btn} onClick={() => setIsFlipped(!isFlipped)}>
          🔄 Flip
        </button>
        <button
          className={styles.btn}
          onClick={() => setCurrentIndex(Math.min(cards.length - 1, currentIndex + 1))}
          disabled={currentIndex === cards.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};
