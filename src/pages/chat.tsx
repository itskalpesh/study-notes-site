import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import styles from '@/styles/pages.module.css';

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '👋 Hi! I am your vault knowledge assistant. Ask me anything about your study notes!',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchIndex, setSearchIndex] = useState([]);

  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data) => setSearchIndex(data))
      .catch(() => {});
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    // Search for relevant content
    const query = userMessage.toLowerCase();
    const results = searchIndex
      .filter(
        (entry: any) =>
          entry.title.toLowerCase().includes(query) ||
          entry.subject.toLowerCase().includes(query) ||
          entry.content.toLowerCase().includes(query)
      )
      .slice(0, 3);

    const answer =
      results.length > 0
        ? `Based on your notes: ${results.map((r: any) => r.title).join(', ')}`
        : 'I could not find relevant notes about that topic.';

    setMessages((prev) => [...prev, { sender: 'bot', text: answer }]);
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>AI Assistant · Study Notes</title>
      </Head>
      <Layout>
        <div className={styles.chatContainer}>
          <div className={styles.chatHeader}>
            <h1>🤖 Study Notes AI Assistant</h1>
            <p>Ask questions about your course materials grounded in your notes.</p>
          </div>

          <div className={styles.chatMessages}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`${styles.chatMessage} ${styles[`msg-${msg.sender}`]}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className={styles.typing}>Searching notes...</div>}
          </div>

          <div className={styles.chatInput}>
            <input
              type="text"
              placeholder="Ask a question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <button onClick={handleSend} disabled={loading}>
              Send
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
