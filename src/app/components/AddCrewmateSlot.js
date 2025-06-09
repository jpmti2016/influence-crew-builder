"use client";

import { useState } from "react";
import { Crewmate } from "@influenceth/sdk";
import { v4 as uuidv4 } from "uuid";
import { getAllCollections, TRAITS_BY_CLASS } from "../utils";
import influence from "../lib/influence-sdk";

export default function AddCrewmateSlot({ onAddCrewmate, disabled = false }) {
  const [selectedCollection, setSelectedCollection] = useState(Crewmate.COLLECTION_IDS.ADALIAN);
  const [selectedClass, setSelectedClass] = useState(Crewmate.CLASS_IDS.MINER);
  const [selectedTrait, setSelectedTrait] = useState(Crewmate.TRAIT_IDS.PROSPECTOR);
  const [selectedTitle, setSelectedTitle] = useState(0);

  const collections = getAllCollections();
  const classes = Object.values(Crewmate.CLASS_IDS).filter(id => id !== 0);
  const availableTraits = TRAITS_BY_CLASS[selectedClass] || [];
  
  // Get available titles for non-Adalian collections
  const availableTitles = selectedCollection !== Crewmate.COLLECTION_IDS.ADALIAN 
    ? Object.entries(Crewmate.TITLES).filter(([id, title]) => 
        Number(id) > 0 && Number(id) <= 65 // Standard titles, not special ones
      )
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (disabled) return;
    
    const newCrewmate = {
      id: uuidv4(),
      collectionId: selectedCollection,
      classId: selectedClass,
      traitIds: [selectedTrait],
      src: influence.imageUrls.crewmate(Math.floor(Math.random() * 30000) + 1000),
    };

    // Add title for non-Adalian collections
    if (selectedCollection !== Crewmate.COLLECTION_IDS.ADALIAN && selectedTitle > 0) {
      newCrewmate.titleId = selectedTitle;
    }

    onAddCrewmate(newCrewmate);
  };

  if (disabled) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 p-3 text-base rounded-md bg-slate-100 border-2 border-dashed border-slate-200 min-h-[280px] opacity-50">
        <span className="text-sm font-medium text-slate-400">Crew Full</span>
        <span className="text-xs text-slate-400 text-center">Maximum 5 crewmates reached</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-3 text-base rounded-md bg-slate-50 border-2 border-dashed border-slate-300 min-h-[280px]">
      <div className="flex items-center justify-center mb-2">
        <span className="text-sm font-semibold text-slate-500">Add Crewmate</span>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Collection
        </label>
        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(Number(e.target.value))}
          className="w-full text-xs rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
        >
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Class
        </label>
        <select
          value={selectedClass}
          onChange={(e) => {
            const classId = Number(e.target.value);
            setSelectedClass(classId);
            // Reset trait to first available for this class
            const traits = TRAITS_BY_CLASS[classId];
            if (traits?.length > 0) {
              setSelectedTrait(traits[0]);
            }
          }}
          className="w-full text-xs rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
        >
          {classes.map((classId) => (
            <option key={classId} value={classId}>
              {Crewmate.getClass(classId)?.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-700 mb-1">
          Primary Trait
        </label>
        <select
          value={selectedTrait}
          onChange={(e) => setSelectedTrait(Number(e.target.value))}
          className="w-full text-xs rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
        >
          {availableTraits.map((traitId) => (
            <option key={traitId} value={traitId}>
              {Crewmate.getTrait(traitId)?.name}
            </option>
          ))}
        </select>
      </div>

      {selectedCollection !== Crewmate.COLLECTION_IDS.ADALIAN && (
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Title
            {selectedCollection === Crewmate.COLLECTION_IDS.ARVAD_SPECIALIST && (
              <span className="text-blue-600 text-xs ml-1">(+0.5)</span>
            )}
          </label>
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(Number(e.target.value))}
            className="w-full text-xs rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
          >
            <option value={0}>None</option>
            {availableTitles.slice(0, 10).map(([titleId, title]) => (
              <option key={titleId} value={titleId}>
                {title.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="mt-auto flex justify-center items-center gap-1 py-2 px-3 border border-transparent rounded-md shadow-sm text-xs font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add
      </button>
    </form>
  );
}