import { crew } from "../utils";
import { CrewList } from "../components/CrewList";

export default function ManageCrew() {
  return (
    <div className="p-4 pb-4 mb-4 text-3xl font-semibold leading-6 text-slate-900 sm:py-12 sm:text-3xl sm:mb-8 lg:mb-10">
      <CrewList crew={crew} />
    </div>
  );
}
