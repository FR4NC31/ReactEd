import React, { useState } from 'react';
import ChemReact from '../../../assets/chemreact.png';

const PageFour = () => {
  const [highlightedRow, setHighlightedRow] = useState(null);

  const handleRowClick = (index) => {
    setHighlightedRow(index === highlightedRow ? null : index);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Section: How Scientists Represent Chemical Reactions */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.01]">
        <h2 className="text-2xl font-bold text-cyan-300 mb-4">How Scientists Represent Chemical Reactions</h2>
        <p className="text-white mb-4">
          A chemical reaction is a process where substances change into new ones with different properties.
          Reactants convert into products through the breaking and formation of chemical bonds.
        </p>
        <img
          src={ChemReact}
          alt="Chemical Reaction Diagram"
          className="w-full max-h-[400px] object-contain bg-gray-800 rounded-lg mb-4 border border-cyan-400/20"
        />
      </div>

      {/* Section: Describing Chemical Reactions */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.01]">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Describing Chemical Reactions Using Chemical Equations</h2>
        <p className="text-white mb-2">
          A chemical equation uses symbols to represent a reaction. Reactants (left side) become products (right side), separated by an arrow.
        </p>
        <p className="text-white mb-2">
          Coefficients, element symbols, and subscripts indicate the amounts and identities of substances involved.
          The cation always comes first, such as NaCl instead of ClNa.
        </p>
        <p className="text-white">
          Balanced chemical equations obey the law of conservation of mass and charge: same number of atoms and charges on both sides.
        </p>
      </div>

      {/* Section: Examples of Reactions */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.01]">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Examples of Chemical Reactions</h2>
        <ul className="text-white space-y-2 list-disc list-inside mb-4">
          <li><strong>Formation of Water:</strong> 2H₂ + O₂ → 2H₂O</li>
          <li><strong>Combustion of Methane:</strong> CH₄ + 2O₂ → CO₂ + 2H₂O</li>
          <li><strong>Decomposition of Calcium Carbonate:</strong> CaCO₃ → CaO + CO₂</li>
        </ul>

        {/* Interactive Table */}
        <div className="overflow-x-auto">
          <table className="w-full mt-4 border-collapse text-sm border border-cyan-400/30">
            <thead>
              <tr className="bg-cyan-900 text-cyan-300">
                <th className="p-3 border border-cyan-400/30">Part</th>
                <th className="p-3 border border-cyan-400/30">Description</th>
                <th className="p-3 border border-cyan-400/30">Example</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  part: 'Reactants',
                  description: 'Substances you start with',
                  example: 'CH₄ (methane), O₂ (oxygen)',
                },
                {
                  part: 'Products',
                  description: 'New substances formed',
                  example: 'CO₂ (carbon dioxide), H₂O (water)',
                },
              ].map((row, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(index)}
                  className={`transition-colors duration-300 cursor-pointer ${
                    highlightedRow === index ? 'bg-cyan-800/40' : 'hover:bg-cyan-700/20'
                  }`}
                >
                  <td className="p-3 border border-cyan-400/30 text-white">{row.part}</td>
                  <td className="p-3 border border-cyan-400/30 text-white">{row.description}</td>
                  <td className="p-3 border border-cyan-400/30 text-white">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section: How to Recognize a Chemical Reaction */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl shadow-lg transition-transform hover:scale-[1.01]">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">How to Recognize a Chemical Reaction?</h2>
        <p className="text-white mb-4">
          Not all changes are chemical. Chemical changes result in new substances, while physical changes do not change chemical identity.
        </p>
        <div className="aspect-video mt-6">
          <iframe
            width="100%"
            height="100%"
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
