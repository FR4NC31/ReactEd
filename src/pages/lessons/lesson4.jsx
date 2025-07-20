import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleBackground from '../components/ParticleBackground';
import PageOne from './components/page1';
import PageTwo from './components/page2';
import useSound from 'use-sound';
import clickSfx from '../../assets/click.mp3';
import { AnimatePresence, motion } from 'framer-motion';

const Lesson4 = () => {
  const [page, setPage] = useState(1);
  const [playClick] = useSound(clickSfx, { volume: 0.5 });
  const navigate = useNavigate();

  const handleSwitch = (num) => {
    if (num !== page) {
      playClick();
      setPage(num);
    }
  };

  const handleBackToLessons = () => {
    playClick();
    navigate('/lesson');
  };

  const handlePlayActivity = () => {
    playClick();
    navigate('/activity/4'); // Activity 4 route
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 px-6 py-10 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-300 mb-6">
          Lesson 4: Chemical Reactions and How They're Written
        </h1>

        {/* Page Toggle Buttons */}
        <div className="flex justify-center mb-6 gap-4">
          {[1, 2].map((num) => (
            <button
              key={num}
              onClick={() => handleSwitch(num)}
              className={`px-4 py-2 rounded-full border border-cyan-400 shadow-md transition duration-300 hover:bg-cyan-600 ${
                page === num ? 'bg-cyan-500 text-white' : 'bg-white/10 text-cyan-200'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* Animated Page Content */}
        <div className="mb-12 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {page === 1 ? <PageOne /> : <PageTwo />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-6">
          <button
            onClick={handleBackToLessons}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full transition shadow-md"
          >
            ⬅ Back
          </button>
          <button
            onClick={handlePlayActivity}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition shadow-md"
          >
            ▶️ Play Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lesson4;
