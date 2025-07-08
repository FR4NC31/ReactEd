import React, { useState } from 'react';
import PageOne from './components/page1';
import PageTwo from './components/page2';
import PageThree from './components/page3';
import PageFour from './components/page4';
import PageFive from './components/page5';

const Lesson2And3 = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 text-white font-sans">
      <h1 className="text-3xl sm:text-5xl font-bold text-cyan-300 mb-10 text-center text-shadow-glow">
        Lesson 2: Identifying Common Acids, Bases, and Salts Using Indicators
      </h1>

      {currentPage === 1 && <PageOne />}
      {currentPage === 2 && <PageTwo />}
      {currentPage === 3 && <PageThree />}
      {currentPage === 4 && <PageFour />}
      {currentPage === 5 && <PageFive />}

      {/* Page navigation buttons */}
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
  );
};

export default Lesson2And3;
