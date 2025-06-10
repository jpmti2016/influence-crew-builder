import { getCollectionInfo } from "../utils";

export default function CollectionBadge({ collectionId, size = "sm" }) {
  const collection = getCollectionInfo(collectionId);
  
  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-1 text-xs", 
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  };

  return (
    <span 
      className={`inline-flex items-center rounded-full font-medium ${collection.color} text-white ${sizeClasses[size]}`}
      title={collection.description}
    >
      {collection.name}
    </span>
  );
}