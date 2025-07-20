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
  { id: 1, label: '🧊 Ice Melting', isChemical: false, explanation: 'Physical Change: Ice turns into water, but it’s still H₂O.' },
  { id: 2, label: '🔥 Paper Burning', isChemical: true, explanation: 'Chemical Change: Paper turns into ash, smoke, and gases.' },
  { id: 3, label: '🍳 Egg Cooking', isChemical: true, explanation: 'Chemical Change: Proteins denature permanently.' },
  { id: 4, label: '💧 Water Boiling', isChemical: false, explanation: 'Physical Change: State change only.' },
];

const options = ['Chemical', 'Physical'];

const Activity1 = () => {
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const victoryRef = useRef(null);
  const correctRef = useRef(null);
  const incorrectRef = useRef(null);
  const intervalRef = useRef(null);

  const username = localStorage.getItem('username') || 'Guest';
  const current = scenarios[index];

  useEffect(() => {
    if (!showResult) {
      intervalRef.current = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(intervalRef.current);
            handleTimeout();
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [index, showResult]);

  useEffect(() => {
    if (showResult) {
      victoryRef.current?.play();
      saveProgress();
    }
  }, [showResult]);

  const handleChoice = (answer) => {
    const correct = current.isChemical === (answer === 'Chemical');
    if (correct) {
      correctRef.current?.play();
      setScore(prev => prev + 1);
    } else {
      incorrectRef.current?.play();
    }

    setFeedback(correct);
    clearInterval(intervalRef.current);
    setTimeout(() => {
      setFeedback(null);
      next();
    }, 1200);
  };

  const handleTimeout = () => {
    incorrectRef.current?.play();
    setFeedback(false);
    setTimeout(() => {
      setFeedback(null);
      next();
    }, 1200);
  };

  const next = () => {
    if (index + 1 < scenarios.length) {
      setIndex(index + 1);
      setTimer(10);
    } else {
      setShowResult(true);
      setConfetti(true);
    }
  };

  const saveProgress = async () => {
  try {
    const q = query(collection(db, 'StudentProgress'), where('username', '==', username));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docRef = snapshot.docs[0].ref;
      const data = snapshot.docs[0].data();

      await setDoc(docRef, {
        ...data,
        lesson1: {
          completed: true,
          score: score,
          timestamp: new Date(),
        },
        lesson2: {
          unlocked: true,
          glowPlayed: false,
        },
      }, { merge: true });
    } else {
      // First time progress, create new doc with auto-ID
      await addDoc(collection(db, 'StudentProgress'), {
        username,
        lesson1: {
          completed: true,
          score: score,
          timestamp: new Date(),
        },
        lesson2: {
          unlocked: true,
          glowPlayed: false,
        },
      });
    }

    // Also log activity
    await addDoc(collection(db, 'Activity'), {
      username,
      Activity: 'Activity 1',
      Lesson: 'Lesson 1',
      Score: `${score} / ${scenarios.length}`,
      timestamp: new Date(),
    });

    console.log('✅ Score saved and Lesson 1 unlocked!');
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
          Activity 1: Is It a Chemical Reaction?
        </h1>

        {!showResult && (
          <>
            <div className="max-w-xl mx-auto h-3 mb-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-1000"
                style={{ width: `${(timer / 10) * 100}%` }}
              />
            </div>

            <div className="max-w-xl mx-auto bg-white/5 border border-cyan-300 rounded-xl p-6 text-center shadow-xl">
              <div className="text-6xl mb-4">{current.label.split(' ')[0]}</div>
              <p className="text-xl mb-6">{current.label.split(' ').slice(1).join(' ')}</p>

              <div className="flex justify-center gap-6">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleChoice(opt)}
                    className={`px-6 py-2 text-lg font-semibold rounded-full ${
                      opt === 'Chemical'
                        ? 'bg-green-500 hover:bg-green-400'
                        : 'bg-blue-500 hover:bg-blue-400'
                    }`}
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
                  {feedback ? '✅ Correct!' : `❌ Incorrect. ${current.explanation}`}
                </div>
              )}
            </div>
          </>
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

export default Activity1;
