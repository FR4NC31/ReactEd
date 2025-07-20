import React, { useState } from 'react';
import Carbonates from '../../../assets/carbonates.png';
import Fire from '../../../assets/fire.png';
import Girl from '../../../assets/girl.png';
import Pipe from '../../../assets/pipe.png';
import useSound from 'use-sound';
import clickSFX from '../../../assets/click.mp3';

const reactions = [
  {
    title: 'Combustion Reaction',
    equation: 'CH₄ + 2O₂ → CO₂ + 2H₂O + energy',
    description: `Combustion is a chemical reaction where a substance reacts with oxygen, releasing energy, usually in the form of heat and light.`,
    environmentImpact: {
      natural: `Excessive combustion from cars and factories produces CO₂ and other pollutants that contribute to climate change and acid rain.`,
      built: `Used in engines, power plants, and heating systems — but needs to be controlled to reduce fire hazards and pollution.`,
    },
    image: Fire,
  },
  {
    title: 'Acids Reacting with Metals',
    equation: 'Mg + 2HCl → MgCl₂ + H₂',
    description: `When acids come into contact with reactive metals like iron, zinc, or magnesium, they produce a salt and hydrogen gas.`,
    environmentImpact: {
      natural: `Acid rain corrodes metal structures, bridges, and historical monuments.`,
      built: `Plumbing and metal tools degrade when exposed to acids, increasing maintenance costs.`,
    },
    image: Pipe,
  },
  {
    title: 'Acids Reacting with Carbonates',
    equation: 'CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O',
    description: `Acids also react with carbonates to release CO₂ gas.`,
    environmentImpact: {
      natural: `Acids erode limestone and marble rocks, altering landscapes.`,
      built: `Acid rain damages carbonate-rich buildings and statues.`,
    },
    image: Carbonates,
  },
  {
    title: 'Photosynthesis',
    equation: '6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂',
    description: `Plants convert CO₂ and water into glucose and oxygen using sunlight.`,
    environmentImpact: {
      natural: `Supports all life by producing oxygen and removing carbon dioxide — essential for climate balance.`,
      built: `Urban reforestation and green designs help cool cities and purify air.`,
    },
    image: Girl,
  },
];

const PageThree = () => {
  const [viewed, setViewed] = useState([]);
  const [playClick] = useSound(clickSFX);

  const handleClick = (index) => {
    playClick();
    if (!viewed.includes(index)) {
      setViewed([...viewed, index]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-cyan-200 font-semibold text-center">
        Reactions Discovered: {viewed.length} / {reactions.length}
      </div>

      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl shadow-lg">
        <h2 className="text-cyan-300 text-2xl font-bold mb-4">
          Chemical Reactions and Their Impact on Our World
        </h2>
        <p>Chemical reactions are not just laboratory processes — they happen around us every day! Understanding them helps us protect the environment, design better buildings, grow healthy crops, and even breathe.</p>
      </div>

      <div className="grid gap-6">
        {reactions.map((reaction, index) => (
          <div
            key={index}
            className={`transition-transform duration-300 transform hover:scale-[1.02] bg-white/5 border border-cyan-400/30 rounded-xl overflow-hidden shadow-xl cursor-pointer group ${
              viewed.includes(index) ? 'ring-2 ring-cyan-300' : ''
            }`}
            onClick={() => handleClick(index)}
          >
            <div className="p-6 space-y-3">
              <h2 className="text-xl text-cyan-300 font-bold">{index + 1}. {reaction.title}</h2>
              <p className="text-cyan-200 font-mono">{reaction.equation}</p>
              <p>{reaction.description}</p>
              <p><strong>Natural Environment:</strong> {reaction.environmentImpact.natural}</p>
              <p><strong>Built Environment:</strong> {reaction.environmentImpact.built}</p>
            </div>
            <img src={reaction.image} alt={reaction.title} className="w-full h-64 sm:h-72 md:h-80 lg:h-96 object-cover rounded-b-xl border-t border-cyan-300/20" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PageThree;
