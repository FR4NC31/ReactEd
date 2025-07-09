import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { db } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import Victorysfx from '../../assets/Old victory sound roblox.mp3';

const scenarios = [
  { id: 1, label: '🧊 Ice Melting', isChemical: false, explanation: 'Physical Change: Ice turns into water, but it’s still H₂O.' },
  { id: 2, label: '🔥 Paper Burning', isChemical: true, explanation: 'Chemical Change: Paper turns into ash, smoke, and gases.' },
  { id: 3, label: '🍳 Egg Cooking', isChemical: true, explanation: 'Chemical Change: Proteins denature permanently.' },
  { id: 4, label: '💧 Water Boiling', isChemical: false, explanation: 'Physical Change: State change only.' },
];

const idQuestions = [
  { id: 1, question: '______ is a reaction where oxygen reacts with a substance to release energy, often in the form of heat and light.', answer: 'Combustion', emoji: '🔥' },
  { id: 2, question: '______ is the solid formed when two clear liquids react and create an insoluble product.', answer: 'Precipitate', emoji: '⚗️' },
  { id: 3, question: '______ ions are released by acids when dissolved in water.', answer: 'H⁺', emoji: '🧪' },
  { id: 4, question: '______ is the process in which glucose and oxygen produce carbon dioxide, water, and energy in cells.', answer: 'Cellular respiration', emoji: '🍃' },
  { id: 5, question: 'The reaction of vinegar and baking soda is an example of a reaction that produces ______ gas.', answer: 'Carbon dioxide', emoji: '💨' },
];

const options = ['Chemical', 'Physical'];

const ActivityOne = () => {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [feedback, setFeedback] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [input, setInput] = useState('');
  const audioRef = useRef(null);

  const username = localStorage.getItem('username') || 'Guest';
  const allItems = [...scenarios, ...idQuestions];
  const current = allItems[currentIndex];
  const isScenario = currentIndex < scenarios.length;

  useEffect(() => {
    if (!showResult) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            handleTimeout();
            clearInterval(interval);
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, showResult]);

  useEffect(() => {
    if (showResult) {
      saveScore();
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [showResult]);

  const handleChoice = (answer) => {
    const isCorrect = current.isChemical === (answer === 'Chemical');
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(isCorrect);
    setTimeout(() => {
      setFeedback(null);
      nextItem();
    }, 1000);
  };

  const handleSubmit = () => {
    const isCorrect = input.trim().toLowerCase() === current.answer.toLowerCase();
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(isCorrect);
    setTimeout(() => {
      setInput('');
      setFeedback(null);
      nextItem();
    }, 1000);
  };

  const handleTimeout = () => {
    setFeedback(false);
    setTimeout(() => {
      setFeedback(null);
      nextItem();
    }, 1000);
  };

  const nextItem = () => {
    if (currentIndex + 1 < allItems.length) {
      setCurrentIndex(currentIndex + 1);
      setTimer(10);
    } else {
      setShowResult(true);
      setConfetti(true);
    }
  };

  const saveScore = async () => {
    try {
      await addDoc(collection(db, 'Activity'), {
        username,
        Activity: 'Activity 1',
        Lesson: 'Lesson 1',
        Score: `${score} / ${allItems.length}`,
        timestamp: new Date(),
      });
      console.log('✅ Score saved for', username);
    } catch (error) {
      console.error('❌ Failed to save score:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#02010a] text-white font-sans px-4 py-10 fade-in">
      <audio ref={audioRef} src={Victorysfx} preload="auto" />
      {confetti && <Confetti />}
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 text-center mb-10 animate-pulse">
        Activity 1: Is It a Chemical Reaction?
      </h1>

      <div className="bg-white/5 border border-cyan-300 p-4 rounded-lg max-w-2xl mx-auto text-sm sm:text-base text-cyan-100 mb-6">
        <p className="font-semibold mb-1 text-cyan-300">📘 Instructions:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Scenario Round: Decide if the situation is a Chemical or Physical change.</li>
          <li>Identification Round: Type the correct scientific term based on the clue.</li>
          <li>Each question has a 10-second timer — stay sharp!</li>
          <li>Try to get the highest score. Good luck!</li>
        </ul>
      </div>

      {!showResult && (
        <div className="text-center mb-6">
          <p className="text-lg font-bold text-yellow-400 animate-pulse">⏱ Time Left: {timer}s</p>
        </div>
      )}

      {!showResult && (
        <div className="max-w-xl mx-auto bg-white/10 border border-cyan-300 rounded-xl p-6 text-center shadow-lg fade-in">
          {isScenario ? (
            <>
              <div className="text-6xl mb-4">{current.label.split(' ')[0]}</div>
              <p className="text-xl mb-6">{current.label.split(' ').slice(1).join(' ')}</p>
              <div className="flex justify-center gap-6 mb-4">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleChoice(opt)}
                    className={`px-6 py-2 rounded-full font-bold text-black ${
                      opt === 'Chemical' ? 'bg-green-500 hover:bg-green-400' : 'bg-blue-500 hover:bg-blue-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {feedback !== null && (
                <div className={`mt-2 text-lg font-semibold ${feedback ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback ? '✅ Correct!' : `❌ Incorrect. ${current.explanation}`}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="text-5xl mb-4">{current.emoji}</div>
              <p className="text-lg mb-4">{current.question}</p>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-white/10 border border-cyan-300 text-white mb-4"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={feedback !== null}
              />
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-400 text-black font-bold px-6 py-2 rounded-full"
                disabled={feedback !== null}
              >
                Submit
              </button>
              {feedback !== null && (
                <div className={`mt-4 text-lg font-semibold ${feedback ? 'text-green-400' : 'text-red-400'}`}>
                  {feedback ? '✅ Correct!' : `❌ Incorrect. Answer: ${current.answer}`}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {showResult && (
        <div className="text-center mt-12 fade-in">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            🎉 You scored {score} out of {allItems.length}!
          </h2>
          <button
            onClick={() => window.location.href = '/lesson/1'}
            className="mt-6 bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 rounded-full"
          >
            ← Back to Lesson
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityOne;
