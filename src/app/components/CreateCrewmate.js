"use client";

import { useState, useEffect } from "react";
import { Crewmate, Entity } from "@influenceth/sdk";
import {
  getCrews,
  getBonus,
  bonusByAbilityId,
  TRAITS_BY_CLASS,
  getAllCollections,
} from "../utils";

export default function CreateCrewmate() {
  const [crewmate, setCrewmate] = useState({
    id: 1,
    collection: "Adalian",
    class: "Miner",
    traits: "Prospector",
  });
  const [classes, setClasses] = useState([]);
  const [collection, setCollection] = useState([]);
  const [traits, setTraits] = useState([]);

  useEffect(() => {
    setCollection(getAllCollections());
    setClasses(Object.values(Crewmate.CLASSES));
    setTraits(Object.values(Crewmate.TRAITS));
  }, []);

  return (
    <div className="p-4 bg-slate-200">
      <div className="flex flex-col gap-4 p-4 mb-2 bg-slate-300 sm:grid sm:grid-cols-2">
        <h3 className="col-span-full text-lg font-semibold text-slate-900 mb-2">Collections</h3>
        {collection?.map((collect) => (
          <div className="relative flex items-start" key={collect.name}>
            <div className="flex items-center h-6">
              <input
                id={collect.name}
                aria-describedby="collection-description"
                name="collection"
                type="radio"
                className="w-4 h-4 rounded text-slate-600 border-slate-300 focus:ring-slate-600"
                defaultChecked={collect.name === "Adalian"}
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label
                htmlFor={collect.name}
                className={`font-medium ${collect.textColor}`}
              >
                {collect.name}
              </label>
              <p className="text-slate-600 text-xs">
                {collect.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col flex-wrap gap-4 p-4 mb-2 bg-slate-300 sm:flex-row">
        {classes
          .filter((c) => c.name !== "Undecided")
          .map((crewClass) => (
            <div className="relative flex items-start " key={crewClass.name}>
              <div className="flex items-center h-6">
                <input
                  id={crewClass.name}
                  aria-describedby="classes-description"
                  name="classes"
                  type="radio"
                  className="w-4 h-4 rounded text-slate-600 border-slate-300 focus:ring-slate-600"
                  defaultChecked={crewClass.name === "Miner"}
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label
                  htmlFor={crewClass.name}
                  className="font-medium text-slate-900"
                >
                  {crewClass.name}
                </label>
              </div>
            </div>
          ))}
      </div>
      <div className="flex flex-col gap-4 p-4 bg-slate-300 sm:grid sm:grid-cols-3">
        {traits
          ?.filter((t) => t.type !== "cosmetic")
          .map((trait) => (
            <div className="relative flex items-start" key={trait.name}>
              <div className="flex items-center h-6">
                <input
                  id={trait.name}
                  aria-describedby="traits-description"
                  name="traits"
                  type="radio"
                  className="w-4 h-4 rounded text-slate-600 border-slate-300 focus:ring-slate-600"
                  defaultChecked={trait.name === "Prospector"}
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label
                  htmlFor={trait.name}
                  className="font-medium text-slate-900"
                >
                  {trait.name}
                </label>
                <p id="traits-description" className="text-slate-500">
                  {trait.description}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
