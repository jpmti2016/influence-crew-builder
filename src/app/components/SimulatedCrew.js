"use client";
import { useState, useEffect } from "react";
import { Crewmate } from "@influenceth/sdk";

import Avatar from "./Avatar";
import { TRAITS_BY_CLASS, getCollectionInfo, getAllCollections } from "../utils";
import Banner from "../components/Banner";
import CollectionBadge from "./CollectionBadge";
import AddCrewmateSlot from "./AddCrewmateSlot";

export function SimulatedCrewmate({ initialCrewmate, setSimulatedCrew, onRemoveCrewmate }) {
  const [simulatedCrewmate, setSimulatedCrewmate] = useState(initialCrewmate);
  const [simulatedCrewmateTrait, setSimulatedCrewmateTrait] = useState(
    initialCrewmate?.traitIds[0]
  );
  const [simulatedCrewmateClass, setSimulatedCrewmateClass] = useState(
    initialCrewmate?.classId
  );
  const [simulatedCrewmateCollection, setSimulatedCrewmateCollection] =
    useState(initialCrewmate?.collectionId);

  useEffect(() => {
    setSimulatedCrew((prev) => {
      return prev.map((p) => {
        if (p.id === simulatedCrewmate.id) {
          return {
            ...simulatedCrewmate,
            collectionId: simulatedCrewmateCollection,
            classId: simulatedCrewmateClass,
            traitIds: [Number(simulatedCrewmateTrait)],
            titleId: p.titleId, // Preserve existing title if any
          };
        }

        return p;
      });
    });
  }, [simulatedCrewmateCollection, simulatedCrewmateTrait, simulatedCrewmateClass, simulatedCrewmate, setSimulatedCrew]);

  function handleClick(e) {
    e.preventDefault();

    setSimulatedCrew((prev) => {
      return prev.map((p) => {
        if (p.id === simulatedCrewmate.id) {
          return {
            ...simulatedCrewmate,
            collectionId: simulatedCrewmateCollection,
            classId: simulatedCrewmateClass,
            traitIds: [Number(simulatedCrewmateTrait)],
          };
        }

        return p;
      });
    });
  }
  function onChangeClass(e) {
    e.preventDefault();

    setSimulatedCrewmateClass(Number(e.target.value));
    setSimulatedCrewmateTrait(
      Number(TRAITS_BY_CLASS[Number(e.target.value)][0])
    );
  }
  function onChangeTrait(e) {
    e.preventDefault();

    setSimulatedCrewmateTrait(e.target.value);
  }

  return (
    <form className="flex flex-col gap-3 p-3 text-base rounded-md bg-slate-50 border border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-700">Crewmate</span>
        <div className="flex items-center gap-2">
          <CollectionBadge collectionId={simulatedCrewmateCollection} size="xs" />
          {onRemoveCrewmate && (
            <button
              type="button"
              onClick={() => onRemoveCrewmate(simulatedCrewmate.id)}
              className="text-red-500 hover:text-red-700 text-xs p-1"
              title="Remove crewmate"
            >
              ✕
            </button>
          )}
        </div>
      </div>
      <div className="">
        <label
          htmlFor={`collection-${simulatedCrewmate.id}`}
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Collection
        </label>
        <select
          id={`collection-${simulatedCrewmate.id}`}
          name={`collection-${simulatedCrewmate.id}`}
          value={simulatedCrewmateCollection}
          onChange={(e) => setSimulatedCrewmateCollection(Number(e.target.value))}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
        >
          {getAllCollections().map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-slate-600">
          {getCollectionInfo(simulatedCrewmateCollection).description}
        </p>
      </div>

      <div className="">
        <label
          htmlFor={`classId-${simulatedCrewmate?.id}`}
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Class
        </label>
        <select
          value={simulatedCrewmateClass}
          onChange={onChangeClass}
          id={`classId-${simulatedCrewmate?.id}`}
          name={`classId-${simulatedCrewmate?.id}`}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
        >
          {Object.values(Crewmate.CLASS_IDS)
            .filter((c) => c !== 0)
            .map((c) => (
              <option key={Crewmate.CLASSES[c].name} value={c}>
                {Crewmate.CLASSES[c].name}
              </option>
            ))}
        </select>
      </div>

      <div className="">
        <label
          htmlFor={`traitIds-${simulatedCrewmate.id}`}
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Trait
        </label>
        <select
          id={`traitIds-${simulatedCrewmate.id}`}
          name={`traitIds-${simulatedCrewmate.id}`}
          value={simulatedCrewmateTrait}
          onChange={onChangeTrait}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
        >
          {TRAITS_BY_CLASS[simulatedCrewmateClass]?.map((c) => (
            <option key={Crewmate?.TRAITS[c]?.name} value={c}>
              {Crewmate.TRAITS[c]?.name}
            </option>
          ))}
        </select>
      </div>
      {/* <button
        onClick={handleClick}
        className="flex flex-row items-center justify-center w-full gap-2 px-3 py-2 text-sm font-semibold text-center rounded-md shadow-sm bg-slate-600 text-slate-50 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>

        <span>Save</span>
      </button> */}
    </form>
  );
}

export default function SimulatedCrew({ simulatedCrew, setSimulatedCrew, onRemoveCrewmate, onAddCrewmate }) {
  const MAX_CREW_SIZE = 5;
  const currentCrewSize = simulatedCrew?.length || 0;
  const emptySlots = Math.max(0, MAX_CREW_SIZE - currentCrewSize);

  // Create array of all slots (existing crewmates + empty slots)
  const allSlots = [
    ...simulatedCrew.map(crewmate => ({ type: 'crewmate', data: crewmate })),
    ...Array(emptySlots).fill().map((_, index) => ({ type: 'empty', id: `empty-${index}` }))
  ];

  return (
    <div className="flex flex-col gap-2 pb-4 mb-4 sm:mb-8 lg:mb-10 sm:gap-4 lg:gap-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-900">
          Crew Composition
        </h2>
        <span className="text-sm text-slate-600">
          {currentCrewSize} / {MAX_CREW_SIZE} crewmates
        </span>
      </div>
      
      <div>
        <div
          role="list"
          className="grid max-w-2xl grid-cols-1 gap-3 mx-auto sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5 sm:gap-4 lg:gap-8"
        >
          {allSlots.map((slot, index) => (
            <div key={slot.type === 'crewmate' ? slot.data.id : slot.id} className="">
              {slot.type === 'crewmate' ? (
                <SimulatedCrewmate
                  initialCrewmate={slot.data}
                  setSimulatedCrew={setSimulatedCrew}
                  onRemoveCrewmate={onRemoveCrewmate}
                />
              ) : (
                <AddCrewmateSlot 
                  onAddCrewmate={onAddCrewmate} 
                  disabled={currentCrewSize >= MAX_CREW_SIZE} 
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <Banner />
    </div>
  );
}
