import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import styles from '@/styles/pages.module.css';

export default function FlashcardsPage() {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Generate flashcards from search index
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data) => {
        // Extract definitions and generate flashcards
        const generated = data
          .filter((entry: any) => !entry.file.toLowerCase().includes('syllabus'))
          .slice(0, 20)
          .map((entry: any) => ({
            front: `What is ${entry.title}?`,
            back: entry.content.slice(0, 200),
            subject: entry.subject,
          }));
        setCards(generated);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Building flashcard deck...</div>
      </Layout>
    );
  }

  if (cards.length === 0) {
    return (
      <Layout>
        <div className={styles.empty}>No flashcards available.</div>
      </Layout>
    );
  }

  const card = cards[currentIndex];

  return (
    <>
      <Head>
        <title>Flashcards · Study Notes</title>
      </Head>
      <Layout>
        <div className={styles.flashcardsContainer}>
          <h1>🎓 Spaced Repetition Flashcards</h1>
          <p>
            Card {currentIndex + 1} of {cards.length}
          </p>

          <div className={styles.flashcardScene}>
            <div
              className={`${styles.flashcard} ${isFlipped ? styles.flipped : ''}`}
              onClick={() => setIsFlipped(!isFlipped)}
            >
              <div className={styles.face}>
                <p className={styles.label}>Question</p>
                <p>{card.front}</p>
              </div>
              <div className={styles.face}>
                <p className={styles.label}>Answer</p>
                <p>{card.back}</p>
              </div>
            </div>
          </div>

          <div className={styles.controls}>
            <button
              className={styles.controlBtn}
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>
            <button className={styles.controlBtn} onClick={() => setIsFlipped(!isFlipped)}>
              🔄 Flip
            </button>
            <button
              className={styles.controlBtn}
              onClick={() => setCurrentIndex(Math.min(cards.length - 1, currentIndex + 1))}
              disabled={currentIndex === cards.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
