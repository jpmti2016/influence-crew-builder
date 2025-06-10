"use client";
import { useState } from "react";
import { Crewmate } from "@influenceth/sdk";
import { getAllCollections, getDepartmentInfo } from "../utils";
import CollectionBadge from "./CollectionBadge";

export default function CollectionSummary({ simulatedCrew }) {
  const [showSummary, setShowSummary] = useState(false);
  const collections = getAllCollections();
  const crewByCollection = simulatedCrew.reduce((acc, crewmate) => {
    const collectionId = crewmate.collectionId;
    if (!acc[collectionId]) {
      acc[collectionId] = [];
    }
    acc[collectionId].push(crewmate);
    return acc;
  }, {});

  const getCollectionBenefits = (collectionId, crewmates) => {
    switch (collectionId) {
      case Crewmate.COLLECTION_IDS.ARVAD_SPECIALIST:
        const specialistsWithTitles = crewmates.filter(c => c.titleId);
        const specialistDepartments = [...new Set(crewmates.filter(c => c.departmentId).map(c => getDepartmentInfo(c.departmentId).name))];
        return {
          title: "Specialist Benefits",
          benefits: [
            `${specialistsWithTitles.length} crewmate(s) with +0.5 tier department bonus`,
            specialistDepartments.length > 0 ? `Departments: ${specialistDepartments.join(', ')}` : "No departments assigned",
            "Enhanced department expertise for complex operations"
          ]
        };
      
      case Crewmate.COLLECTION_IDS.ARVAD_CITIZEN:
        const citizenDepartments = [...new Set(crewmates.filter(c => c.departmentId).map(c => getDepartmentInfo(c.departmentId).name))];
        return {
          title: "Citizen Benefits", 
          benefits: [
            "Balanced abilities across all operations",
            citizenDepartments.length > 0 ? `Departments: ${citizenDepartments.join(', ')}` : "No departments assigned",
            "Reliable foundation for any crew composition"
          ]
        };
      
      case Crewmate.COLLECTION_IDS.ARVAD_LEADERSHIP:
        const leadershipDepartments = [...new Set(crewmates.filter(c => c.departmentId).map(c => getDepartmentInfo(c.departmentId).name))];
        return {
          title: "Leadership Benefits",
          benefits: [
            "Command-focused abilities",
            leadershipDepartments.length > 0 ? `Departments: ${leadershipDepartments.join(', ')}` : "No departments assigned",
            "Enhanced coordination and management capabilities"
          ]
        };
      
      case Crewmate.COLLECTION_IDS.ADALIAN:
        return {
          title: "Adalian Benefits",
          benefits: [
            "Specialized class-based traits",
            "Native understanding of asteroid operations"
          ]
        };
      
      default:
        return { title: "Unknown Collection", benefits: [] };
    }
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
      <div className="flex flex-row items-baseline mb-4">
        <input
          checked={showSummary}
          onChange={(e) => setShowSummary((prev) => !prev)}
          id="show-collection-summary"
          name="show-collection-summary"
          type="checkbox"
          className="w-4 h-4 rounded border-slate-300 text-slate-600 checked:ring-slate-600"
        />
        <div className="ml-2">
          <label
            htmlFor="show-collection-summary"
            className="text-lg font-medium text-slate-900"
          >
            Show Collection Summary
          </label>
        </div>
      </div>

      {showSummary && simulatedCrew.length === 0 && (
        <p className="text-slate-600">Add crewmates to see collection benefits.</p>
      )}

      {showSummary && simulatedCrew.length > 0 && (
        <>
          <div className="space-y-4">
            {Object.entries(crewByCollection).map(([collectionId, crewmates]) => {
              const collection = collections.find(c => c.id === Number(collectionId));
              const benefits = getCollectionBenefits(Number(collectionId), crewmates);
              
              return (
                <div key={collectionId} className="border border-slate-200 rounded-lg p-3 bg-white">
                  <div className="flex items-center justify-between mb-2">
                    <CollectionBadge collectionId={Number(collectionId)} size="sm" />
                    <span className="text-sm text-slate-600">
                      {crewmates.length} crewmate{crewmates.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-slate-900 mb-2">{benefits.title}</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    {benefits.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-slate-400 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">Mixed Collection Strategy</h4>
            <p className="text-sm text-blue-700">
              Combining different collections can provide complementary benefits. Arvad Specialists excel at 
              specific departments, while Adalians provide solid class-based bonuses. Consider your operation&apos;s 
              specific needs when building your crew.
            </p>
          </div>
        </>
      )}
    </div>
  );
}