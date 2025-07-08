import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlay } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ImageInteraction from '../../assets/image_interaction1.png';
import MiniActivity from '../components/miniActiivity1';

const Lesson1 = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [showMiniActivity, setShowMiniActivity] = useState(false);
  const [miniActivityCompleted, setMiniActivityCompleted] = useState(false);

  const explanations = {
    gas: {
      emoji: '💨',
      title: 'Gas Formation',
      text: `When a chemical reaction produces gas, you often see bubbles forming or hear a fizzing sound...`,
    },
    energy: {
      emoji: '🔥',
      title: 'Energy Change (Light or Heat)',
      text: `Chemical reactions can release or absorb energy...`,
    },
    color: {
      emoji: '🌈',
      title: 'Color Change',
      text: `When a new substance forms, its color might differ...`,
    },
    precipitate: {
      emoji: '⚗️',
      title: 'Precipitate Formation',
      text: `A precipitate is a solid that forms when two clear solutions...`,
    },
  };

  const handleNavigate = (path) => {
    setIsExiting(true);
    setTimeout(() => navigate(path), 400);
  };

  const handleMiniActivityDone = () => {
    setMiniActivityCompleted(true);
    setShowMiniActivity(false);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="min-h-screen px-6 py-10 flex flex-col items-center bg-[#02010a] text-white font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-8 animate-pulse tracking-widest glow">
            Lesson 1: Exploring Chemical Reactions
          </h1>

          {/* Definition Card */}
          <div className="card max-w-4xl w-full p-6 rounded-lg mb-8">
            <h2 className="text-2xl text-cyan-300 font-semibold mb-4">What is a Chemical Reaction?</h2>
            <p className="text-cyan-100 mb-4">
              A chemical reaction is a process in which one or more substances (reactants) are converted into new substances...
            </p>
            <button
              onClick={() => setShowMiniActivity(true)}
              className="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-black rounded-full font-semibold disabled:opacity-50"
              disabled={miniActivityCompleted}
            >
              🎯 Mini Activity
            </button>
          </div>

          {/* Interactive Image */}
          <div className="card max-w-4xl w-full p-6 rounded-lg mb-8">
            <h2 className="text-2xl text-cyan-300 font-semibold mb-4">The Signs of Chemical Reactions</h2>
            <div className="relative w-full">
              <img src={ImageInteraction} alt="Indicators" className="rounded w-full mb-4" />
              <button onClick={() => setPopup(explanations.gas)} className="absolute top-[20%] left-[30%] w-6 h-6 bg-cyan-400 rounded-full opacity-80 hover:scale-110 transition" />
              <button onClick={() => setPopup(explanations.energy)} className="absolute top-[25%] left-[78%] w-6 h-6 bg-cyan-400 rounded-full opacity-80 hover:scale-110 transition" />
              <button onClick={() => setPopup(explanations.color)} className="absolute top-[73%] left-[26%] w-6 h-6 bg-cyan-400 rounded-full opacity-80 hover:scale-110 transition" />
              <button onClick={() => setPopup(explanations.precipitate)} className="absolute top-[70%] left-[60%] w-6 h-6 bg-cyan-400 rounded-full opacity-80 hover:scale-110 transition" />
            </div>
          </div>

          {/* Popup */}
          {popup && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-[#02010a] text-white max-w-lg p-6 rounded-lg border border-cyan-400">
                <h3 className="text-xl text-cyan-300 font-semibold mb-2">{popup.emoji} {popup.title}</h3>
                <pre className="text-cyan-100 whitespace-pre-wrap mb-4">{popup.text}</pre>
                <button onClick={() => setPopup(null)} className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-full">
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between max-w-4xl w-full mt-4 px-6">
            <button
              onClick={() => handleNavigate('/lesson')}
              className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-2 rounded-full flex items-center gap-2"
            >
              <FiArrowLeft className="h-5 w-5" />
              Back
            </button>
            <button
              onClick={() => handleNavigate('/activity/1')}
              className="bg-green-400 hover:bg-green-300 text-black px-6 py-2 rounded-full flex items-center gap-2"
            >
              Play Activity
              <FiPlay className="h-5 w-5" />
            </button>
          </div>

          {/* Mini Activity Modal */}
          {showMiniActivity && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
              <div className="bg-[#02010a] max-w-4xl w-full mx-4 rounded-xl p-6 border border-cyan-400 overflow-y-auto max-h-[90vh]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-cyan-300">🎯 Mini Activity: Signs of Chemical Reactions</h2>
                  <button
                    onClick={handleMiniActivityDone}
                    className="text-red-400 hover:text-red-300 text-lg font-semibold"
                  >
                    ✖ Close
                  </button>
                </div>
                <MiniActivity />
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lesson1;
