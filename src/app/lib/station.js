// https://github.com/influenceth/sdk/blob/master/src/lib/station.js

const IDS = {
  STANDARD_QUARTERS: 1,
  EXPANDED_QUARTERS: 2,
  HABITAT: 3,
};

const TYPES = {
  [IDS.STANDARD_QUARTERS]: {
    i: IDS.STANDARD_QUARTERS,
    name: "Standard Quarters",
    cap: 5,
    recruitment: false,
    efficiency: 1,
  },

  [IDS.EXPANDED_QUARTERS]: {
    i: IDS.EXPANDED_QUARTERS,
    name: "Expanded Quarters",
    cap: 15,
    recruitment: false,
    efficiency: 1,
  },

  [IDS.HABITAT]: {
    i: IDS.HABITAT,
    name: "Habitat",
    cap: 1000,
    recruitment: true,
    efficiency: 1.2,
  },
};

const getType = (type) => (TYPES[type] ? { ...TYPES[type] } : null);

const Entity = {};
const Component = {};

const getEfficiency = (stationType, population) => {
  const { cap, efficiency } = getType(stationType);
  const softCap = 0.5 * cap;
  if (efficiency > 1 && population > softCap) {
    const efficiencyBonus = efficiency - 1;
    return (
      efficiency -
      (efficiencyBonus * (Math.min(population, cap) - softCap)) /
        (cap - softCap)
    );
  }
  return efficiency;
};
Component.getEfficiency = (station) =>
  getEfficiency(station.stationType, station.population);
Entity.getEfficiency = (stationable) =>
  Component.getEfficiency(stationable.Station);

export default {
  IDS,
  TYPES,

  getType,
  getEfficiency,

  Entity,
  Component,
};
