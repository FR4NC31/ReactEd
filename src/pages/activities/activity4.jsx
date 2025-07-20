import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import ParticleBackground from '../components/ParticleBackground';
import Salt from '../../assets/salt.png';
import Fireworks from '../../assets/fireworks.png';
import Hydrogen from '../../assets/Decomposing Peroxide.gif';
import Vinegar from '../../assets/bakingsoda.gif';
import correctSfx from '../../assets/correct.mp3';
import wrongSfx from '../../assets/wrong.mp3';
import winSfx from '../../assets/Old victory sound roblox.mp3';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, getDocs, query, where, setDoc } from 'firebase/firestore';

const scenarios = [
  {
    image: Salt,
    question: 'What type of reaction is this? 🧂 Salt Formation',
    options: ['Combustion', 'Synthesis', 'Decomposition', 'Acid-Base'],
    answer: 'Synthesis',
  },
  {
    image: Fireworks,
    question: 'What type of reaction is this? 🎆 Fireworks',
    options: ['Decomposition', 'Single Replacement', 'Combustion', 'Neutralization'],
    answer: 'Combustion',
  },
  {
    image: Hydrogen,
    question: 'What type of reaction is this? 🧪 Decomposing Hydrogen Peroxide',
    options: ['Double Replacement', 'Acid-Base', 'Synthesis', 'Decomposition'],
    answer: 'Decomposition',
  },
  {
    image: Vinegar,
    question: 'What type of reaction is this? 🧊 Vinegar + Baking Soda',
    options: ['Combustion', 'Neutralization', 'Acid-Base', 'Synthesis'],
    answer: 'Acid-Base',
  },
];

const Activity4 = () => {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const username = localStorage.getItem('username') || 'Guest';

  const correctAudio = new Audio(correctSfx);
  const wrongAudio = new Audio(wrongSfx);
  const winAudio = new Audio(winSfx);

  const handleSelect = (option) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);

    const correct = scenarios[current].answer === option;
    if (correct) {
      correctAudio.play();
      setScore((prev) => prev + 1);
    } else {
      wrongAudio.play();
    }

    setTimeout(() => {
      if (current < scenarios.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
        setAnswered(false);
      } else {
        winAudio.play();
        setShowResult(true);
        setShowConfetti(true);
        saveProgress();
      }
    }, 1200);
  };

  const saveProgress = async () => {
    try {
      const q = query(collection(db, 'StudentProgress'), where('username', '==', username));
      const snapshot = await getDocs(q);

      const progressData = {
        lesson4: {
          completed: true,
          score: score,
          timestamp: new Date(),
          type: 'Image Reaction Identification',
        },
        lesson5: {
          unlocked: true,
          glowPlayed: false,
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
        Activity: 'Activity 4',
        Lesson: 'Lesson 4',
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
    <div className="relative min-h-screen text-white overflow-hidden">
      <ParticleBackground />
      {showConfetti && <Confetti />}
      <div className="p-6 max-w-3xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold text-center mb-4">🔬 Activity 4: Identify the Reaction</h1>
        <p className="text-center mb-6">Progress: {current + (showResult ? 0 : 1)} / {scenarios.length}</p>

        {!showResult ? (
          <div className="bg-white/10 backdrop-blur p-6 rounded-2xl shadow-xl border border-white/20">
            <img
              src={scenarios[current].image}
              alt="Scenario"
              className="w-full h-64 object-contain rounded-xl mb-4 border border-white/20"
            />
            <h2 className="text-xl font-semibold mb-4">{scenarios[current].question}</h2>
            <div className="grid grid-cols-2 gap-4">
              {scenarios[current].options.map((opt, index) => {
                const isCorrect = opt === scenarios[current].answer;
                const isSelected = opt === selected;

                let bgColor = 'bg-white/20 hover:bg-white/30';
                if (answered) {
                  if (isSelected && isCorrect) bgColor = 'bg-green-600';
                  else if (isSelected && !isCorrect) bgColor = 'bg-red-600';
                  else if (isCorrect) bgColor = 'bg-green-400/50';
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(opt)}
                    className={`p-3 rounded-xl font-medium transition-all duration-200 border border-white/20 ${bgColor}`}
                    disabled={answered}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center mt-20 z-10 relative">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            🎉 You scored {score} / {scenarios.length}
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
    </div>
  );
};

export default Activity4;
