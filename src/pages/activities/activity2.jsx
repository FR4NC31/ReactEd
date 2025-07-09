import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { db } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import Victorysfx from '../../assets/Old victory sound roblox.mp3';

const reactionScenarios = [
  { id: 1, emoji: '🧂', label: 'Salt Formation', correctType: 'Combination', explanation: '🔄 Combination/Synthesis Reaction: Na + Cl → NaCl' },
  { id: 2, emoji: '🎆', label: 'Fireworks', correctType: 'Combustion', explanation: '🔥 Combustion Reaction: Fuel + O₂ → CO₂ + Energy' },
  { id: 3, emoji: '🧪', label: 'Decomposing Hydrogen Peroxide', correctType: 'Decomposition', explanation: '💥 Decomposition Reaction: H₂O₂ → H₂O + O₂' },
  { id: 4, emoji: '🧊', label: 'Vinegar + Baking Soda', correctType: 'Acid-Base', explanation: '💨 Acid-Base Reaction (produces CO₂ gas)' },
];

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
  { id: 9, question: 'Which reaction shows acid reacting with metal?', options: ['CaCO₃ + HCl → CaCl₂ + CO₂ + H₂O', 'CH₄ + 2O₂ → CO₂ + 2H₂O', 'Mg + 2HCl → MgCl₂ + H₂', 'NaOH + HCl → NaCl + H₂O'], answer: 'c' },
  { id: 10, question: 'What do scientists use to show the rearrangement of atoms in a chemical reaction?', options: ['Thermometer', 'Chemical equation', 'Magnifying glass', 'Bunsen burner'], answer: 'b' },
];

const typeOptions = ['Combination', 'Combustion', 'Decomposition', 'Acid-Base'];

const ActivityTwo = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);
  const [feedback, setFeedback] = useState(null);
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [username, setUsername] = useState('Guest');
  const audioRef = useRef(null);

  const totalLength = reactionScenarios.length + trueFalseQuestions.length + mcqQuestions.length;
  const allQuestions = [...reactionScenarios, ...trueFalseQuestions, ...mcqQuestions];
  const currentItem = allQuestions[index];
  const type = index < reactionScenarios.length ? 'reaction' : index < reactionScenarios.length + trueFalseQuestions.length ? 'truefalse' : 'mcq';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      const storedUsername = localStorage.getItem('username');
      setUsername(storedUsername || 'Guest');
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!showResult && feedback === null) {
      const interval = setInterval(() => {
        setTimer((t) => {
          if (t === 1) {
            handleMissed();
            clearInterval(interval);
            return 10;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [index, feedback, showResult]);

  useEffect(() => {
    if (showResult) {
      saveScore();
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [showResult]);

  const handleReaction = (selected) => {
    const correct = currentItem.correctType === selected;
    if (correct) setScore((s) => s + 1);
    setFeedback({ correct, message: currentItem.explanation });
    setTimeout(next, 1000);
  };

  const handleSubmit = () => {
    const correct = type === 'truefalse'
      ? currentItem.answer.toLowerCase() === answer.toLowerCase()
      : currentItem.answer === answer;

    if (correct) setScore((s) => s + 1);
    const message = type === 'truefalse'
      ? `Answer: ${currentItem.answer}`
      : `Correct answer: ${currentItem.answer}) ${currentItem.options[currentItem.answer.charCodeAt(0) - 97]}`;
    setFeedback({ correct, message });
    setTimeout(next, 1000);
  };

  const handleMissed = () => {
    const message = type === 'reaction'
      ? currentItem.explanation
      : type === 'truefalse'
      ? `Missed. Answer: ${currentItem.answer}`
      : `Missed. Answer: ${currentItem.answer}) ${currentItem.options[currentItem.answer.charCodeAt(0) - 97]}`;
    setFeedback({ correct: false, message });
    setTimeout(next, 1000);
  };

  const next = () => {
    setFeedback(null);
    setTimer(10);
    setAnswer('');
    if (index + 1 >= totalLength) {
      setShowResult(true);
      setConfetti(true);
    } else {
      setIndex(index + 1);
    }
  };

  const saveScore = async () => {
    try {
      await addDoc(collection(db, 'Activity'), {
        username,
        Activity: 'Activity 2',
        Lesson: 'Lesson 2',
        Score: `${score} / ${totalLength}`,
        timestamp: new Date(),
      });
      console.log(`✅ Score saved for '${username}': ${score} / ${totalLength}`);
    } catch (err) {
      console.error('❌ Failed to save score:', err);
    }
  };

  return (
    <div className={`min-h-screen bg-[#02010a] text-white px-4 py-10 font-sans fade-in`}>
      <audio ref={audioRef} src={Victorysfx} preload="auto" />
      {confetti && <Confetti />}
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 text-center mb-8 animate-pulse">
        Activity 2: Name That Reaction Type
      </h1>

      <div className="bg-white/5 border border-cyan-300 p-4 rounded-lg max-w-2xl mx-auto text-sm sm:text-base text-cyan-100 mb-6">
        <p className="font-semibold mb-1 text-cyan-300">📘 Instructions:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Scenarios: Identify the correct reaction type based on the emoji clue.</li>
          <li>True/False: Type “True” or “False” in the input box.</li>
          <li>Multiple Choice: Select the correct answer button.</li>
          <li>Each question has a 10-second timer. Good luck!</li>
        </ul>
      </div>

      {!showResult && (
        <div className="max-w-2xl mx-auto text-center fade-in">
          <p className="text-lg font-bold text-yellow-400 mb-4">⏱ Time Left: {timer}s</p>

          {type === 'reaction' && (
            <div className="bg-white/10 p-6 rounded-xl border border-cyan-300 mb-6">
              <div className="text-6xl mb-2">{currentItem.emoji}</div>
              <p className="text-xl mb-4">{currentItem.label}</p>
              <div className="flex flex-wrap justify-center gap-4">
                {typeOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleReaction(opt)}
                    className="bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-1 rounded-full"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {type === 'truefalse' && (
            <div className="bg-white/10 p-6 rounded-xl border border-cyan-300 mb-6">
              <p className="text-lg mb-3">{currentItem.id}. {currentItem.question}</p>
              <input
                className="w-full px-4 py-2 rounded bg-white/10 border border-cyan-300 text-white mb-3"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={feedback !== null}
              />
              <button
                onClick={handleSubmit}
                disabled={feedback !== null}
                className="bg-green-400 hover:bg-green-300 text-black px-6 py-2 rounded-full"
              >
                Submit
              </button>
            </div>
          )}

          {type === 'mcq' && (
            <div className="bg-white/10 p-6 rounded-xl border border-cyan-300 mb-6 text-left">
              <p className="text-lg mb-3">{currentItem.id}. {currentItem.question}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentItem.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => { if (!feedback) setAnswer(String.fromCharCode(97 + i)); }}
                    disabled={feedback !== null}
                    className={`px-4 py-2 rounded-full border ${answer === String.fromCharCode(97 + i) ? 'bg-cyan-400 text-black' : 'bg-white/5 text-white'}`}
                  >
                    {String.fromCharCode(97 + i)}) {opt}
                  </button>
                ))}
              </div>
              <button
                onClick={handleSubmit}
                disabled={feedback !== null}
                className="mt-4 bg-green-400 hover:bg-green-300 text-black px-6 py-2 rounded-full"
              >
                Submit
              </button>
            </div>
          )}

          {feedback && (
            <div className={`mt-2 font-semibold text-sm ${feedback.correct ? 'text-green-400' : 'text-red-400'}`}>
              {feedback.correct ? '✅ Correct!' : '❌ Incorrect.'} {feedback.message}
            </div>
          )}
        </div>
      )}

      {showResult && (
        <div className="text-center mt-12 fade-in">
          <h2 className="text-3xl font-bold text-green-400 mb-4">
            🎉 You scored {score} out of {totalLength}!
          </h2>
          <button
            onClick={() => window.location.href = '/lesson/2'}
            className="bg-cyan-400 hover:bg-cyan-300 text-black px-6 py-2 rounded-full"
          >
            ← Back to Lesson
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityTwo;
