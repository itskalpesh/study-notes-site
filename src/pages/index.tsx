import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Sidebar from '@/components/Sidebar';
import Search from '@/components/Search';
import styles from '@/styles/pages.module.css';

export default function Home() {
  const [manifest, setManifest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/notes.json')
      .then((res) => res.json())
      .then((data) => {
        setManifest(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const totalNotes = manifest.reduce((sum, s) => sum + s.notes.length, 0);

  return (
    <>
      <Head>
        <title>Study Notes · Markdoc Edition</title>
        <meta name="description" content="A Markdoc-powered study notes platform with quizzes, flashcards, and AI chat." />
      </Head>
      <Layout>
        <div className={styles.landing}>
          <div className={styles.landingHero}>
            <p className={styles.eyebrow}>📚 Markdoc Knowledge Base</p>
            <h1>Study Notes Hub</h1>
            <p className={styles.lede}>
              Explore course materials, test your knowledge with interactive quizzes, study with flashcards, or ask questions to the AI assistant grounded in your notes.
            </p>

            <div className={styles.landingStats}>
              <div className={styles.stat}>
                <div className={styles.num}>{manifest.length}</div>
                <div className={styles.label}>Subjects</div>
              </div>
              <div className={styles.stat}>
                <div className={styles.num}>{totalNotes}</div>
                <div className={styles.label}>Notes</div>
              </div>
            </div>

            <Search />
          </div>

          <div className={styles.landingGrid}>
            {loading ? (
              <div className={styles.loading}>Loading subjects...</div>
            ) : manifest.length > 0 ? (
              manifest.map((subject) => (
                <a
                  key={subject.subject}
                  href={`/notes/${encodeURIComponent(subject.subject)}/${encodeURIComponent(
                    subject.notes[0].file.replace(/\.(md|markdoc)$/i, '')
                  )}`}
                  className={styles.landingCard}
                >
                  <div className={styles.cardSubject}>{subject.subject}</div>
                  <div className={styles.cardCount}>
                    {subject.notes.length} note{subject.notes.length === 1 ? '' : 's'}
                  </div>
                </a>
              ))
            ) : (
              <div className={styles.empty}>No subjects found. Add Markdown files to the content/ directory.</div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}
