import LiftingState from "./LiftingState";

export function CrewList() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <h1 className="mb-4 text-2xl font-bold leading-6 text-slate-900 lg:mb-10 bg-slate-200 sm:mb-8">
        Adalian Crew Simulator
      </h1>
      <LiftingState />
    </div>
  );
}
