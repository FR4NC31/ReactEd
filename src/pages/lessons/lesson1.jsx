// src/pages/Lesson1.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiPlay } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';
import ImageInteraction from '../../assets/image_interaction1.png';

const Lesson1 = () => {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);
  const [isExiting, setIsExiting] = useState(false);

  const explanations = {
    gas: {
      emoji: '💨',
      title: 'Gas Formation',
      text: 'When a chemical reaction produces gas, you might see bubbles or fizzing. This is a key sign a chemical change has occurred!',
    },
    energy: {
      emoji: '🔥',
      title: 'Energy Change',
      text: 'Reactions can release heat (exothermic) or absorb heat (endothermic). You may also see light or feel temperature change.',
    },
    color: {
      emoji: '🌈',
      title: 'Color Change',
      text: 'A permanent color change often means new substances have formed, indicating a chemical reaction.',
    },
    precipitate: {
      emoji: '⚗️',
      title: 'Precipitate Formation',
      text: 'Sometimes two clear liquids form a solid—called a precipitate—when mixed. That’s a chemical reaction!',
    },
  };

  const handleNavigate = (path) => {
    setIsExiting(true);
    setTimeout(() => navigate(path), 400);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="min-h-screen relative bg-[#02010a] text-white flex flex-col items-center px-6 py-10 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ParticleBackground />

          <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-8 tracking-wider text-center animate-pulse z-10">
            Lesson 1: Exploring Chemical Reactions
          </h1>

          {/* Lesson Card */}
          <div className="card max-w-4xl w-full bg-white/5 border border-cyan-400 rounded-lg p-6 mb-8 backdrop-blur z-10">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4">What is a Chemical Reaction?</h2>
            <p className="text-cyan-100 leading-relaxed">
              A chemical reaction is a process where one or more substances (reactants) transform into new substances (products).
              These reactions involve breaking and forming of chemical bonds, and are often accompanied by observable signs.
            </p>
          </div>

          {/* Interactive Hotspot Image */}
          <div className="card max-w-4xl w-full bg-white/5 border border-cyan-400 rounded-lg p-6 mb-8 backdrop-blur z-10">
            <h2 className="text-2xl font-semibold text-cyan-300 mb-4">Signs of Chemical Reactions</h2>
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
              <img src={ImageInteraction} alt="Chemical Reaction Indicators" className="w-full rounded-lg" />

              {/* Glowing Hotspots */}
              <button
                onClick={() => setPopup(explanations.gas)}
                className="absolute top-[20%] left-[30%] w-6 h-6 bg-cyan-300 rounded-full glow hover:scale-110 transition duration-200"
              />
              <button
                onClick={() => setPopup(explanations.energy)}
                className="absolute top-[25%] left-[78%] w-6 h-6 bg-cyan-300 rounded-full glow hover:scale-110 transition duration-200"
              />
              <button
                onClick={() => setPopup(explanations.color)}
                className="absolute top-[73%] left-[26%] w-6 h-6 bg-cyan-300 rounded-full glow hover:scale-110 transition duration-200"
              />
              <button
                onClick={() => setPopup(explanations.precipitate)}
                className="absolute top-[70%] left-[60%] w-6 h-6 bg-cyan-300 rounded-full glow hover:scale-110 transition duration-200"
              />
            </div>
          </div>

          {/* Popup Modal */}
          {popup && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4">
              <div className="bg-[#02010a] border border-cyan-400 max-w-md w-full rounded-lg p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-cyan-300 mb-2">
                  {popup.emoji} {popup.title}
                </h3>
                <p className="text-cyan-100 whitespace-pre-wrap mb-4">{popup.text}</p>
                <button
                  onClick={() => setPopup(null)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between max-w-4xl w-full mt-4 z-10">
            <button
              onClick={() => handleNavigate('/lesson')}
              className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
            >
              <FiArrowLeft size={18} />
              Back
            </button>

            <button
              onClick={() => handleNavigate('/activity/1')}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition shadow-md"
            >
              ▶️ Play Activity
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Lesson1;
