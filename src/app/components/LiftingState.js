"use client";
import { useState } from "react";
import BonusByAbility from "./BonusByAbility";

import Abilities from "./Abilities";

import SimulatedCrew from "./SimulatedCrew";

import { getSimulatedCrew, getImpacfulTraits } from "../utils";
import CrewImpactfulTraits from "./CrewImpactfulTraits";

export default function LiftingState() {
  const [simulatedCrew, setSimulatedCrew] = useState(getSimulatedCrew());

  return (
    <div>
      <SimulatedCrew
        simulatedCrew={simulatedCrew}
        setSimulatedCrew={setSimulatedCrew}
      />
      <CrewImpactfulTraits simulatedCrew={simulatedCrew} />
      <BonusByAbility simulatedCrew={simulatedCrew} />
      {/* <Abilities /> */}
    </div>
  );
}
