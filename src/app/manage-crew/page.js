import { crew } from "../utils";
import { CrewList } from "../components/CrewList";
import Footer from "../components/Footer";

export default function ManageCrew() {
  return (
    <div>
      <CrewList crew={crew} />
      <Footer />
    </div>
  );
}
