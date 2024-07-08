import { Crewmate } from "@influenceth/sdk";

export const BonusTitles = ({ titles }) => {
  const title = Object.keys(titles);
  const titlesValues = Object.values(titles)[0];
  return (
    <div className="flex flex-col gap-2">
      {title.length > 0 ? (
        <>
          <div className="flex flex-row gap-2">
            <div>{Crewmate.TITLES[title]?.name}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Matches</div>
            <div>{titlesValues?.matches}</div>
          </div>
          <div className="flex flex-col gap-1">
            <div>Bonus per match</div>
            <div>{titlesValues?.bonusPerMatch?.toFixed(4)}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Bonus</div>
            <div>{titlesValues?.bonus?.toFixed(4)}</div>
          </div>
        </>
      ) : (
        "N/A"
      )}
    </div>
  );
};
