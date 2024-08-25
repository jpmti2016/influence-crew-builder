import { Crewmate } from "@influenceth/sdk";

import influence from "./lib/influence-sdk";
import { v4 as uuidv4 } from "uuid";

import Crew from "./lib/crew";

export const TRAITS_BY_CLASS = {
  [Crewmate.CLASS_IDS.ENGINEER]: [
    Crewmate.TRAIT_IDS.REFINER,
    Crewmate.TRAIT_IDS.MECHANIC,
    Crewmate.TRAIT_IDS.BUILDER,
  ],
  [Crewmate.CLASS_IDS.MINER]: [
    Crewmate.TRAIT_IDS.SURVEYOR,
    Crewmate.TRAIT_IDS.RECYCLER,
    Crewmate.TRAIT_IDS.PROSPECTOR,
  ],
  [Crewmate.CLASS_IDS.MERCHANT]: [
    Crewmate.TRAIT_IDS.HAULER,
    Crewmate.TRAIT_IDS.MOGUL,
    Crewmate.TRAIT_IDS.LOGISTICIAN,
  ],
  [Crewmate.CLASS_IDS.SCIENTIST]: [
    Crewmate.TRAIT_IDS.DIETITIAN,
    Crewmate.TRAIT_IDS.SCHOLAR,
    Crewmate.TRAIT_IDS.EXPERIMENTER,
  ],
  [Crewmate.CLASS_IDS.PILOT]: [
    Crewmate.TRAIT_IDS.NAVIGATOR,
    Crewmate.TRAIT_IDS.BUSTER,
    Crewmate.TRAIT_IDS.OPERATOR,
  ],
};

// export const getCrew = async ({ id, label }) => {
//   //TODO Auth fail
//   const result = await api.entity({ label: Entity.IDS.CREW, id: 4938 });

//   return result.json();
// };

export const getCrews = async (address) =>
  //TODO Auth fail
  influenceApi.util
    .crews(address)
    .then((crews) =>
      Promise.all(
        crews.flatMap(async (entity) => {
          if (!entity.Crew || entity.Crew.roster.length === 0) return [];

          const asteroidId = entity.Location?.locations?.asteroid?.id;

          const ship = entity.Location?.locations?.ship;
          const building = entity.Location?.locations?.building;
          const station = ship ?? building;
          const actionLocation = await getCrewBusyLocation(entity);
          const habitat = station
            ? await influenceApi.entity(station)
            : undefined;

          return [
            {
              id: entity.id,
              name: entity.Name ?? `Crew #${entity.id}`,
              readyAt: new Date(entity.Crew.readyAt),
              actionLocation,
              habitat,
              roster: entity.Crew.roster,
              asteroidId,
              lotLocation: entity.Location?.locations.lot,
            },
          ];
        })
      )
    )
    .then((e) => e.flat());

const getCrewBusyLocation = (entity) => {
  //TODO Auth fail
  if (entity.Crew?.actionTarget) {
    return influenceApi.entity(entity.Crew.actionTarget);
  }
};

const imgsByClass = {
  [Crewmate.CLASS_IDS.MINER]: { src: influence.imageUrls.crewmate(28432) },
  [Crewmate.CLASS_IDS.ENGINEER]: { src: influence.imageUrls.crewmate(20709) },
  [Crewmate.CLASS_IDS.SCIENTIST]: { src: influence.imageUrls.crewmate(23365) },
  [Crewmate.CLASS_IDS.MERCHANT]: { src: influence.imageUrls.crewmate(23857) },
  [Crewmate.CLASS_IDS.PILOT]: { src: influence.imageUrls.crewmate(23342) },
};

export const crew = [
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.MINER,
    traitIds: [Crewmate.TRAIT_IDS.PROSPECTOR],
    src: influence.imageUrls.crewmate(28432),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.ENGINEER,
    traitIds: [Crewmate.TRAIT_IDS.REFINER],
    src: influence.imageUrls.crewmate(20709),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.SCIENTIST,
    traitIds: [Crewmate.TRAIT_IDS.DIETITIAN],
    src: influence.imageUrls.crewmate(23365),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.MERCHANT,
    traitIds: [Crewmate.TRAIT_IDS.LOGISTICIAN],
    src: influence.imageUrls.crewmate(23857),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.PILOT,
    traitIds: [Crewmate.TRAIT_IDS.NAVIGATOR],
    src: influence.imageUrls.crewmate(23342),
  },
];

// Surface Speed, Market Feed Reduction, Free Transport Distance Increase
export const onPlanetMerchLogistCrew = [
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.MERCHANT,
    traitIds: [Crewmate.TRAIT_IDS.LOGISTICIAN],
    src: influence.imageUrls.crewmate(23857),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.MERCHANT,
    traitIds: [Crewmate.TRAIT_IDS.LOGISTICIAN],
    src: influence.imageUrls.crewmate(23857),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.MERCHANT,
    traitIds: [Crewmate.TRAIT_IDS.LOGISTICIAN],
    src: influence.imageUrls.crewmate(23857),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.MERCHANT,
    traitIds: [Crewmate.TRAIT_IDS.LOGISTICIAN],
    src: influence.imageUrls.crewmate(23857),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.MERCHANT,
    traitIds: [Crewmate.TRAIT_IDS.LOGISTICIAN],
    src: influence.imageUrls.crewmate(23857),
  },
];
export const refiningCrew = [
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.ENGINEER,
    traitIds: [Crewmate.TRAIT_IDS.REFINER],
    src: influence.imageUrls.crewmate(20709),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.ENGINEER,
    traitIds: [Crewmate.TRAIT_IDS.REFINER],
    src: influence.imageUrls.crewmate(20709),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.ENGINEER,
    traitIds: [Crewmate.TRAIT_IDS.REFINER],
    src: influence.imageUrls.crewmate(20709),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.SCIENTIST,
    traitIds: [Crewmate.TRAIT_IDS.DIETITIAN],
    src: influence.imageUrls.crewmate(23365),
  },
  {
    id: uuidv4(),
    collectionId: Crewmate.COLLECTION_IDS.ADALIAN,
    classId: Crewmate.CLASS_IDS.PILOT,
    traitIds: [Crewmate.TRAIT_IDS.DIETITIAN],
    src: influence.imageUrls.crewmate(23365),
  },
];

// {
//   crewmates: [
// { classId: 4 },
// { collectionId: 4, classId: 3, traitIds: [31] },
// { collectionId: 4, classId: 3, traitIds: [31] },
// { classId: 3, titleId: 65 },
// { Crewmate: { coll: 4, class: 3, impactful: [47] } },
// { Crewmate: { coll: 2, class: 3, title: 13, impactful: [31] } },
//   ],
// },
// MINERS
// {
//   abilityId: 1,
//   crewmates: [
//     { classId: 3 },
//     { collectionId: 4, classId: 3, traitIds: [31] },
//   ],
// },
// {
//   abilityId: 1,
//   crewmates: [
//     { classId: 3, titleId: 65 },
//     { collectionId: 4, classId: 3, traitIds: [31] },
//   ],
// },
// {
//   abilityId: 3,
//   crewmates: [
//     { classId: 3, titleId: 65 },
//     { collectionId: 4, classId: 3, traitIds: [47] },
//   ],
// },
// {
//   abilityId: 3,
//   crewmates: [
//     { Crewmate: { coll: 4, class: 3, title: 65 } },
//     { Crewmate: { coll: 4, class: 3, impactful: [47] } },
//   ],
// },
// {
//   abilityId: 1,
//   crewmates: [
//     { Crewmate: { coll: 1, class: 3, title: 13, impactful: [31] } },
//     { Crewmate: { coll: 2, class: 3, title: 13, impactful: [31] } },
//   ],
// },
// {
//   abilityId: 1,
//   crewmates: [
//     { classId: 1 },
//     { collectionId: 4, classId: 2, traitIds: [31] },
//   ],
// },

export const getSimulatedCrew = () => {
  return crew;
};

export const bonusByAbilityId = (abilityId, crew) => {
  const details = Crew.getAbilityBonus(abilityId, crew);

  return details;
};

export const getBonus = (crew) => {
  const bonusByAbility = Object.values(Crewmate.ABILITY_IDS).map((id) => {
    return bonusByAbilityId(id, crew);
  });

  return bonusByAbility.sort((a, b) => {
    if (a.totalBonus > b.totalBonus) {
      return -1;
    }

    if (a.totalBonus < b.totalBonus) {
      return 1;
    }

    return 0;
  });
};

export const getImpacfulTraits = () => {
  const traits = Object.entries(Crewmate.TRAITS).map(([key, value]) => {
    return {
      traitId: key,
      ...value,
    };
  });

  return traits.filter((t) => t.type === "impactful");
};

export const formatVol = (mls) => {
  return `${(mls / 1_000_000).toFixed(2)} m3`;
};

export const formatMass = (kgs) => {
  if (kgs >= 1_000_000_000) {
    return `${(kgs / 1_000_000_000).toFixed(2)} Mt`;
  }
  if (kgs >= 1_000_000) {
    return `${(kgs / 1_000_000).toFixed(2)} kt`;
  }
  if (kgs >= 1_000) {
    return `${(kgs / 1000).toFixed(1)} t`;
  }
  return `${kgs.toFixed(0)}kg`;
};
