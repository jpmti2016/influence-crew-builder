import entityCrewmate from "../lib/crewmate";

const Departments = ({ departments }) => {
  return (
    <div className="flex flex-col gap-2">
      {departments.map(([key, value]) => (
        <div
          key={entityCrewmate.DEPARTMENTS[key].name}
          className="flex flex-col items-start gap-2 pb-1"
        >
          <div>{entityCrewmate.DEPARTMENTS[key].name}</div>
          <div className="text-lg">{value}</div>
        </div>
      ))}
    </div>
  );
};

export default Departments;
