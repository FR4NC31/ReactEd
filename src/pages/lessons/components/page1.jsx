import React from 'react';

const page1 = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <p>
          Acids and bases are like the dynamic duo of chemistry! Acids release hydrogen ions (H⁺) in
          water, have a sour taste, a pH below 7, and turn blue litmus paper red. Bases release
          hydroxide ions (OH⁻), have a bitter taste, a pH above 7, and turn red litmus paper blue.
          Both react to form salts and water in neutralisation reactions.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl flex-1">
          <h2 className="text-cyan-300 text-xl font-bold mb-2">Properties of Acids</h2>
          <ul className="list-disc pl-6">
            <li>Taste sour and change blue litmus paper to red.</li>
            <li>Highly reactive with metals and release hydrogen gas.</li>
            <li>Common acids: HCl, H₂SO₄, CH₃COOH.</li>
          </ul>
        </div>
        <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl flex-1">
          <h2 className="text-cyan-300 text-xl font-bold mb-2">Properties of Bases</h2>
          <ul className="list-disc pl-6">
            <li>Taste bitter and feel slippery.</li>
            <li>Change red litmus paper to blue.</li>
            <li>Examples: NaOH, Ca(OH)₂, NH₃.</li>
          </ul>
        </div>
      </div>

      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">What are Salts and How are They Formed?</h2>
        <p>Salts are ionic compounds composed of positive ions (cations) from a base
          and negative ions (anions) from an acid. The formation of salts occurs
          through the neutralisation reaction between an acid and a base.</p>
      </div>

      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-4 text-center">Difference Between Acids, Bases, and Salts</h2>
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
      </div>
    </div>
  );
};

export default page1;
