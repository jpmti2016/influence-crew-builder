import Footer from "@/components/Footer";
import ShipLoadingSimulator from "@/components/ShipLoadingSimulator";

export default function SimulateLoading() {
  return (
    <div className="pt-10 bg-slate-200 sm:text-3xl">
      <ShipLoadingSimulator />
      <Footer />
    </div>
  );
}
