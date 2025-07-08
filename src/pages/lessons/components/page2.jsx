import React from 'react';
import img1 from '../../../assets/page2img.png';

const PageTwo = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-2xl font-bold mb-4">Types of Chemical Reactions</h2>
        <img src={img1} className='w-full h-120' />
      </div>

      {/* Synthesis Reaction */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">Synthesis Reaction</h2>
        <p>A synthesis reaction occurs when two reactants interact to form one product. The product created is different from both of the reactants. The general equation represents this type of reaction:</p>
        <p className="text-cyan-200">A + B → AB</p>
        <p>In most cases, synthesis reactions release energy. Reactions that release energy are considered exothermic. A typical example of a synthesis reaction is the formation of table salt. Sodium and chlorine ions interact to form sodium chloride.</p>
        <p className="text-cyan-200">Na⁺ + Cl⁻ → NaCl</p>
      </div>

      {/* Decomposition Reaction */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">Decomposition Reaction</h2>
        <p>A decomposition reaction occurs when the reactant breaks down into simpler products. Here is the general equation that represents this type of reaction:</p>
        <p className="text-cyan-200">AB → A + B</p>
        <p>Unlike synthesis reactions, decomposition reactions require energy to break the bonds present in the reactant. Reactions that require an input of energy are endothermic. A common example of a decomposition reaction is the decomposition of hydrogen peroxide. The decomposition of hydrogen peroxide results in water and oxygen gas. This is shown in the following equation:</p>
        <p className="text-cyan-200">2H₂O₂ → 2H₂O + O₂</p>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/nGR9zo1oZlw"
          title="Decomposition Reaction"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg mt-4"
        ></iframe>
      </div>

      {/* Single Replacement */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">Single Replacement Reaction</h2>
        <p>Single replacement reactions, also known as single displacement reactions, occur when one reactant replaces part of the other reactant compound. This produces two new compounds. This type of reaction is represented by the general equation:</p>
        <p className="text-cyan-200">AB + C → AC + B</p>
        <p>In this equation, C replaces B in the reaction, and B is now a single compound. A common example of a single replacement reaction is the reaction of Tin chloride and zinc. In the reaction, zinc replaces tin to form zinc chloride and tin as a single element.</p>
        <p className="text-cyan-200">SnCl₂ + Zn → ZnCl₂ + Sn</p>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/BjBWzd04Qzo"
          title="Single Replacement Reaction"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg mt-4"
        ></iframe>
      </div>

      {/* Double Replacement */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">Double Replacement Reaction</h2>
        <p>A double replacement reaction, aka double displacement reaction, exchanges ionic species in two compounds to form two completely new compounds, with the exchange of ions between the reactants. Double replacement reactions swap cations or the anions, but not both. If both were swapped, no new compounds would be formed! This type of reaction is characterized by the formation of a new precipitate, gas, or molecular compound as one of the products.</p>
        <p className="text-cyan-200">AB + CD → AC + BD</p>
        <p>An example of a double-replacement reaction is the reaction between Lead nitrate and Potassium iodide. The lead cation and potassium cation switch places:</p>
        <p className="text-cyan-200">Pb(NO₃)₂ + 2KI → PbI₂ + 2KNO₃</p>
        <p>Another example: KCl + AgNO₃ → KNO₃ + AgCl</p>
      </div>

      {/* Precipitation */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">Precipitation Reaction</h2>
        <p>Precipitation and neutralization are both double replacement reactions. These reactions both result in two completely new compounds through double replacement. A precipitation reaction occurs when two soluble compounds mix to form an insoluble solid. The solid that separates from the solution is called the precipitant. A classic example of a precipitation reaction is silver nitrate’s reaction with potassium chloride, which forms silver chloride, a white solid.</p>
        <p className="text-cyan-200">AgNO₃(aq) + KCl(aq) → AgCl(s) + KNO₃(aq)</p>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/NNGETOShppM"
          title="Precipitation Reaction"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg mt-4"
        ></iframe>
      </div>

      {/* Acid-Base */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">Acid-Base Reaction</h2>
        <p>Acid base reactions, or neutralization reactions are double displacement reactions that occur between acids and bases. Typically, acid-base neutralizations produce water and a salt. A common example of neutralization is between hydrochloric acid, a strong acid, sodium hydroxide, a strong base.</p>
        <p className="text-cyan-200">HCl + NaOH → NaCl + H₂O</p>
      </div>

      {/* Combustion */}
      <div className="bg-white/5 border border-cyan-400/20 p-6 rounded-xl">
        <h2 className="text-cyan-300 text-xl font-bold mb-2">Combustion Reaction</h2>
        <p>Combustion reactions are those that involve the burning of compounds. A reactant, usually a hydrocarbon, reacts with oxygen gas (O₂), to produce carbon dioxide gas (CO₂) and water vapor (H₂O). Combustion reactions also produce energy in the form of heat and/or light.</p>
        <p className="text-cyan-200">2C₈H₁₈ + 25O₂ → 16CO₂ + 18H₂O</p>
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/dx1Nk38SUr0"
          title="Combustion Reaction"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg mt-4"
        ></iframe>
      </div>
    </div>
  );
};

export default PageTwo;
