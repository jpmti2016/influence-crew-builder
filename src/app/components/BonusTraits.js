import { Crewmate } from "@influenceth/sdk";

export const BonusTraits = ({ traits }) => {
  const trait = Object.keys(traits);
  const traitsValues = Object.values(traits)[0];
  return (
    <div className="flex flex-col gap-2">
      {trait.length > 0 ? (
        <>
          {" "}
          <div className="flex flex-row gap-2">
            <div>{`${Crewmate.TRAITS[trait]?.name} (${traitsValues?.matches})`}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div aria-live="polite" className="sr-only">
              Matches
            </div>
            <div aria-live="polite" className="sr-only">
              {traitsValues?.matches}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div>Bonus Per Match</div>
            <div>{traitsValues?.bonusPerMatch?.toFixed(4)}</div>
          </div>
          <div className="flex flex-row gap-2">
            <div aria-live="polite" className="sr-only">
              Total Traits Bonus
            </div>
            <div className="text-lg">{traitsValues?.bonus?.toFixed(4)}</div>
          </div>
        </>
      ) : (
        "N/A"
      )}
    </div>
  );
};
