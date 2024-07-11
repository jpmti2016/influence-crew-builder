import LiftingState from "./LiftingState";

export function CrewList() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="font-bold lg:mb-10 text-slate-600 bg-slate-200">
        Adalian Crew Simulator
      </h1>
      <LiftingState />
    </div>
  );
}
