import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { db } from '../../../firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import ParticleBackground from '../components/ParticleBackground';

import VictorySFX from '../../assets/Old victory sound roblox.mp3';
import CorrectSound from '../../assets/correct.mp3';
import IncorrectSound from '../../assets/wrong.mp3';

const scenarios = [
  { id: 11, statement: 'A chemical reaction always involves a change in state.', answer: false },
  { id: 12, statement: 'Acids turn blue litmus paper red.', answer: true },
  { id: 13, statement: 'The total mass of the reactants is always equal to the total mass of the products.', answer: true },
  { id: 14, statement: 'Bases taste sour and feel sticky.', answer: false },
  { id: 15, statement: 'Combustion contributes to climate change and air pollution.', answer: true },
];

const options = ['True', 'False'];

const Activity5 = () => {
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const victoryRef = useRef(null);
  const correctRef = useRef(null);
  const incorrectRef = useRef(null);

  const username = localStorage.getItem('username') || 'Guest';
  const current = scenarios[index];

  useEffect(() => {
    if (showResult) {
      victoryRef.current?.play();
      saveProgress();
    }
  }, [showResult]);

  const handleChoice = (selected) => {
    const correct = current.answer === (selected === 'True');
    if (correct) {
      correctRef.current?.play();
      setScore((prev) => prev + 1);
    } else {
      incorrectRef.current?.play();
    }

    setFeedback(correct);
    setTimeout(() => {
      setFeedback(null);
      next();
    }, 1200);
  };

  const next = () => {
    if (index + 1 < scenarios.length) {
      setIndex(index + 1);
    } else {
      setShowResult(true);
      setConfetti(true);
    }
  };

  const saveProgress = async () => {
    try {
      const q = query(collection(db, 'StudentProgress'), where('username', '==', username));
      const snapshot = await getDocs(q);

      const progressData = {
        lesson5: {
          completed: true,
          score: score,
          timestamp: new Date(),
        },
      };

      if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;
        const data = snapshot.docs[0].data();
        await setDoc(docRef, { ...data, ...progressData }, { merge: true });
      } else {
        await addDoc(collection(db, 'StudentProgress'), {
          username,
          ...progressData,
        });
      }

      await addDoc(collection(db, 'Activity'), {
        username,
        Activity: 'Activity 5',
        Lesson: 'Lesson 5',
        Score: `${score} / ${scenarios.length}`,
        timestamp: new Date(),
      });
      console.log('✅ Score saved and Lesson 4 progress updated!');
    } catch (err) {
      console.error('❌ Failed to save score:', err);
    }
  };

  const getStars = () => {
    const ratio = score / scenarios.length;
    if (ratio === 1) return '⭐⭐⭐';
    if (ratio >= 0.66) return '⭐⭐';
    if (ratio >= 0.33) return '⭐';
    return '❌';
  };

  return (
    <div className="relative min-h-screen bg-[#02010a] text-white font-sans overflow-hidden">
      <ParticleBackground />

      <audio ref={victoryRef} src={VictorySFX} preload="auto" />
      <audio ref={correctRef} src={CorrectSound} preload="auto" />
      <audio ref={incorrectRef} src={IncorrectSound} preload="auto" />
      {confetti && <Confetti />}

      <div className="relative z-10 px-4 py-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 text-center mb-8 animate-pulse">
          Activity 5: True or False?
        </h1>

        {!showResult && (
          <div className="max-w-xl mx-auto bg-white/5 border border-cyan-300 rounded-xl p-6 text-center shadow-xl">
            <p className="text-xl mb-6">{current.id}. {current.statement}</p>
            <div className="flex justify-center gap-6">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleChoice(opt)}
                  className={`px-6 py-2 text-lg font-semibold rounded-full bg-cyan-600 hover:bg-cyan-500`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {feedback !== null && (
              <div
                className={`mt-4 text-lg font-semibold ${
                  feedback ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {feedback ? '✅ Correct!' : '❌ Incorrect!'}
              </div>
            )}
          </div>
        )}

        {showResult && (
          <div className="text-center mt-16 fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-400 mb-4">
              🎉 You scored {score} out of {scenarios.length}!
            </h2>
            <p className="text-xl text-yellow-300 mb-4">{getStars()}</p>
            <button
              onClick={() => (window.location.href = '/lesson')}
              className="mt-4 bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 rounded-full"
            >
              ← Back to Lessons
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity5;
