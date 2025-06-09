"use client";

import { useState } from "react";
import { Crewmate } from "@influenceth/sdk";
import { v4 as uuidv4 } from "uuid";
import { getAllCollections, TRAITS_BY_CLASS } from "../utils";
import CollectionBadge from "./CollectionBadge";
import influence from "../lib/influence-sdk";

export default function AddCrewmateForm({ onAddCrewmate }) {
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
    
    // Reset form
    setSelectedCollection(Crewmate.COLLECTION_IDS.ADALIAN);
    setSelectedClass(Crewmate.CLASS_IDS.MINER);
    setSelectedTrait(Crewmate.TRAIT_IDS.PROSPECTOR);
    setSelectedTitle(0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-sm border border-slate-200 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Add New Crewmate</h3>
        <CollectionBadge collectionId={selectedCollection} size="sm" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Collection
        </label>
        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(Number(e.target.value))}
          className="w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
        >
          {collections.map((collection) => (
            <option key={collection.id} value={collection.id}>
              {collection.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
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
          className="w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
        >
          {classes.map((classId) => (
            <option key={classId} value={classId}>
              {Crewmate.getClass(classId)?.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Primary Trait
        </label>
        <select
          value={selectedTrait}
          onChange={(e) => setSelectedTrait(Number(e.target.value))}
          className="w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
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
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Title (Optional)
            {selectedCollection === Crewmate.COLLECTION_IDS.ARVAD_SPECIALIST && (
              <span className="text-blue-600 text-xs ml-1">(+0.5 tier bonus)</span>
            )}
          </label>
          <select
            value={selectedTitle}
            onChange={(e) => setSelectedTitle(Number(e.target.value))}
            className="w-full rounded-md border-slate-300 shadow-sm focus:border-slate-500 focus:ring-slate-500"
          >
            <option value={0}>No Title</option>
            {availableTitles.map(([titleId, title]) => (
              <option key={titleId} value={titleId}>
                {title.name} {title.tier && `(Tier ${title.tier})`}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
      >
        Add Crewmate
      </button>
    </form>
  );
}