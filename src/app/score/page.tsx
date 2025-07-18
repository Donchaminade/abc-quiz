"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiRefreshCw, FiGift, FiX } from "react-icons/fi";
import html2canvas from "html2canvas";
import Confetti from "react-confetti";

const GIFT_THRESHOLDS = {
  facile: { 5: 4, 10: 8, 15: 12, 20: 16 },
  moyen: { 5: 5, 10: 9, 15: 13, 20: 17 },
  difficile: { 5: 5, 10: 10, 15: 14, 20: 18 },
};

// Définition du type Answer

type Answer = {
  questionId: number;
  selected: string | null;
  correct: boolean;
  correctAnswer: string;
};

export default function ScorePage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [level, setLevel] = useState<string>("");
  const [count, setCount] = useState<number>(5);
  const [showPopup, setShowPopup] = useState(false);
  const [wonGift, setWonGift] = useState(false);
  const winSoundRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setAnswers(JSON.parse(localStorage.getItem("abc_quiz_answers") || "[]"));
    setLevel(localStorage.getItem("abc_quiz_level") || "facile");
    setCount(parseInt(localStorage.getItem("abc_quiz_count") || "5"));
  }, []);

  useEffect(() => {
    if (showPopup && wonGift && winSoundRef.current) {
      winSoundRef.current.currentTime = 0;
      winSoundRef.current.play();
    }
  }, [showPopup, wonGift]);

  const correctCount = answers.filter((a) => a.correct).length;
  const points = correctCount * (level === "facile" ? 1 : level === "moyen" ? 2 : 3);
  const threshold = GIFT_THRESHOLDS[level as keyof typeof GIFT_THRESHOLDS]?.[count as keyof typeof GIFT_THRESHOLDS["facile"]] || 99;

  const handleDownload = async () => {
    // Cache le bouton et la navbar
    document.getElementById('score-download-btn')?.classList.add('hide-print');
    document.querySelector('nav')?.classList.add('hide-print');
    await new Promise(r => setTimeout(r, 100));
    const card = document.getElementById("score-card");
    if (card) {
      const canvas = await html2canvas(card, { backgroundColor: null });
      const link = document.createElement("a");
      link.download = "abc-quiz-score.png";
      link.href = canvas.toDataURL();
      link.click();
    }
    // Restaure l'affichage
    document.getElementById('score-download-btn')?.classList.remove('hide-print');
    document.querySelector('nav')?.classList.remove('hide-print');
    setShowPopup(true);
    setWonGift(correctCount >= threshold);
  };

  const handleReset = () => {
    localStorage.clear();
    router.push("/");
  };

  return (
    <div className="centered-page fade-in-up">
      <div id="score-card" className="card fade-in-up" style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="button-abc" style={{ padding: 8, width: 44, height: 44, borderRadius: '50%', marginTop: 0, marginRight: 0, background: '#0d1a4f' }} onClick={handleReset} title="Relancer le jeu" aria-label="Relancer le jeu" tabIndex={0}><FiRefreshCw className="icon-white" /></button>
        </div>
        <h2 style={{ fontSize: 32, background: 'none', color: '#030580FF', marginBottom: 32 }}>Votre Score</h2>
        <p style={{ fontSize: 22, color: '#030580FF' }}>Nombre de questions répondues : <b>{answers.length}</b></p>
        <p style={{ fontSize: 22, color: '#030580FF' }}>Bonnes réponses : <b style={{ color: '#43e97b' }}>{correctCount}</b></p>
        <p style={{ fontSize: 22, marginBottom: 32, color: '#030580FF' }}>Points : <b>{points}</b></p>
        <button onClick={handleDownload} id="score-download-btn" className="button-abc fade-in-up" style={{ width: '100%', fontSize: 22, background: '#030580FF' }} aria-label="Télécharger mon score" tabIndex={0}>Télécharger mon score</button>
      </div>
      {showPopup && wonGift && (
        <>
          <Confetti width={typeof window !== 'undefined' ? window.innerWidth : 800} height={typeof window !== 'undefined' ? window.innerHeight : 600} numberOfPieces={250} recycle={false} />
          <audio ref={winSoundRef} src="/abc-quiz/public/sounds/good.mp3" preload="auto" />
        </>
      )}
      {showPopup && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "#030580cc", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div className="card fade-in-up" style={{ minWidth: 340, textAlign: 'center', padding: 48, background: '#fff', color: '#030580FF', position: 'relative' }}>
            <button onClick={() => setShowPopup(false)} aria-label="Fermer le pop-up" tabIndex={0} style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 28, color: '#030580FF', cursor: 'pointer' }}>✖</button>
            {wonGift ? (
              <>
                <h3 style={{ fontSize: 30, color: '#43e97b', marginBottom: 18 }}>🎉 Félicitations !</h3>
                <p style={{ fontSize: 22, color: '#030580FF' }}>Vous avez gagné un cadeau !</p>
                <a href="https://forms.cloud.microsoft/Pages/ResponsePage.aspx?id=DQSIkWdsW0yxEjajBLZtrQAAAAAAAAAAAANAAonx_UFUOUxOUVlONzg2T01TU1kySExWOFgyQ0FQMS4u" target="_blank" rel="noopener noreferrer" style={{ color: '#030580FF', fontWeight: 600, fontSize: 20, textDecoration: 'underline' }}>Remplir le formulaire</a>
              </>
            ) : (
              <>
                <h3 style={{ fontSize: 30, color: '#ff5252', marginBottom: 18 }}>😢 Désolé !</h3>
                <p style={{ fontSize: 22, color: '#030580FF' }}>Vous ratez un cadeau cette fois-ci. Réessayez !</p>
              </>
            )}
          </div>
        </div>
      )}
      <style>{`.hide-print { display: none !important; }`}</style>
    </div>
  );
} 