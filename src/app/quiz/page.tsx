"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS, Question } from "../../data/questions";
import { FiRefreshCw, FiHome } from "react-icons/fi";
import Image from "next/image";

function shuffle<T>(array: T[]): T[] {
  return array
    .map((a) => [Math.random(), a] as [number, T])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

const TIMER_DURATION = 20; // secondes

export default function QuizPage() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<"" | "good" | "bad">("");
  const [timer, setTimer] = useState(TIMER_DURATION);
  const [answers, setAnswers] = useState<{
    questionId: number;
    selected: string | null;
    correct: boolean;
    correctAnswer: string;
  }[]>([]);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const level = localStorage.getItem("abc_quiz_level") as any;
    const count = parseInt(localStorage.getItem("abc_quiz_count") || "5");
    let filtered = QUESTIONS.filter((q) => q.difficulty === level);
    if (filtered.length < count) {
      // Complète avec d'autres questions d'autres niveaux si pas assez
      const others = QUESTIONS.filter((q) => q.difficulty !== level);
      filtered = [...filtered, ...shuffle(others)].slice(0, count);
    } else {
      filtered = shuffle(filtered).slice(0, count);
    }
    filtered = filtered.map((q) => ({ ...q, options: shuffle([...q.options]) }));
    setQuestions(filtered);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      handleSkip();
    }
    const t = setTimeout(() => setTimer((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const playSound = (type: 'good' | 'bad' | 'timer') => {
    const audio = new Audio(`/sounds/${type}.mp3`);
    audio.volume = 0.7;
    audio.play();
  };

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    const correct = option === questions[current].answer;
    setFeedback(correct ? "good" : "bad");
    playSound(correct ? 'good' : 'bad');
    setTimeout(() => {
      setAnswers((prev) => [
        ...prev,
        {
          questionId: questions[current].id,
          selected: option,
          correct,
          correctAnswer: questions[current].answer,
        },
      ]);
      setSelected(null);
      setFeedback("");
      setTimer(TIMER_DURATION);
      if (current + 1 < questions.length) {
        setTransitioning(true);
        setTimeout(() => {
          setCurrent((c) => c + 1);
          setTransitioning(false);
        }, 300);
      } else {
        localStorage.setItem("abc_quiz_answers", JSON.stringify([
          ...answers,
          {
            questionId: questions[current].id,
            selected: option,
            correct,
            correctAnswer: questions[current].answer,
          },
        ]));
        router.push("/summary");
      }
    }, 1000);
  };

  const handleSkip = () => {
    playSound('timer');
    setAnswers((prev) => [
      ...prev,
      {
        questionId: questions[current].id,
        selected: null,
        correct: false,
        correctAnswer: questions[current].answer,
      },
    ]);
    setSelected(null);
    setFeedback("");
    setTimer(TIMER_DURATION);
    if (current + 1 < questions.length) {
      setTransitioning(true);
      setTimeout(() => {
        setCurrent((c) => c + 1);
        setTransitioning(false);
      }, 300);
    } else {
      localStorage.setItem("abc_quiz_answers", JSON.stringify([
        ...answers,
        {
          questionId: questions[current].id,
          selected: null,
          correct: false,
          correctAnswer: questions[current].answer,
        },
      ]));
      router.push("/summary");
    }
  };

  if (!questions.length) return <div className="centered-page fade-in-up">Chargement des questions...</div>;
  const q = questions[current];

  const handleReset = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="centered-page fade-in-up">
      <div className="card fade-in-up" style={{ minHeight: 480 }}>
        <div style={{ width: '100%', height: 8, background: '#e3f2fd', borderRadius: 6, marginBottom: 18, overflow: 'hidden' }} aria-label="Progression du quiz" role="progressbar" aria-valuenow={Number(current+1)} aria-valuemax={Number(questions.length)} aria-valuemin={1}>
          <div style={{ width: `${((current+1)/questions.length)*100}%`, height: '100%', background: '#030580FF', borderRadius: 6, transition: 'width 0.3s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="button-abc" style={{ padding: 8, width: 44, height: 44, borderRadius: '50%', marginTop: 0, marginRight: 0 }} onClick={handleReset} title="Relancer le jeu"><FiRefreshCw className="icon" /></button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: '#030580FF' }}>
          <span>Question {current + 1} / {questions.length}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="38" height="38" viewBox="0 0 38 38" aria-label="Temps restant" role="timer">
              <circle
                cx="19"
                cy="19"
                r="16"
                fill="none"
                stroke="#e3f2fd"
                strokeWidth="5"
              />
              <circle
                cx="19"
                cy="19"
                r="16"
                fill="none"
                stroke={timer < 6 ? '#ff5252' : '#030580FF'}
                strokeWidth="5"
                strokeDasharray={2 * Math.PI * 16}
                strokeDashoffset={(1 - timer / TIMER_DURATION) * 2 * Math.PI * 16}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 1s linear, stroke 0.2s',
                  filter: timer < 6 && timer % 2 === 1 ? 'drop-shadow(0 0 6px #ff5252)' : 'none',
                }}
              />
            </svg>
            <b style={{ color: timer < 6 ? '#ff5252' : '#030580FF', fontVariantNumeric: 'tabular-nums', fontSize: 22 }}>{timer}s</b>
          </span>
        </div>
        {q.image && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 18 }}>
            <Image src={q.image} alt={`Illustration pour la question : ${q.question}`} width={180} height={120} style={{ objectFit: 'contain', borderRadius: 12, background: 'var(--background)' }} />
          </div>
        )}
        <h2 className="fade-in-up" style={{ margin: "40px 0 32px", fontSize: 30, textAlign: 'center', background: 'linear-gradient(90deg,#030580FF,#64b5f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 1 }}>{q.question}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`answer-btn${selected === opt ? (feedback === "good" ? " selected good" : feedback === "bad" ? " selected bad" : " selected") : ""}`}
              style={{
                width: '100%',
                fontSize: 18,
                marginBottom: 10,
                opacity: selected && selected !== opt ? 0.7 : 1,
                cursor: selected ? 'not-allowed' : 'pointer',
              }}
              tabIndex={0}
              aria-label={`Réponse : ${opt}`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 40, display: "flex", justifyContent: "space-between" }}>
          <button onClick={handleSkip} className="button-abc fade-in-up" style={{ background: '#fff', color: '#030580FF', fontSize: 20, opacity: 0.9 }} tabIndex={0} aria-label="Passer la question">Skip</button>
        </div>
      </div>
      <style>{`
          .question-transition {
            opacity: 0;
            transform: translateX(40px);
            transition: all 0.3s cubic-bezier(.4,0,.2,1);
          }
        `}</style>
    </div>
  );
} 