import { Crewmate } from "@influenceth/sdk";
import CollectionBadge from "./CollectionBadge";
import { getCollectionInfo } from "../utils";

export default function CrewmateCard({ crewmate }) {
  const collection = getCollectionInfo(crewmate.collectionId);
  const crewmateClass = Crewmate.getClass(crewmate.classId);
  const primaryTrait = crewmate.traitIds?.[0] ? Crewmate.getTrait(crewmate.traitIds[0]) : null;
  const title = crewmate.titleId ? Crewmate.getTitle(crewmate.titleId) : null;

  return (
    <div className="flex flex-col gap-2 p-3 bg-white rounded-lg shadow-sm border border-slate-200">
      <div className="flex items-center justify-between">
        <CollectionBadge collectionId={crewmate.collectionId} size="sm" />
        {title && (
          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {title.name}
          </span>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        {crewmate.src && (
          <img 
            src={crewmate.src} 
            alt={`${crewmateClass?.name} crewmate`}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-slate-900">
            {crewmateClass?.name || "Unknown Class"}
          </h4>
          {primaryTrait && (
            <p className="text-xs text-slate-600">
              {primaryTrait.name}
            </p>
          )}
        </div>
      </div>

      {collection.name === "Arvad Specialist" && title && (
        <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
          <strong>Specialist Bonus:</strong> +0.5 tier department bonus
        </div>
      )}
    </div>
  );
}