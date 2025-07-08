import React from 'react';

import LawMass from '../../../assets/lawmass.png';

const PageFive = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-2xl text-cyan-300 font-bold mb-4">
          The Law of Conservation of Mass in Chemical Reactions
        </h2>
        <p>
          <strong>Recall:</strong> In every chemical reaction, atoms rearrange to form new
          substances. However, no atoms are created or destroyed in the process.
          <br />
          <strong>Trivia:</strong> Chemical equations show how atoms rearrange, not vanish!
        </p>
        <p>
          The Law of Conservation of Mass is a fundamental concept in chemistry,
          stating that mass in an isolated system is neither created nor destroyed by
          chemical reactions or physical transformations. According to the law, the mass of
          the reactants in a chemical reaction equals the mass of the products. Further, the
          number and type of atoms in a chemical reaction is the same before and after the
          reaction.
        </p>
        <div className="my-4 text-center">
            <img src={LawMass} className="w-full h-134 bg-cyan-100/10 border border-cyan-300 rounded-lg flex items-center justify-center"/>
        </div>
      </div>

      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h3 className="text-xl text-cyan-300 font-semibold mb-2">Examples in Chemical Reactions</h3>
        <p>
          Chemical reactions clearly illustrate the Law of Conservation of Mass.
          Chemists apply the law in balancing chemical equations.
        </p>
        <ul className="list-disc pl-6">
          <li>
            <strong>Combustion:</strong> In a simple combustion reaction like burning methane:
            <br />CH₄ + 2O₂ → CO₂ + 2H₂O (4 H, 1 C, 4 O atoms on each side)
          </li>
          <li>
            <strong>Synthesis:</strong> Hydrogen and oxygen gases react to form water:
            <br />2H₂ + O₂ → 2H₂O (4 H and 2 O atoms on both sides)
          </li>
        </ul>
      </div>

      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h3 className="text-xl text-cyan-300 font-semibold mb-2">Examples in Organisms</h3>
        <p>
          In biological systems, the law applies to metabolic processes. For example,
          in photosynthesis, plants convert carbon dioxide and water into glucose
          and oxygen:
          <br />6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂
        </p>
        <p>
          On a larger scale, this applies to the mass of a human body, where total intake
          equals total output (breathing, perspiration, urination, defecation).
        </p>
      </div>

      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h3 className="text-xl text-cyan-300 font-semibold mb-2">Examples in Ecosystems</h3>
        <p>
          In ecosystems, the law is evident in nutrient cycles like the carbon cycle.
          Carbon atoms move through the atmosphere, hydrosphere, lithosphere, and
          biosphere. Photosynthesis fixes carbon from the air into glucose molecules,
          conserving mass throughout the process.
        </p>
      </div>
    </div>
  );
};

export default PageFive;
