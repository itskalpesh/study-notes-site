/**
 * Quiz Component
 * Renders interactive quizzes with auto-generated questions from notes
 */

import React, { useState, useEffect } from 'react';
import styles from './Quiz.module.css';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  answerIndex: number;
}

interface QuizProps {
  subject: string;
  count?: number;
}

export const Quiz: React.FC<QuizProps> = ({ subject, count = 5 }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading questions
    // In production, this would fetch from an API
    setLoading(false);
  }, [subject]);

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (index === questions[currentIndex]?.answerIndex) {
      setScore(score + 1);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Generating quiz questions...</div>;
  }

  if (questions.length === 0) {
    return <div className={styles.empty}>No quiz questions available for this subject.</div>;
  }

  const question = questions[currentIndex];
  const isCorrect = selectedAnswer === question.answerIndex;

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeader}>
        <h3>Quiz: {subject}</h3>
        <span className={styles.progress}>
          Question {currentIndex + 1} of {questions.length}
        </span>
      </div>

      <div className={styles.questionBox}>
        <h4>{question.question}</h4>
        <div className={styles.options}>
          {question.options.map((option, idx) => (
            <button
              key={idx}
              className={`${styles.optionBtn} ${
                selectedAnswer === idx ? (isCorrect ? styles.correct : styles.incorrect) : ''
              }`}
              onClick={() => handleSelectAnswer(idx)}
              disabled={selectedAnswer !== null}
            >
              {String.fromCharCode(65 + idx)}. {option}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`${styles.explanation} ${isCorrect ? styles.correctExp : styles.incorrectExp}`}>
            <strong>{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</strong>
            <p>{question.explanation}</p>
          </div>
        )}

        {showExplanation && currentIndex < questions.length - 1 && (
          <button className={styles.nextBtn} onClick={handleNext}>
            Next Question →
          </button>
        )}
      </div>
    </div>
  );
};
