import { crew } from "./utils";
import { CrewList } from "./components/CrewList";
import Footer from "./components/Footer";

export default function ManageCrew() {
  return (
    <div className="pt-10 bg-slate-200 sm:text-3xl">
      <CrewList crew={crew} />
      <Footer />
    </div>
  );
}
