import { Crewmate } from "@influenceth/sdk";
import { getAllCollections } from "../utils";
import CollectionBadge from "./CollectionBadge";

export default function CollectionSummary({ simulatedCrew }) {
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
        return {
          title: "Specialist Benefits",
          benefits: [
            `${specialistsWithTitles.length} crewmate(s) with +0.5 tier department bonus`,
            "Enhanced department expertise for complex operations"
          ]
        };
      
      case Crewmate.COLLECTION_IDS.ARVAD_CITIZEN:
        return {
          title: "Citizen Benefits", 
          benefits: [
            "Balanced abilities across all operations",
            "Reliable foundation for any crew composition"
          ]
        };
      
      case Crewmate.COLLECTION_IDS.ARVAD_LEADERSHIP:
        return {
          title: "Leadership Benefits",
          benefits: [
            "Command-focused abilities",
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

  if (simulatedCrew.length === 0) {
    return (
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Collection Summary</h3>
        <p className="text-slate-600">Add crewmates to see collection benefits.</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Collection Summary</h3>
      
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
    </div>
  );
}