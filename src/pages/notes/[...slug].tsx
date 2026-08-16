import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';
import styles from '@/styles/pages.module.css';

export default function NotePage() {
  const router = useRouter();
  const { slug } = router.query;
  const [noteContent, setNoteContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug || !Array.isArray(slug)) return;

    const subject = decodeURIComponent(slug[0]);
    const noteFile = decodeURIComponent(slug[1]);

    const filePath = `/content/${subject}/${noteFile}.md`;

    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error('Note not found');
        return res.text();
      })
      .then((content) => {
        setNoteContent({ subject, noteFile, content });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className={styles.loading}>Loading note...</div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={styles.error}>
          <h2>Could not load note</h2>
          <p>{error}</p>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{noteContent?.noteFile} · Study Notes</title>
      </Head>
      <Layout>
        <NoteViewer content={noteContent} />
      </Layout>
    </>
  );
}
