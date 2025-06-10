"use client";
import { useState } from "react";
import BonusByAbility from "./BonusByAbility";

import Abilities from "./Abilities";

import SimulatedCrew from "./SimulatedCrew";

import { getSimulatedCrew } from "../utils";
import CrewImpactfulTraits from "./CrewImpactfulTraits";
import CollectionSummary from "./CollectionSummary";

export default function LiftingState() {
  const [simulatedCrew, setSimulatedCrew] = useState(getSimulatedCrew());

  const MAX_CREW_SIZE = 5;

  const handleAddCrewmate = (newCrewmate) => {
    setSimulatedCrew(prev => {
      // Prevent adding more than 5 crewmates
      if (prev.length >= MAX_CREW_SIZE) {
        return prev;
      }
      return [...prev, newCrewmate];
    });
  };

  const handleRemoveCrewmate = (crewmateId) => {
    setSimulatedCrew(prev => prev.filter(c => c.id !== crewmateId));
  };

  return (
    <div className="space-y-6">
      <SimulatedCrew
        simulatedCrew={simulatedCrew}
        setSimulatedCrew={setSimulatedCrew}
        onRemoveCrewmate={handleRemoveCrewmate}
        onAddCrewmate={handleAddCrewmate}
      />
      
      <CollectionSummary simulatedCrew={simulatedCrew} />
      
      <CrewImpactfulTraits simulatedCrew={simulatedCrew} />
      <BonusByAbility simulatedCrew={simulatedCrew} />
      {/* <Abilities /> */}
    </div>
  );
}
