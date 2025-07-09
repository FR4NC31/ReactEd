import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageOne from './components/page1';
import PageTwo from './components/page2';
import PageThree from './components/page3';
import PageFour from './components/page4';
import PageFive from './components/page5';

const Lesson2And3 = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const renderPage = () => {
    switch (currentPage) {
      case 1: return <PageOne />;
      case 2: return <PageTwo />;
      case 3: return <PageThree />;
      case 4: return <PageFour />;
      case 5: return <PageFive />;
      default: return <PageOne />;
    }
  };

  return (
    <div className="min-h-screen bg-[#02010a] text-white font-sans">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-3xl sm:text-5xl font-bold text-cyan-300 mb-10 text-center text-shadow-glow">
          Lesson 2: Identifying Common Acids, Bases, and Salts Using Indicators
        </h1>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>

        {/* Page Navigation Buttons */}
        <div className="flex justify-center gap-4 my-10">
          {[1, 2, 3, 4, 5].map((p) => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-4 py-2 rounded border border-cyan-300 ${
                currentPage === p ? 'bg-cyan-300 text-black' : 'text-cyan-300'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => (window.location.href = '/lesson')}
            className="bg-cyan-400 text-black px-6 py-2 rounded-full"
          >
            ← Back
          </button>
          <button
            onClick={() => (window.location.href = '/activity/2')}
            className="bg-green-400 text-black px-6 py-2 rounded-full"
          >
            ▶ Play Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Lesson2And3;
