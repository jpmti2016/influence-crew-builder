"use client";
import { useState } from "react";
import { getImpacfulTraits, normalizeCrewmateFormat } from "../utils";

const CrewImpactfulTraits = ({ simulatedCrew }) => {
  const [showTraits, setShowTraits] = useState(true);
  const traits = getImpacfulTraits();
  const simulatedCrewTraits = simulatedCrew?.map(
    (crewmate) => {
      const normalized = normalizeCrewmateFormat(crewmate);
      return normalized.traitIds && normalized.traitIds.length > 0 ? normalized.traitIds[0] : null;
    }
  ).filter(trait => trait !== null);

  return (
    <div className="p-4 mb-4 sm:mb-8 lg:mb-10 bg-slate-300">
      <div className="flex flex-row items-baseline">
        <input
          defaultChecked={showTraits}
          onChange={() => setShowTraits((prev) => !prev)}
          id="same-as-shipping"
          name="same-as-shipping"
          type="checkbox"
          className="w-4 h-4 rounded border-slate-300 text-slate-600 checked:ring-slate-600"
        />
        <div className="ml-2">
          <label
            htmlFor="same-as-shipping"
            className="text-lg font-medium text-slate-900"
          >
            Show Crew Traits Description
          </label>
        </div>
      </div>

      {showTraits ? (
        <div className="flex flex-col gap-3 rounded-lg sm:grid sm:grid-cols-3">
          {traits
            .filter((t) => simulatedCrewTraits.includes(Number(t.traitId)))
            .map((trait) => (
              <div
                key={trait.name}
                className="flex flex-col items-start gap-2 text-lg"
              >
                <div>{trait.name}</div>
                <div className="text-sm">{trait.description}</div>
              </div>
            ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CrewImpactfulTraits;
