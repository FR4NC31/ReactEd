// pages/activity/activity3.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import ParticleBackground from '../components/ParticleBackground';

import correctSfx from '../../assets/correct.mp3';
import wrongSfx from '../../assets/wrong.mp3';
import victorySfx from '../../assets/Old victory sound roblox.mp3';

const questions = [
  {
    question: "________ is a reaction where oxygen reacts with a substance to release energy, often in the form of heat and light.",
    answer: "combustion",
  },
  {
    question: "________ is the solid formed when two clear liquids react and create an insoluble product.",
    answer: "precipitate",
  },
  {
    question: "________ ions are released by acids when dissolved in water.",
    answer: "h⁺",
  },
  {
    question: "________ is the process in which glucose and oxygen produce carbon dioxide, water, and energy in cells.",
    answer: "cellular respiration",
  },
  {
    question: "The reaction of vinegar and baking soda is an example of a reaction that produces ________ gas.",
    answer: "carbon dioxide",
  },
];

const Activity3 = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [timer, setTimer] = useState(10);
  const [flash, setFlash] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const username = localStorage.getItem('username') || 'Guest';

  const correctAudio = useRef(new Audio(correctSfx));
  const wrongAudio = useRef(new Audio(wrongSfx));
  const victoryAudio = useRef(new Audio(victorySfx));

  useEffect(() => {
    if (showResult && soundOn) {
      victoryAudio.current.play().catch(() => {});
      saveProgress();
    }
  }, [showResult]);

  useEffect(() => {
    if (!showResult) {
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t <= 1) {
            handleMissed();
            return 10;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [index, showResult]);

  const handleSubmit = () => {
    const cleaned = userAnswer.trim().toLowerCase();
    const correct = cleaned === questions[index].answer.toLowerCase();

    if (correct) {
      setScore(score + 1);
      setFlash('flash-correct');
      if (soundOn) correctAudio.current.play().catch(() => {});
    } else {
      setFlash('flash-wrong');
      if (soundOn) wrongAudio.current.play().catch(() => {});
    }

    setUserAnswer('');
    setTimeout(() => {
      setFlash('');
      setTimer(10);
      if (index + 1 < questions.length) {
        setIndex(index + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleMissed = () => {
    setFlash('flash-wrong');
    if (soundOn) wrongAudio.current.play().catch(() => {});
    setTimeout(() => {
      setFlash('');
      setTimer(10);
      if (index + 1 < questions.length) {
        setIndex(index + 1);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const saveProgress = async () => {
    try {
      const q = query(collection(db, 'StudentProgress'), where('username', '==', username));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const docRef = snapshot.docs[0].ref;
        const data = snapshot.docs[0].data();

        await setDoc(
          docRef,
          {
            ...data,
            lesson3: {
              completed: true,
              score: score,
              timestamp: new Date(),
            },
            lesson4: {
              unlocked: true,
              glowPlayed: false,
            },
          },
        );
      } else {
        await addDoc(collection(db, 'StudentProgress'), {
          username,
          lesson3: {
            completed: true,
            score: score,
            timestamp: new Date(),
          },
          lesson4: {
            unlocked: true,
            glowPlayed: false,
          },
        });
      }

      await addDoc(collection(db, 'Activity'), {
        username,
        Activity: 'Activity 3',
        Lesson: 'Lesson 3',
        Score: `${score} / ${questions.length}`,
        timestamp: new Date(),
      });

      console.log('✅ Activity 3 score saved and Lesson 4 unlocked.');
    } catch (err) {
      console.error('❌ Failed to save Activity 3 progress:', err);
    }
  };

   const getStars = () => {
    const ratio = score / questions.length;
    if (ratio === 1) return '⭐⭐⭐';
    if (ratio >= 0.66) return '⭐⭐';
    if (ratio >= 0.33) return '⭐';
    return '❌';
  };


  const current = questions[index];

  return (
    <div className={`min-h-screen bg-[#02010a] text-white px-4 py-10 relative overflow-hidden ${flash}`}>
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000aa] to-[#0a0a1f99] z-0" />
      <button
        onClick={() => setSoundOn(!soundOn)}
        className="absolute top-4 right-4 z-10 bg-white/10 border border-cyan-300 text-cyan-200 px-4 py-1 rounded-full text-sm hover:bg-white/20"
      >
        🔊 Sound: {soundOn ? 'On' : 'Off'}
      </button>
      <h1 className="text-3xl text-cyan-300 font-bold text-center z-10 relative mb-6">
        Activity 3: Identification
      </h1>

      {!showResult ? (
        <div className="max-w-xl mx-auto text-center z-10 relative">
          {/* Timer bar */}
          <div className="w-full bg-white/10 h-3 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-green-400 transition-all duration-1000"
              style={{ width: `${(timer / 10) * 100}%` }}
            ></div>
          </div>

          <p className="mb-4 text-lg font-medium">{current.question}</p>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer"
            className="w-full py-2 px-4 rounded-lg text-white border-2 border-cyan-400/20 bg-transparent placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 rounded-full"
          >
            Submit
          </button>

          <p className="mt-6 text-sm text-white/60">
            Question {index + 1} of {questions.length}
          </p>
        </div>
      ) : (
        <div className="text-center mt-20 z-10 relative">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            🎉 You scored {score} / {questions.length}
          </h2>
          <p className="text-xl text-yellow-300 mb-4">{getStars()}</p>
          <button
            onClick={() => (window.location.href = '/lesson')}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 rounded-full"
          >
            ← Back to Lesson
          </button>
        </div>
      )}
    </div>
  );
};

export default Activity3;
