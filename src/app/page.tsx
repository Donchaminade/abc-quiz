"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiRefreshCw, FiHome } from "react-icons/fi";

const LEVELS = [
  { label: "Facile", value: "facile" },
  { label: "Moyen", value: "moyen" },
  { label: "Difficile", value: "difficile" },
];
const QUESTION_COUNTS = [5, 10, 15, 20];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<string>("");
  const [count, setCount] = useState<number>(5);
  const router = useRouter();

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    if (level && count) {
      localStorage.setItem("abc_quiz_level", level);
      localStorage.setItem("abc_quiz_count", count.toString());
      router.push("/quiz");
    }
  };

  if (loading) {
    return (
      <div className="centered-page fade-in-up" style={{ background: 'var(--background)', minHeight: '100vh', minWidth: '100vw' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ marginBottom: 32 }}>
            <div
              style={{
                width: 120,
                height: 120,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'zoomInOut 2.2s infinite cubic-bezier(.4,0,.2,1)'
              }}
            >
              <Image src="/logo.png" alt="Logo Africa Blockchain Community, quiz ABC" width={120} height={120} />
            </div>
          </div>
          <div style={{ marginBottom: 24 }}>
            <svg width="64" height="64" viewBox="0 0 64 64" aria-label="Chargement du quiz, veuillez patienter" role="status" tabIndex={0}>
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#e3f2fd"
                strokeWidth="8"
              />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke="#030580FF"
                strokeWidth="8"
                strokeDasharray="44 100"
                strokeLinecap="round"
                style={{
                  transformOrigin: 'center',
                  animation: 'spin 1.2s linear infinite',
                }}
              />
            </svg>
          </div>
          <h2 style={{ color: '#030580FF', fontWeight: 700, fontSize: 28, marginBottom: 8 }}>Africa Blockchain Community</h2>
          <p style={{ color: '#030580FF', fontSize: 20 }}>Chargement du quiz...</p>
        </div>
        <style>{`
          @keyframes spin {
            100% { transform: rotate(360deg); }
          }
          @keyframes zoomInOut {
            0% { transform: scale(1); }
            50% { transform: scale(1.18); }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  const handleReset = () => {
    setLevel("");
    setCount(5);
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="centered-page fade-in-up">
      <div className="card fade-in-up">
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="button-abc" style={{ padding: 8, width: 44, height: 44, borderRadius: '50%', marginTop: 0, marginRight: 0 }} onClick={handleReset} title="Relancer le jeu"><FiRefreshCw className="icon" /></button>
        </div>
        <Image src="/logo.png" alt="ABC Logo" width={120} height={120} style={{ margin: '0 auto', display: 'block', animation: 'fadeIn 1.5s', transition: 'transform 0.3s', cursor: 'pointer' }} onClick={e => { (e.target as HTMLImageElement).style.transform = 'scale(1.08)'; setTimeout(() => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }, 200); }} />
        <h1 style={{ margin: 32, fontSize: 40, textAlign: 'center', background: 'linear-gradient(90deg,#030580FF,#64b5f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 2, animation: 'fadeIn 2s' }}>ABC Quiz</h1>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 20, color: '#030580FF', fontWeight: 600 }}>Niveau du jeu :</label>
          <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {LEVELS.map((l) => (
              <button
                key={l.value}
                className="button-abc"
                style={{
                  background: level === l.value ? '#ffd600' : '#030580FF',
                  color: level === l.value ? '#030580FF' : '#fff',
                  opacity: level === l.value ? 1 : 0.85,
                  minWidth: 120,
                  marginBottom: 8,
                  fontWeight: level === l.value ? 700 : 500,
                  border: level === l.value ? '2px solid #ffd600' : 'none',
                  boxShadow: level === l.value ? '0 2px 12px #ffd60055' : '',
                }}
                onClick={() => setLevel(l.value)}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={{ fontSize: 20, color: '#030580FF', fontWeight: 600 }}>Nombre de questions :</label>
          <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            {QUESTION_COUNTS.map((q) => (
              <button
                key={q}
                className="button-abc"
                style={{
                  background: count === q ? '#ffd600' : '#030580FF',
                  color: count === q ? '#030580FF' : '#fff',
                  opacity: count === q ? 1 : 0.85,
                  minWidth: 80,
                  marginBottom: 8,
                  fontWeight: count === q ? 700 : 500,
                  border: count === q ? '2px solid #ffd600' : 'none',
                  boxShadow: count === q ? '0 2px 12px #ffd60055' : '',
                }}
                onClick={() => setCount(q)}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <button
          className="button-abc"
          style={{ width: '100%', fontSize: 22, marginTop: 32, opacity: level ? 1 : 0.5, background: level ? 'linear-gradient(90deg,#030580FF,#64b5f6)' : '#eee', cursor: level ? 'pointer' : 'not-allowed' }}
          disabled={!level}
          onClick={handleStart}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
