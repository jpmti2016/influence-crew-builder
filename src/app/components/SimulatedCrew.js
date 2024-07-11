"use client";
import { useState, useEffect } from "react";
import { Crewmate } from "@influenceth/sdk";

import Avatar from "./Avatar";
import { TRAITS_BY_CLASS } from "../utils";

export function SimulatedCrewmate({ initialCrewmate, setSimulatedCrew }) {
  const [simulatedCrewmate, setSimulatedCrewmate] = useState(initialCrewmate);
  const [simulatedCrewmateTrait, setSimulatedCrewmateTrait] = useState(
    initialCrewmate?.traitIds[0]
  );
  const [simulatedCrewmateClass, setSimulatedCrewmateClass] = useState(
    initialCrewmate?.classId
  );
  const [simulatedCrewmateCollection, setSimulatedCrewmateCollection] =
    useState(initialCrewmate?.collectionId);

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

  return (
    <form className="flex flex-col gap-3 p-2 text-base rounded-md bg-cyan-50">
      {/* <div className="text-lg font-semibold text-cyan-950">{`Crewmate`}</div> */}
      {/* <div className="">
        <label
          htmlFor={`${simulatedCrewmate?.collectionId}-${simulatedCrewmate.id}`}
          className="block text-sm font-medium leading-6 text-cyan-900"
        >
          Collection
        </label>
        Hardcoded label until being able to have info from the other
        collections 
        <label>Adalian</label>
         <select
          id={`${simulatedCrewmate?.collectionId}-${simulatedCrewmate.id}`}
          name={`${simulatedCrewmate?.collectionId}-${simulatedCrewmate.id}`}
          value={simulatedCrewmateCollection}
          onChange={(e) => setSimulatedCrewmateCollection(e.target.value)}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-cyan-900 ring-1 ring-inset ring-cyan-300 focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
        >
          {Object.values(Crewmate.COLLECTIONS)
            .filter((c) => c.name === "Adalian")
            .map((c) => (
              <option key={c.name} vlaue={c}>
                {c.name}
              </option>
            ))}
        </select> 
      </div> */}

      <div className="">
        <label
          htmlFor={`classId-${simulatedCrewmate?.id}`}
          className="block text-sm font-medium leading-6 text-cyan-900"
        >
          Class
        </label>
        <select
          value={simulatedCrewmateClass}
          onChange={(e) => {
            e.preventDefault();
            setSimulatedCrewmateClass(Number(e.target.value));
            setSimulatedCrewmateTrait(
              Number(TRAITS_BY_CLASS[Number(e.target.value)][0])
            );
          }}
          id={`classId-${simulatedCrewmate?.id}`}
          name={`classId-${simulatedCrewmate?.id}`}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-cyan-900 ring-1 ring-inset ring-cyan-300 focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
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
          className="block text-sm font-medium leading-6 text-cyan-900"
        >
          Trait
        </label>
        <select
          id={`traitIds-${simulatedCrewmate.id}`}
          name={`traitIds-${simulatedCrewmate.id}`}
          value={simulatedCrewmateTrait}
          onChange={(e) => {
            e.preventDefault();
            setSimulatedCrewmateTrait(e.target.value);
          }}
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-cyan-900 ring-1 ring-inset ring-cyan-300 focus:ring-2 focus:ring-cyan-600 sm:text-sm sm:leading-6"
        >
          {TRAITS_BY_CLASS[simulatedCrewmateClass]?.map((c) => (
            <option key={Crewmate?.TRAITS[c]?.name} value={c}>
              {Crewmate.TRAITS[c]?.name}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleClick}
        className="flex flex-row items-center justify-center w-full gap-2 px-3 py-2 text-sm font-semibold text-center rounded-md shadow-sm text-slate-50 bg-slate-600 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
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
      </button>
    </form>
  );
}

export default function SimulatedCrew({ simulatedCrew, setSimulatedCrew }) {
  return (
    <div className="flex flex-col gap-2 pb-4 mb-4 sm:mb-8 lg:mb-10 sm:gap-4 lg:gap-6">
      {/* <div
        role="list"
        className="grid max-w-2xl grid-cols-1 gap-2 mx-auto sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5 sm:gap-3 lg:gap-8"
      >
        {simulatedCrew?.map((crewmate) => (
          <div key={crewmate.id} className="">
            <Avatar crewmate={crewmate} />
          </div>
        ))}
      </div> */}
      {/* <button
        type="button"
        className="flex flex-row items-center gap-2 px-3 py-2 text-sm font-semibold text-center rounded-md shadow-sm w-fit text-slate-50 bg-slate-600 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
          />
        </svg>
        <span>Change Crew</span>
      </button> */}
      <div>
        <div
          role="list"
          className="grid max-w-2xl grid-cols-1 gap-2 mx-auto sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5 sm:gap-3 lg:gap-8"
        >
          {simulatedCrew?.map((crewmate) => (
            <div key={crewmate.id} className="">
              <SimulatedCrewmate
                initialCrewmate={crewmate}
                setSimulatedCrew={setSimulatedCrew}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
