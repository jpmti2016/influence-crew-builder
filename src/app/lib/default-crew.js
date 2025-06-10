import { Crewmate } from "@influenceth/sdk"
import influence from "./influence-sdk"

// Default Adalian crew for logged out users
// Using static IDs to ensure they're unique and consistent
export const defaultAdalianCrew = [
  {
    id: 'demo-adalian-engineer',
    collection: Crewmate.COLLECTION_IDS.ADALIAN,
    class: Crewmate.CLASS_IDS.ENGINEER,
    traits: [Crewmate.TRAIT_IDS.REFINER],
    src: influence.imageUrls.crewmate(20709),
    isInCrew: false,
    crewInfo: null,
  },
  {
    id: 'demo-adalian-miner',
    collection: Crewmate.COLLECTION_IDS.ADALIAN,
    class: Crewmate.CLASS_IDS.MINER,
    traits: [Crewmate.TRAIT_IDS.PROSPECTOR],
    src: influence.imageUrls.crewmate(28432),
    isInCrew: false,
    crewInfo: null,
  },
  {
    id: 'demo-adalian-scientist',
    collection: Crewmate.COLLECTION_IDS.ADALIAN,
    class: Crewmate.CLASS_IDS.SCIENTIST,
    traits: [Crewmate.TRAIT_IDS.DIETITIAN],
    src: influence.imageUrls.crewmate(23365),
    isInCrew: false,
    crewInfo: null,
  },
  {
    id: 'demo-adalian-merchant',
    collection: Crewmate.COLLECTION_IDS.ADALIAN,
    class: Crewmate.CLASS_IDS.MERCHANT,
    traits: [Crewmate.TRAIT_IDS.LOGISTICIAN],
    src: influence.imageUrls.crewmate(23857),
    isInCrew: false,
    crewInfo: null,
  },
  {
    id: 'demo-adalian-pilot',
    collection: Crewmate.COLLECTION_IDS.ADALIAN,
    class: Crewmate.CLASS_IDS.PILOT,
    traits: [Crewmate.TRAIT_IDS.NAVIGATOR],
    src: influence.imageUrls.crewmate(23342),
    isInCrew: false,
    crewInfo: null,
  },
]