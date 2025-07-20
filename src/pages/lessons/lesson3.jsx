import React, { useRef } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import { motion } from 'framer-motion';
import clickSfx from '../../assets/click.mp3';

const Lesson3 = () => {
  const clickAudio = useRef(new Audio(clickSfx));

  const handleClick = (url) => {
    clickAudio.current.currentTime = 0;
    clickAudio.current.play().catch(() => {});
    setTimeout(() => {
      window.location.href = url;
    }, 150);
  };

  const toggleSection = (index) => {
    const panel = document.getElementById(`section-${index}`);
    panel.classList.toggle('hidden');
  };

  return (
    <div className="relative min-h-screen bg-[#02010a] text-white px-4 py-10 font-sans overflow-hidden z-10">
      <ParticleBackground />
      <div className="absolute inset-0 bg-gradient-to-br from-[#000000aa] to-[#0a0a1f99] z-0" />
      <audio ref={clickAudio} src={clickSfx} preload="auto" />

      <div className="relative z-10 space-y-10 max-w-5xl mx-auto">
        <div className="text-center">
          <h1 className="text-cyan-300 text-4xl font-bold animate-pulse">
            💡 Lesson 3: Types of Chemical Reactions
          </h1>
          <p className="text-white/80 mt-2">
            Explore different types of chemical reactions, their equations, and examples.
          </p>
        </div>

        {reactionSections.map((section, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="glass-card border border-cyan-400/20 p-6 rounded-2xl shadow-lg backdrop-blur-md transition hover:scale-[1.01]"
          >
            <button
              onClick={() => {
                clickAudio.current.currentTime = 0;
                clickAudio.current.play().catch(() => {});
                toggleSection(i);
              }}
              className="w-full text-left"
            >
              <h2 className="text-cyan-300 text-2xl font-bold mb-3">
                {section.title} ⌄
              </h2>
            </button>

            <div id={`section-${i}`}>
              {section.paragraphs.map((p, index) => (
                <p key={index} className="mb-2">{p}</p>
              ))}
              {section.equations?.map((eq, index) => (
                <p key={index} className="text-cyan-200 font-mono">{eq}</p>
              ))}
              {section.video && (
                <iframe
                  width="100%"
                  height="315"
                  src={section.video}
                  title={section.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl mt-4 border border-cyan-400/10"
                ></iframe>
              )}
            </div>
          </motion.div>
        ))}

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-between gap-6 pt-8">
          <button
            onClick={() => handleClick('/lesson')}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full flex items-center gap-2"
          >
            ← Back
          </button>

          <button
            onClick={() => handleClick('/activity/3')}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition shadow-md"
          >
            ▶️ Play Activity
          </button>
        </div>
      </div>
    </div>
  );
};

const reactionSections = [
  {
    title: 'Synthesis Reaction',
    paragraphs: [
      'Synthesis reactions occur when two reactants combine to form a single new product.',
      'They are usually exothermic. Example: salt formation.',
    ],
    equations: ['A + B → AB', 'Na⁺ + Cl⁻ → NaCl'],
  },
  {
    title: 'Decomposition Reaction',
    paragraphs: [
      'Decomposition involves breaking one reactant into simpler products.',
      'These reactions are endothermic. Example: hydrogen peroxide breakdown.',
    ],
    equations: ['AB → A + B', '2H₂O₂ → 2H₂O + O₂'],
    video: 'https://www.youtube.com/embed/nGR9zo1oZlw',
  },
  {
    title: 'Single Replacement Reaction',
    paragraphs: [
      'One element replaces another in a compound.',
      'Example: Zinc replaces Tin in Tin chloride.',
    ],
    equations: ['AB + C → AC + B', 'SnCl₂ + Zn → ZnCl₂ + Sn'],
    video: 'https://www.youtube.com/embed/BjBWzd04Qzo',
  },
  {
    title: 'Double Replacement Reaction',
    paragraphs: [
      'Two compounds exchange ions to form two new compounds.',
      'Characterized by gas, precipitate, or molecular compound formation.',
    ],
    equations: [
      'AB + CD → AC + BD',
      'Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃',
      'KCl + AgNO₃ → KNO₃ + AgCl',
    ],
  },
  {
    title: 'Precipitation Reaction',
    paragraphs: [
      'A solid (precipitate) forms when two soluble compounds react.',
      'Example: AgNO₃ + KCl → AgCl (white solid)',
    ],
    equations: ['AgNO₃(aq) + KCl(aq) → AgCl(s) + KNO₃(aq)'],
    video: 'https://www.youtube.com/embed/NNGETOShppM',
  },
  {
    title: 'Acid-Base Reaction',
    paragraphs: [
      'Neutralization between acid and base producing salt + water.',
      'Common in daily life and labs.',
    ],
    equations: ['HCl + NaOH → NaCl + H₂O'],
  },
  {
    title: 'Combustion Reaction',
    paragraphs: [
      'Burning reaction with oxygen producing CO₂ and H₂O.',
      'Highly exothermic. Fuels undergo this reaction.',
    ],
    equations: ['2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O'],
    video: 'https://www.youtube.com/embed/dx1Nk38SUr0',
  },
];

export default Lesson3;
