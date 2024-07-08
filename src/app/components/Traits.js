import entityCrewmate from "../lib/crewmate";

const Traists = ({ traits }) => {
  return (
    <div className="flex items-start">
      {traits?.map(([key, value]) => (
        <div
          key={entityCrewmate.TRAITS[key].name}
          className="flex flex-col items-start gap-2 pb-1"
        >
          <div>{entityCrewmate.TRAITS[key].name}</div>
          <div className="text-lg">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default Traists;
