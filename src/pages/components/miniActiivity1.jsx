import React, { useState } from 'react';

const scenarios = [
  {
    id: 1,
    label: '🥤 Baking Soda + Vinegar',
    reactionType: '💨 Gas Formation',
    explanation: 'Bubbles show gas (CO₂) is being produced from a chemical reaction.'
  },
  {
    id: 2,
    label: '🕯 Exothermic Reaction (Candle)',
    reactionType: '🌡 Temperature Change',
    explanation: 'Combustion releases heat – an exothermic reaction.'
  },
  {
    id: 3,
    label: '🧲 Iron + Oxygen = Rust',
    reactionType: '🌈 Color Change',
    explanation: 'Rusting iron changes from silver to reddish brown.'
  },
  {
    id: 4,
    label: '⚗ Precipitate Formation (Silver Nitrate + NaCl)',
    reactionType: '⚗ Precipitate Formation',
    explanation: 'A new solid forms from two mixed liquids.'
  },
  {
    id: 5,
    label: '👃 Odor Change (Spoiled Eggs)',
    reactionType: '👃 Odor Change',
    explanation: 'Foul smells indicate the release of a new substance (like H₂S gas).'
  },
];

const ActivityMiniSigns = () => {
  const [revealed, setRevealed] = useState([]);

  const handleClick = (id) => {
    if (!revealed.includes(id)) {
      setRevealed([...revealed, id]);
    }
  };

  return (
    <div className="text-white max-w-4xl mx-auto p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-cyan-300 text-center mb-6">
        Signs of a Chemical Reaction
      </h1>
      <p className="text-lg text-center mb-4 text-cyan-100">
        Click on each image below to reveal which sign of a chemical reaction it represents.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {scenarios.map(({ id, label, reactionType, explanation }) => (
          <div
            key={id}
            className="bg-white/10 border border-cyan-400 rounded-lg p-5 text-center cursor-pointer hover:bg-white/20 transition"
            onClick={() => handleClick(id)}
          >
            <div className="text-5xl mb-2">{label.split(' ')[0]}</div>
            <p className="text-lg mb-2">{label.split(' ').slice(1).join(' ')}</p>

            {revealed.includes(id) && (
              <div className="mt-3">
                <p className="text-cyan-300 font-bold text-xl">{reactionType}</p>
                <p className="text-cyan-100 text-sm mt-1">{explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {revealed.length === scenarios.length && (
        <div className="text-center mt-10 animate-bounce">
          <p className="text-green-400 text-xl font-bold">🎉 You revealed all the signs!</p>
        </div>
      )}
    </div>
  );
};

export default ActivityMiniSigns;
