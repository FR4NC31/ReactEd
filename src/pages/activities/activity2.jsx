import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { auth, db } from '../../../firebaseConfig';
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

const mcQuestions = [
  {
    question: '1. Which of the following changes does NOT indicate a chemical reaction?',
    options: ['a. Color change', 'b. Melting ice', 'c. Gas formation', 'd. Precipitate formation'],
    answer: 'b. Melting ice',
  },
  {
    question: '2. What is the pH range of bases?',
    options: ['a. Less than 7', 'b. Around 7', 'c. Greater than 7', 'd. Equal to 0'],
    answer: 'c. Greater than 7',
  },
  {
    question: '3. What type of reaction is represented by this equation? 2H₂ + O₂ → 2H₂O',
    options: ['a. Decomposition', 'b. Combination', 'c. Double replacement', 'd. Single replacement'],
    answer: 'b. Combination',
  },
  {
    question: '4. Which of the following reactions shows acid reacting with metal?',
    options: [
      'a. CaCO₃ + HCl → CaCl₂ + CO₂ + H₂O',
      'b. CH₄ + 2O₂ → CO₂ + 2H₂O',
      'c. Mg + 2HCl → MgCl₂ + H₂',
      'd. NaOH + HCl → NaCl + H₂O',
    ],
    answer: 'c. Mg + 2HCl → MgCl₂ + H₂',
  },
  {
    question: '5. What do scientists use to show the rearrangement of atoms in a chemical reaction?',
    options: ['a. Thermometer', 'b. Chemical equation', 'c. Magnifying glass', 'd. Bunsen burner'],
    answer: 'b. Chemical equation',
  },
];

const Activity2 = () => {
  const [username, setUsername] = useState('');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState('');
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [timer, setTimer] = useState(10);

  const navigate = useNavigate();

  const intervalRef = useRef(null);
  const victoryRef = useRef(null);
  const correctRef = useRef(null);
  const incorrectRef = useRef(null);

  const currentQuestion = mcQuestions[current];

  useEffect(() => {
    const fetchUsername = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const q = query(collection(db, 'Student'), where('email', '==', currentUser.email));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          setUsername(snapshot.docs[0].data().username);
        }
      }
    };
    fetchUsername();
  }, []);

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
  }, [current]);

  useEffect(() => {
    if (showResult) {
      victoryRef.current?.play();
      saveProgress();
    }
  }, [showResult]);

  const handleSelect = (option) => {
    setSelected(option);
    clearInterval(intervalRef.current);

    const isCorrect = option === currentQuestion.answer;
    if (isCorrect) {
      correctRef.current?.play();
      setScore(prev => prev + 1);
    } else {
      incorrectRef.current?.play();
    }

    setFeedback(isCorrect);

    setTimeout(() => {
      setFeedback(null);
      setSelected('');
      if (current + 1 < mcQuestions.length) {
        setCurrent(prev => prev + 1);
        setTimer(10);
      } else {
        setShowResult(true);
        setConfetti(true);
      }
    }, 1500);
  };

  const handleTimeout = () => {
    incorrectRef.current?.play();
    setFeedback(false);
    setTimeout(() => {
      setFeedback(null);
      setSelected('');
      if (current + 1 < mcQuestions.length) {
        setCurrent(prev => prev + 1);
        setTimer(10);
      } else {
        setShowResult(true);
        setConfetti(true);
      }
    }, 1500);
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
          lesson2: {
            completed: true,
            score: score,
            timestamp: new Date(),
          },
          lesson3: {
            unlocked: true,
            glowPlayed: false,
          },
        }, { merge: true });
      } else {
        await addDoc(collection(db, 'StudentProgress'), {
          username,
          lesson2: {
            completed: true,
            score,
            timestamp: new Date(),
          },
          lesson3: {
            unlocked: true,
            glowPlayed: false,
          },
        });
      }

      await addDoc(collection(db, 'Activity'), {
        username,
        Activity: 'Activity 2',
        Lesson: 'Lesson 2',
        Score: `${score} / ${mcQuestions.length}`,
        timestamp: new Date(),
      });

      console.log('✅ Activity 2 score saved & Lesson 3 unlocked!');
    } catch (err) {
      console.error('❌ Failed to save Activity 2 score:', err);
    }
  };

  const getStars = () => {
    const ratio = score / mcQuestions.length;
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
          Activity 2: Multiple Choice Challenge
        </h1>

        {!showResult ? (
          <>
            <div className="max-w-xl mx-auto h-3 mb-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-1000"
                style={{ width: `${(timer / 10) * 100}%` }}
              />
            </div>

            <div className="max-w-xl mx-auto bg-white/5 border border-cyan-300 rounded-xl p-6 shadow-xl">
              <p className="text-xl mb-6">{currentQuestion.question}</p>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(option)}
                    disabled={selected}
                    className={`w-full text-left p-3 rounded-xl transition-all ${
                      selected === option
                        ? option === currentQuestion.answer
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {feedback !== null && (
                <div
                  className={`mt-4 text-lg font-semibold ${
                    feedback ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {feedback
                    ? '✅ Correct!'
                    : `❌ Incorrect. Correct answer: "${currentQuestion.answer}"`}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center mt-16 fade-in">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-400 mb-4">
              🎉 You scored {score} out of {mcQuestions.length}!
            </h2>
            <p className="text-xl text-yellow-300 mb-4">{getStars()}</p>
            <button
              onClick={() => navigate('/lesson')}
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

export default Activity2;
