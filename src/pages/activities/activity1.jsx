import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const idQuestions = [
  {
    id: 1,
    question: '______ is a reaction where oxygen reacts with a substance to release energy, often in the form of heat and light.',
    answer: 'Combustion',
    emoji: '🔥'
  },
  {
    id: 2,
    question: '______ is the solid formed when two clear liquids react and create an insoluble product.',
    answer: 'Precipitate',
    emoji: '⚗️'
  },
  {
    id: 3,
    question: '______ ions are released by acids when dissolved in water.',
    answer: 'H⁺',
    emoji: '🧪'
  },
  {
    id: 4,
    question: '______ is the process in which glucose and oxygen produce carbon dioxide, water, and energy in cells.',
    answer: 'Cellular respiration',
    emoji: '🍃'
  },
  {
    id: 5,
    question: 'The reaction of vinegar and baking soda is an example of a reaction that produces ______ gas.',
    answer: 'Carbon dioxide',
    emoji: '💨'
  }
];

const ActivityOne = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timer, setTimer] = useState(10);
  const [confetti, setConfetti] = useState(false);

  const current = idQuestions[currentIndex];

  useEffect(() => {
    if (!showResult && feedback === null) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            handleSubmit(); // auto-submit if time runs out
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, feedback]);

  const handleSubmit = () => {
    const isCorrect = input.trim().toLowerCase() === current.answer.toLowerCase();
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(isCorrect);

    setTimeout(() => {
      if (currentIndex + 1 < idQuestions.length) {
        setCurrentIndex((prev) => prev + 1);
        setInput('');
        setFeedback(null);
        setTimer(10);
      } else {
        setShowResult(true);
        setConfetti(true);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#02010a] text-white font-sans flex flex-col justify-center items-center p-6">
      {confetti && <Confetti />}

      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-10 text-center animate-pulse tracking-widest">
        Activity 1: Identification Round
      </h1>

      {!showResult && (
        <>
          <div className="text-center text-lg text-yellow-400 mb-4 animate-pulse">
            ⏱ Time Left: {timer}s
          </div>

          <div className="bg-white/10 border border-cyan-300 rounded-xl p-6 w-full max-w-xl text-center shadow-lg">
            <div className="text-6xl mb-4">{current.emoji}</div>
            <p className="text-lg mb-4">{current.question}</p>

            <input
              type="text"
              className="w-full px-4 py-2 rounded bg-white/10 border border-cyan-300 text-white mb-4"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={feedback !== null}
              placeholder="Your answer here..."
            />

            <button
              onClick={handleSubmit}
              disabled={feedback !== null}
              className={`px-6 py-2 rounded-full font-bold ${
                feedback !== null
                  ? 'bg-gray-500 text-white cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-400 text-black'
              }`}
            >
              Submit
            </button>

            {feedback !== null && (
              <div
                className={`mt-4 text-lg font-semibold ${
                  feedback ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {feedback ? '✅ Correct!' : `❌ Incorrect. Answer: ${current.answer}`}
              </div>
            )}
          </div>
        </>
      )}

      {showResult && (
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            🎉 You scored {score} out of {idQuestions.length}!
          </h2>
          <button
            onClick={() => window.location.href = '/lesson/2'}
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
