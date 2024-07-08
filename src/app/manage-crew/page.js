import {
  getCrews,
  getBonus,
  bonusByAbilityId,
  TRAITS_BY_CLASS,
} from "../utils";

import influence from "../lib/influence-sdk";
import { Entity } from "@influenceth/sdk";

import { manageCrew } from "../actions";
import { crew } from "../utils";
import CreateCrewmate from "../components/CreateCrewmate";
import { CrewList } from "../components/CrewList";

export default async function ManageCrew() {
  return (
    <div className="bg-slate-200">
      <h1 className="p-4 font-bold text-slate-600 bg-slate-200 sm:py-12 sm:text-3xl">
        Crew 1
      </h1>

      <form action={manageCrew} className="p-4">
        <h2 className="p-3 font-bold text-slate-600 bg-slate-200 sm:py-12 sm:text-3xl">
          Create crewmate
        </h2>
        <CreateCrewmate />
        <div className="flex flex-col gap-2 p-4 bg-slate-300">
          <input type="text" name="name" />
          <button
            id="change-crew-button"
            className="flex flex-row items-center gap-1 bg-transparent w-fit"
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
            <span className="icon-round icon-crew-members"></span>
            Change Crew
          </button>
        </div>
        <button
          id="change-crew-button"
          className="flex flex-row items-center gap-1 bg-transparent w-fit"
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
          <span className="icon-round icon-crew-members"></span>
          Change Crew
        </button>
      </form>

      <CrewList crew={crew} />
    </div>
  );
}
