import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import ParticleBackground from '../components/ParticleBackground';
import LawMass from '../../assets/lawmass.png';
import clickSfx from '../../assets/click.mp3';

const fadeVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const FadeInSection = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeVariant}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl backdrop-blur"
    >
      {children}
    </motion.div>
  );
};

const PageFive = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);
  const clickAudio = new Audio(clickSfx);

  const handleNavigate = (path) => {
    clickAudio.play();
    setIsExiting(true);
    setTimeout(() => navigate(path), 400);
  };

  const handlePlayActivity = () => {
    clickAudio.play();
    setIsExiting(true);
    setTimeout(() => navigate('/activity/5'), 400);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="min-h-screen relative bg-[#02010a] text-white px-6 py-10 font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <ParticleBackground />

          <div className="max-w-5xl mx-auto space-y-8 relative z-10">
            <h1 className="text-4xl sm:text-5xl font-bold text-cyan-300 text-center mb-6 animate-pulse">
              ⚖️ The Law of Conservation of Mass
            </h1>

            <FadeInSection>
              <h2 className="text-2xl text-cyan-300 font-bold mb-4">
                The Law in Chemical Reactions
              </h2>
              <p className="text-cyan-100 mb-3">
                <strong>Recall:</strong> In every chemical reaction, atoms rearrange to form new substances.
                However, no atoms are created or destroyed in the process.
                <br />
                <strong>Trivia:</strong> Chemical equations show how atoms rearrange, not vanish!
              </p>
              <p className="text-cyan-100">
                This law states that mass in an isolated system is neither created nor destroyed.
                The mass of the reactants equals the mass of the products. The number and type
                of atoms before and after the reaction stay the same.
              </p>
              <div className="my-6 text-center">
                <img
                  src={LawMass}
                  alt="Law of Mass"
                  className="w-full max-h-[420px] object-contain rounded-lg border border-cyan-400/30 bg-cyan-100/10 shadow-md"
                />
              </div>
            </FadeInSection>

            <FadeInSection>
              <h3 className="text-xl text-cyan-300 font-semibold mb-3">Examples in Chemical Reactions</h3>
              <p className="text-cyan-100 mb-3">
                Chemical reactions clearly illustrate the law. Chemists use it when balancing equations.
              </p>
              <ul className="list-disc pl-6 text-cyan-100 space-y-2">
                <li>
                  <strong>Combustion:</strong> Burning methane:
                  <br />
                  CH₄ + 2O₂ → CO₂ + 2H₂O
                  <br />
                  (4 H, 1 C, 4 O atoms on each side)
                </li>
                <li>
                  <strong>Synthesis:</strong> Hydrogen and oxygen forming water:
                  <br />
                  2H₂ + O₂ → 2H₂O
                  <br />
                  (4 H and 2 O atoms on both sides)
                </li>
              </ul>
            </FadeInSection>

            <FadeInSection>
              <h3 className="text-xl text-cyan-300 font-semibold mb-3">Examples in Organisms</h3>
              <p className="text-cyan-100 mb-2">
                In metabolic processes like photosynthesis:
              </p>
              <p className="text-cyan-100 mb-4">
                6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂
              </p>
              <p className="text-cyan-100">
                In the human body, the total intake (food, water) equals total output
                (exhalation, sweat, waste), demonstrating conservation of mass.
              </p>
            </FadeInSection>

            <FadeInSection>
              <h3 className="text-xl text-cyan-300 font-semibold mb-3">Examples in Ecosystems</h3>
              <p className="text-cyan-100">
                In the carbon cycle, carbon atoms move through the atmosphere,
                water, rocks, and living things. Photosynthesis captures carbon into
                plant molecules without losing mass.
              </p>
            </FadeInSection>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
              <button
                onClick={() => handleNavigate('/lesson')}
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
              >
                <FiArrowLeft size={18} />
                Back
              </button>

              <button
                onClick={handlePlayActivity}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition shadow-md"
              >
                ▶️ Play Activity
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageFive;
