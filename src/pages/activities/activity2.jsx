import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

const scenarios = [
  {
    id: 1,
    emoji: '🧂',
    label: 'Salt Formation',
    correctType: 'Combination',
    explanation: '🔄 Combination/Synthesis Reaction: Na + Cl → NaCl',
  },
  {
    id: 2,
    emoji: '🎆',
    label: 'Fireworks',
    correctType: 'Combustion',
    explanation: '🔥 Combustion Reaction: Fuel + O₂ → CO₂ + Energy',
  },
  {
    id: 3,
    emoji: '🧪',
    label: 'Decomposing Hydrogen Peroxide',
    correctType: 'Decomposition',
    explanation: '💥 Decomposition Reaction: H₂O₂ → H₂O + O₂',
  },
  {
    id: 4,
    emoji: '🧊',
    label: 'Vinegar + Baking Soda',
    correctType: 'Acid-Base',
    explanation: '💨 Acid-Base Reaction (produces CO₂ gas)',
  },
];

const options = ['Combination', 'Combustion', 'Decomposition', 'Acid-Base'];

const ActivityTwo = () => {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timer, setTimer] = useState(10);
  const [feedback, setFeedback] = useState({});
  const [completed, setCompleted] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const [trueFalseAnswers, setTrueFalseAnswers] = useState({});
  const [mcqAnswers, setMcqAnswers] = useState({});

  const trueFalseQuestions = [
    { id: 11, question: 'A chemical reaction always involves a change in state.', answer: 'False' },
    { id: 12, question: 'Acids turn blue litmus paper red.', answer: 'True' },
    { id: 13, question: 'The total mass of the reactants is always equal to the total mass of the products.', answer: 'True' },
    { id: 14, question: 'Bases taste sour and feel sticky.', answer: 'False' },
    { id: 15, question: 'Combustion contributes to climate change and air pollution.', answer: 'True' },
  ];

  const mcqQuestions = [
    { id: 6, question: 'Which of the following changes does NOT indicate a chemical reaction?', options: ['Color change', 'Melting ice', 'Gas formation', 'Precipitate formation'], answer: 'b' },
    { id: 7, question: 'What is the pH range of bases?', options: ['Less than 7', 'Around 7', 'Greater than 7', 'Equal to 0'], answer: 'c' },
    { id: 8, question: 'What type of reaction is represented by this equation? 2H₂ + O₂ → 2H₂O', options: ['Decomposition', 'Combination', 'Double replacement', 'Single replacement'], answer: 'b' },
    { id: 9, question: 'Which of the following reactions shows acid reacting with metal?', options: ['CaCO₃ + HCl → CaCl₂ + CO₂ + H₂O', 'CH₄ + 2O₂ → CO₂ + 2H₂O', 'Mg + 2HCl → MgCl₂ + H₂', 'NaOH + HCl → NaCl + H₂O'], answer: 'c' },
    { id: 10, question: 'What do scientists use to show the rearrangement of atoms in a chemical reaction?', options: ['Thermometer', 'Chemical equation', 'Magnifying glass', 'Bunsen burner'], answer: 'b' },
  ];

  const current = scenarios[currentIndex];

  useEffect(() => {
    if (completed.length < scenarios.length && !gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            handleMissed(current.id);
            clearInterval(interval);
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, completed, gameOver]);

  const handleChoice = (id, type) => {
    if (completed.includes(id)) return;
    const scenario = scenarios.find(s => s.id === id);
    const isCorrect = scenario.correctType === type;

    if (isCorrect) setScore(prev => prev + 1);

    setFeedback(prev => ({
      ...prev,
      [id]: { isCorrect, explanation: scenario.explanation }
    }));

    const updated = [...completed, id];
    setCompleted(updated);
    setTimer(10);

    if (updated.length === scenarios.length && Object.keys(trueFalseAnswers).length === 5 && Object.keys(mcqAnswers).length === 5) {
      calculateFinalScore(trueFalseAnswers, mcqAnswers);
    } else {
      const next = scenarios.find(s => !updated.includes(s.id));
      if (next) setCurrentIndex(scenarios.indexOf(next));
    }
  };

  const handleMissed = (id) => {
    setFeedback(prev => ({ ...prev, [id]: { isCorrect: false, explanation: scenarios.find(s => s.id === id).explanation } }));
    const updated = [...completed, id];
    setCompleted(updated);
    const next = scenarios.find(s => !updated.includes(s.id));
    if (next) setCurrentIndex(scenarios.indexOf(next));
    if (updated.length === scenarios.length && Object.keys(trueFalseAnswers).length === 5 && Object.keys(mcqAnswers).length === 5) {
      calculateFinalScore(trueFalseAnswers, mcqAnswers);
    }
  };

  const handleTrueFalse = (id, value) => {
    const updated = { ...trueFalseAnswers, [id]: value };
    setTrueFalseAnswers(updated);
    if (Object.keys(updated).length === 5 && Object.keys(mcqAnswers).length === 5 && completed.length === scenarios.length) {
      calculateFinalScore(updated, mcqAnswers);
    }
  };

  const handleMCQ = (id, value) => {
    const updated = { ...mcqAnswers, [id]: value };
    setMcqAnswers(updated);
    if (Object.keys(trueFalseAnswers).length === 5 && Object.keys(updated).length === 5 && completed.length === scenarios.length) {
      calculateFinalScore(trueFalseAnswers, updated);
    }
  };

  const calculateFinalScore = (tf, mcq) => {
    let tfScore = trueFalseQuestions.filter(q => (tf[q.id] || '').toLowerCase() === q.answer.toLowerCase()).length;
    let mcqScore = mcqQuestions.filter(q => (mcq[q.id] || '').toLowerCase() === q.answer.toLowerCase()).length;
    setScore(prev => prev + tfScore + mcqScore);
    setGameOver(true);
    setShowResult(true);
  };

  return (
    <div className="min-h-screen bg-[#02010a] text-white font-sans px-4 py-10">
      {showResult && <Confetti />}
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-6 text-center animate-pulse">
        Activity 2: Name That Reaction Type
      </h1>

      {!showResult && current && (
        <div className="max-w-md mx-auto bg-white/10 border border-cyan-300 rounded-xl p-6 text-center shadow-lg">
          <p className="text-xl mb-2 text-cyan-100">⏱ Time Left: {timer}s</p>
          <div className="text-6xl mb-4">{current.emoji}</div>
          <p className="text-xl font-medium">{current.label}</p>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleChoice(current.id, opt)}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-4 py-1 rounded-full text-sm"
              >
                {opt}
              </button>
            ))}
          </div>

          {feedback[current.id] && (
            <div className="mt-4 text-sm">
              <p className="text-cyan-200">{feedback[current.id].explanation}</p>
              <p className={`${feedback[current.id].isCorrect ? 'text-green-400' : 'text-red-400'} font-semibold`}>
                {feedback[current.id].isCorrect ? 'Correct ✅' : 'Incorrect ❌'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* True or False */}
      <div className="mt-10 max-w-2xl mx-auto">
        <h2 className="text-2xl text-cyan-300 font-bold mb-4 text-center">✅ True or False</h2>
        {trueFalseQuestions.map(q => (
          <div key={q.id} className="mb-4">
            <label className="block text-sm mb-1">{q.id}. {q.question}</label>
            <input
              type="text"
              className="w-full p-2 bg-white/10 border border-cyan-400 rounded text-white"
              value={trueFalseAnswers[q.id] || ''}
              onChange={(e) => handleTrueFalse(q.id, e.target.value)}
              disabled={showResult}
            />
          </div>
        ))}
      </div>

      {/* Multiple Choice */}
      <div className="mt-10 max-w-2xl mx-auto">
        <h2 className="text-2xl text-cyan-300 font-bold mb-4 text-center">🔢 Multiple Choice</h2>
        {mcqQuestions.map(q => (
          <div key={q.id} className="mb-6">
            <label className="block text-sm mb-2">{q.id}. {q.question}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {q.options.map((opt, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`mcq-${q.id}`}
                    value={String.fromCharCode(97 + index)}
                    disabled={showResult}
                    onChange={(e) => handleMCQ(q.id, e.target.value)}
                  />
                  {String.fromCharCode(97 + index)}) {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showResult && (
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-green-400 mb-2">
            🎉 You scored {score} out of {scenarios.length + trueFalseQuestions.length + mcqQuestions.length}!
          </h2>
          <button
            onClick={() => (window.location.href = '/lesson/2')}
            className="mt-4 bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 rounded-full"
          >
            ← Back to Lesson
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityTwo;
