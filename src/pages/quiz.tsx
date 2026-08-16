import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import styles from '@/styles/pages.module.css';

interface QuizState {
  subject: string;
  questions: any[];
  currentIndex: number;
  score: number;
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<QuizState | null>(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/notes.json')
      .then((res) => res.json())
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const startQuiz = (subject: string) => {
    // Quiz generation logic here
    setQuiz({
      subject,
      questions: [],
      currentIndex: 0,
      score: 0,
    });
  };

  return (
    <>
      <Head>
        <title>Quizzes · Study Notes</title>
      </Head>
      <Layout>
        <div className={styles.quizzesContainer}>
          <h1>📚 Interactive Quizzes</h1>
          <p>Test your knowledge with auto-generated quizzes based on your notes.</p>

          {loading ? (
            <div className={styles.loading}>Loading quizzes...</div>
          ) : (
            <div className={styles.quizzesGrid}>
              {subjects.map((subject: any) => (
                <button
                  key={subject.subject}
                  className={styles.quizCard}
                  onClick={() => startQuiz(subject.subject)}
                >
                  <div className={styles.quizCardTitle}>{subject.subject}</div>
                  <div className={styles.quizCardMeta}>🎯 {subject.notes.length} notes • Start Quiz →</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
