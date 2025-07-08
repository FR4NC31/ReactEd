import React from 'react';

import Carbonates from '../../../assets/carbonates.png';
import Fire from '../../../assets/fire.png';
import Girl from '../../../assets/girl.png';
import Pipe from '../../../assets/pipe.png';
import Forest from '../../../assets/forest.png';

const PageThree = () => {
  return (
    <div className="space-y-6">
      {/* Intro */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-2xl font-bold mb-4">
          Chemical Reactions and Their Impact on Our World
        </h2>
        <p>Chemical reactions are not just laboratory processes — they happen around us every day! Understanding them helps us protect the environment, design better buildings, grow healthy crops, and even breathe.</p>
      </div>

      {/* Combustion Reaction */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">1. Combustion Reaction</h2>
        <p>Combustion is a chemical reaction where a substance reacts with oxygen, releasing energy, usually in the form of heat and light.</p>
        <p className="text-cyan-200">CH₄ + 2O₂ → CO₂ + 2H₂O + energy</p>
        <p><strong>Natural Environment:</strong> Excessive combustion from cars and factories produces CO₂ and other pollutants that contribute to climate change and acid rain.</p>
        <p><strong>Built Environment:</strong> Used in engines, power plants, and heating systems — but needs to be controlled to reduce fire hazards and pollution.</p>
        <img src={Fire} className='w-full h-120' />
      </div>

      {/* Acids Reacting with Metals */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">2. Acids Reacting with Metals</h2>
        <p>When acids come into contact with reactive metals like iron, zinc, or magnesium, they produce a salt and hydrogen gas.</p>
        <p className="text-cyan-200">Mg + 2HCl → MgCl₂ + H₂</p>
        <p><strong>Natural Environment:</strong> Acid rain corrodes metal structures, bridges, and historical monuments.</p>
        <p><strong>Built Environment:</strong> Plumbing and metal tools degrade when exposed to acids, increasing maintenance costs.</p>
         <img src={Pipe} className='w-full h-120' />
      </div>

      {/* Acids Reacting with Carbonates */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">3. Acids Reacting with Carbonates</h2>
        <p>Acids also react with carbonates to release CO₂ gas.</p>
        <p className="text-cyan-200">CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O</p>
        <p><strong>Natural Environment:</strong> Acids erode limestone and marble rocks, altering landscapes.</p>
        <p><strong>Built Environment:</strong> Acid rain damages carbonate-rich buildings and statues.</p>
         <img src={Carbonates} className='w-full h-120' />
      </div>

      {/* Photosynthesis */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">4. Photosynthesis</h2>
        <p>Plants convert CO₂ and water into glucose and oxygen using sunlight.</p>
        <p className="text-cyan-200">6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂</p>
        <p><strong>Natural Environment:</strong> Supports all life by producing oxygen and removing carbon dioxide — essential for climate balance.</p>
        <p><strong>Built Environment:</strong> Urban reforestation and green designs help cool cities and purify air.</p>
         <img src={Girl} className='w-full h-120' />
      </div>
    </div>
  );
};

export default PageThree;
