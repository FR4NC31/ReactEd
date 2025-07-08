import React from 'react';
import ChemReact from '../../../assets/chemreact.png';

const PageFour = () => {
  return (
    <div className="space-y-8">
      {/* Section: How Scientists Represent Chemical Reactions */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">How Scientists Represent Chemical Reactions</h2>
        <p className="text-white mb-4">
          Recall: A chemical reaction is a process in which the chemical structure of a substance changes, 
          leading to the formation of a new substance with different properties. In other words, the reactants 
          convert into products through the breaking and formation of chemical bonds.
        </p>
        {/* Image Placeholder */}
        <img src={ChemReact} className="w-full h-128 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 mb-4" />
      </div>

      {/* Section: Describing Chemical Reactions Using Chemical Equations */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Describing Chemical Reactions Using Chemical Equations</h2>
        <p className="mb-4">
          A chemical equation is a symbolic representation of a chemical reaction. Reactants are written on 
          the left-hand side, and products on the right, separated by an arrow indicating the direction of 
          the reaction.
        </p>
        <p className="mb-4">
          Combinations of coefficients, element symbols, subscripts, and superscripts indicate the chemical 
          formulas of the reactants and products and their quantities. For each chemical formula, the cation 
          (positive-charged part) is listed before the anion (negative-charged part). For example, write NaCl 
          for sodium chloride rather than ClNa.
        </p>
        <p>
          A balanced chemical equation follows the conservation of mass and charge. There are exactly the 
          same number of atoms of each element on both sides of the equation, and the total electrical charge 
          is conserved.
        </p>
      </div>

      {/* Section: Examples of Reactions */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl space-y-2">
        <h2 className="text-xl font-bold text-cyan-300 mb-2">Examples of Chemical Reactions</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Formation of Water:</strong> 2H₂ + O₂ → 2H₂O</li>
          <li><strong>Combustion of Methane:</strong> CH₄ + 2O₂ → CO₂ + 2H₂O</li>
          <li><strong>Decomposition of Calcium Carbonate:</strong> CaCO₃ → CaO + CO₂</li>
        </ul>

        {/* Reaction Part Table */}
        <table className="w-full mt-6 border-collapse text-sm border border-cyan-400/30">
          <thead>
            <tr className="bg-cyan-900 text-cyan-300">
              <th className="p-2 border border-cyan-400/30">Part</th>
              <th className="p-2 border border-cyan-400/30">Description</th>
              <th className="p-2 border border-cyan-400/30">Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-cyan-400/30">Reactants</td>
              <td className="p-2 border border-cyan-400/30">Substances you start with</td>
              <td className="p-2 border border-cyan-400/30">CH₄ (methane), O₂ (oxygen)</td>
            </tr>
            <tr>
              <td className="p-2 border border-cyan-400/30">Products</td>
              <td className="p-2 border border-cyan-400/30">New substances formed</td>
              <td className="p-2 border border-cyan-400/30">CO₂ (carbon dioxide), H₂O (water)</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-4 text-sm text-cyan-200">Note: Palagay nalang po sa table</p>
      </div>

      {/* Section: How to Recognize a Chemical Reaction */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">How to Recognize a Chemical Reaction?</h2>
        <p className="mb-4">
          Not all changes involving matter are chemical reactions. A chemical reaction is a chemical change, 
          which means the starting materials are chemically different from the ending materials. In contrast, 
          matter also changes form via physical changes. But in a physical change, the chemical identity of 
          matter does not change.
        </p>
        <div className="mt-6">
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/npyvZSBqyc0?si=_98kxOHBiWrP0_h0"
            title="How to Recognize a Chemical Reaction"
            frameBorder="0"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default PageFour;
