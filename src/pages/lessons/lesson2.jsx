import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Lesson2 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-[#02010a] text-white font-sans overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-10">
        <motion.h1
          className="text-3xl sm:text-5xl font-bold text-cyan-300 mb-10 text-center text-shadow-glow"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Lesson 2: Identifying Common Acids, Bases, and Salts Using Indicators
        </motion.h1>

        {/* Lesson Content */}
        <div className="space-y-6 text-white/90 text-lg">
          <motion.div
            className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <p>
              Acids and bases are like the dynamic duo of chemistry! Acids release hydrogen ions (H⁺) in
              water, have a sour taste, a pH below 7, and turn blue litmus paper red. Bases release
              hydroxide ions (OH⁻), have a bitter taste, a pH above 7, and turn red litmus paper blue.
              Both react to form salts and water in neutralisation reactions.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            {[
              {
                title: 'Properties of Acids',
                points: [
                  'Taste sour and change blue litmus paper to red.',
                  'Highly reactive with metals and release hydrogen gas.',
                  'Common acids: HCl, H₂SO₄, CH₃COOH.'
                ]
              },
              {
                title: 'Properties of Bases',
                points: [
                  'Taste bitter and feel slippery.',
                  'Change red litmus paper to blue.',
                  'Examples: NaOH, Ca(OH)₂, NH₃.'
                ]
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl flex-1"
                whileHover={{ scale: 1.03 }}
                initial="hidden"
                animate="visible"
                variants={fadeInUp}
              >
                <h2 className="text-cyan-300 text-xl font-bold mb-2">{card.title}</h2>
                <ul className="list-disc pl-6">
                  {card.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="text-cyan-300 text-xl font-bold mb-2">What are Salts and How are They Formed?</h2>
            <p>
              Salts are ionic compounds composed of positive ions (cations) from a base and negative ions (anions) from an acid. The formation of salts occurs through the neutralisation reaction between an acid and a base.
            </p>
          </motion.div>

          <motion.div
            className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <h2 className="text-cyan-300 text-xl font-bold mb-4 text-center">
              Difference Between Acids, Bases, and Salts
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-cyan-300">
                    <th className="border border-cyan-300 px-4 py-2">Property</th>
                    <th className="border border-cyan-300 px-4 py-2">Acids</th>
                    <th className="border border-cyan-300 px-4 py-2">Bases</th>
                    <th className="border border-cyan-300 px-4 py-2">Salts</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border px-4 py-2">Definition</td><td className="border px-4 py-2">Release H⁺ ions</td><td className="border px-4 py-2">Release OH⁻ ions</td><td className="border px-4 py-2">Formed from acid + base</td></tr>
                  <tr><td className="border px-4 py-2">Taste</td><td className="border px-4 py-2">Sour</td><td className="border px-4 py-2">Bitter</td><td className="border px-4 py-2">Varies</td></tr>
                  <tr><td className="border px-4 py-2">Litmus Test</td><td className="border px-4 py-2">Turns blue litmus red</td><td className="border px-4 py-2">Turns red litmus blue</td><td className="border px-4 py-2">No effect</td></tr>
                  <tr><td className="border px-4 py-2">pH Range</td><td className="border px-4 py-2">Less than 7</td><td className="border px-4 py-2">Greater than 7</td><td className="border px-4 py-2">Around 7</td></tr>
                  <tr><td className="border px-4 py-2">Reaction with Metals</td><td className="border px-4 py-2">Produces H₂ gas</td><td className="border px-4 py-2">Usually no reaction</td><td className="border px-4 py-2">No direct reaction</td></tr>
                  <tr><td className="border px-4 py-2">Examples</td><td className="border px-4 py-2">HCl, H₂SO₄, CH₃COOH</td><td className="border px-4 py-2">NaOH, KOH, NH₄OH</td><td className="border px-4 py-2">NaCl, KNO₃, CaCO₃</td></tr>
                </tbody>
              </table>

              <div className="mt-4 text-center">
                <iframe
                  width="1050"
                  height="315"
                  src="https://www.youtube.com/embed/mnbS56HQbaU?si=J13QMDdAg_bnONM_"
                  title="Watch Explanation"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="mx-auto rounded-lg"
                ></iframe>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          className="flex justify-between mt-14"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
        >
          <button
            onClick={() => navigate('/lesson')}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
          >
            ← Back
          </button>
          <button
            onClick={() => navigate('/activity/2')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition shadow-md"
          >
            ▶️ Play Activity
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Lesson2;
