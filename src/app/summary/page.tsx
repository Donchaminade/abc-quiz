"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "../../data/questions";
import { FiRefreshCw, FiHome } from "react-icons/fi";
import type { Question } from "../../data/questions";

// Définition du type Answer
type Answer = {
  questionId: number;
  selected: string | null;
  correct: boolean;
  correctAnswer: string;
};

export default function SummaryPage() {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const router = useRouter();

  useEffect(() => {
    const ans = JSON.parse(localStorage.getItem("abc_quiz_answers") || "[]");
    setAnswers(ans);
    const ids = ans.map((a: Answer) => a.questionId);
    setQuestions(QUESTIONS.filter((q) => ids.includes(q.id)));
  }, []);

  const handleScore = () => {
    router.push("/score");
  };

  const handleReset = () => {
    localStorage.clear();
    router.push("/");
  };

  if (!answers.length) return <div className="centered-page fade-in-up">Chargement du résumé...</div>;

  return (
    <div className="centered-page fade-in-up">
      <div className="card fade-in-up">
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="button-abc" style={{ padding: 8, width: 44, height: 44, borderRadius: '50%', marginTop: 0, marginRight: 0 }} onClick={handleReset} title="Relancer le jeu"><FiRefreshCw className="icon" /></button>
        </div>
        <h2 style={{ fontSize: 32, textAlign: 'center', background: 'linear-gradient(90deg,#030580FF,#64b5f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 32 }}>Récapitulatif</h2>
        <ol style={{ fontSize: 20, marginBottom: 32 }}>
          {questions.map((q, i) => (
            <li key={q.id} className="fade-in-up" style={{ marginBottom: 20, padding: 10, borderRadius: 10, background: '#f5faff', boxShadow: '0 2px 8px #e3f2fd', color: '#030580FF' }}>
              <div><b>{q.question}</b></div>
              <div>Votre réponse : {answers[i]?.selected ? <span style={{ color: answers[i].correct ? '#43e97b' : '#ff5252', fontWeight: 600 }}>{answers[i].selected}</span> : <i style={{ color: '#030580FF', opacity: 0.7 }}>Aucune</i>}</div>
              {!answers[i]?.correct && (
                <div>Bonne réponse : <span style={{ color: '#43e97b', fontWeight: 600 }}>{answers[i].correctAnswer}</span></div>
              )}
            </li>
          ))}
        </ol>
        <button onClick={handleScore} className="button-abc fade-in-up" style={{ width: '100%', fontSize: 22 }}>Voir mon score</button>
      </div>
    </div>
  );
} 