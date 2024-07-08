import { Crewmate } from "@influenceth/sdk";

export const BonusClass = ({ bonusClass }) => {
  const classId = bonusClass?.classId;

  return (
    <div className="flex flex-col gap-2">
      {classId ? (
        <>
          <div className="flex flex-row gap-2">
            <div>{`${Crewmate.CLASSES[bonusClass?.classId].name} (${
              bonusClass?.matches
            }) `}</div>
          </div>
          <div className="flex flex-row">
            <div aria-live="polite" className="sr-only">
              Matches
            </div>
            <div aria-live="polite" className="sr-only">
              {bonusClass?.matches}
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div aria-live="polite" className="sr-only">
              Multiplier
            </div>
            <div className="text-lg">{bonusClass?.multiplier?.toFixed(4)}</div>
          </div>
        </>
      ) : (
        "N/A"
      )}
    </div>
  );
};
