import React, { useState } from 'react';
import { FiPlay, FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Lesson1 from '../assets/Lesson1.png';
import Lesson2 from '../assets/Lesson2.png';

const lessons = [
  {
    id: 1,
    image: Lesson1,
    title: 'Exploring Chemical Reactions in Everyday Life',
    score: 'NaN', // ← Temporary score
  },
  {
    id: 2,
    image: Lesson2,
    title: 'Identifying Common Acids, Bases, and Salts Using Indicators',
    score: 'NaN', // ← Temporary score
  },
];

const Lesson = () => {
  const navigate = useNavigate();
  const [activeLesson, setActiveLesson] = useState(null);

  const handleCardClick = (id) => {
    setActiveLesson(id);
    setTimeout(() => {
      navigate(`/lesson/${id}`);
    }, 500); // delay for zoom animation
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-6 relative bg-[#02010a] text-white font-sans overflow-hidden">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition z-10"
      >
        <FiArrowLeft size={20} />
        <span className="text-base">Back</span>
      </button>

      {/* Header */}
      <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-10 animate-pulse tracking-widest text-shadow-glow z-10">
        ReactEd: Lessons
      </h1>

      {/* Lesson Cards */}
      <div className="grid sm:grid-cols-2 gap-8 w-full max-w-5xl z-10">
        {lessons.map((lesson) => (
          <motion.div
            key={lesson.id}
            layoutId={`card-${lesson.id}`}
            whileHover={{ scale: activeLesson ? 1 : 1.03 }}
            animate={
              activeLesson
                ? activeLesson === lesson.id
                  ? { scale: 1.1, zIndex: 20 } // zoom in
                  : { scale: 0.9, opacity: 0.3, zIndex: 0 } // zoom out others
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.5 }}
            onClick={() => handleCardClick(lesson.id)}
            className="w-full max-w-md aspect-[4/3] overflow-hidden transform origin-center bg-[rgba(2,1,10,0.8)] border border-cyan-400/20 backdrop-blur-lg p-6 rounded-lg hover:shadow-[0_0_15px_rgba(0,255,255,0.3)] cursor-pointer"
          >
            <div className="w-full h-full relative">
              <img
                src={lesson.image}
                alt={`Lesson ${lesson.id}`}
                className="absolute inset-0 w-full h-full object-cover rounded-md"
              />
              <div className="absolute inset-0 bg-black/40 rounded-md flex flex-col justify-end p-4">
                <h2 className="text-lg text-cyan-200 font-semibold text-center px-2">
                  {lesson.title}
                </h2>
                {/* 👇 Score Display */}
                <p className="text-sm text-cyan-100 text-center mt-1">
                  Score: {lesson.score}
                </p>
                <div className="flex justify-end mt-2">
                  <div className="bg-green-400 hover:bg-green-300 text-black w-10 h-10 mt-10 flex items-center justify-center rounded-full">
                    <FiPlay size={20} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Optional AnimatePresence if needed */}
      <AnimatePresence>
        {activeLesson && (
          <motion.div
            layoutId={`card-${activeLesson}`}
            className="fixed top-0 left-0 w-full h-full bg-[#02010a] z-40 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lesson;
