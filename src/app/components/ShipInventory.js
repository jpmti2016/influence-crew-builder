import { useState, useEffect, useMemo } from "react";
import { Inventory, Ship, ProductionJSON } from "@influenceth/sdk";
import ProgressBar from "@/components/ProgressBar";
import Products from "@/components/Products";
import AddProductForm from "@/components/AddProductForm";

export default function ShipInventory({
  shipInventory,
  setInventory,
  maxVolByShipUnit,
  maxMassByShipUnit,
}) {
  const [showProductForm, setShowProductForm] = useState(false);

  const { products, totals } = Inventory?.getContents(
    () => covertProductsToIdValuePair(shipInventory?.products) || {}
  );
  const storedMass = totals?.mass;
  const storedVolumen = totals?.volumen;

  // useDeepCompareEffect(() => {
  //   // GET product stats
  // }, [shipInventory]);
  return (
    <>
      <div className="p-2 mb-4 rounded-sm bg-slate-200 ">
        <div className="uppercase">{`${shipInventory?.key}`}</div>
        <div className="text-sm uppercase">{`${shipInventory?.transport?.replace(
          "_",
          " "
        )}`}</div>
        <ProgressBar
          label="Volumen"
          progress={storedVolumen}
          capacity={shipInventory?.filledVolume}
        />
        <ProgressBar
          label="Mass"
          progress={storedMass}
          capacity={shipInventory?.filledMass}
        />
      </div>

      <Products />
      {showProductForm && (
        <AddProductForm
          setInventory={setInventory}
          shipInventory={shipInventory}
          maxVolByShipUnit={maxVolByShipUnit}
          maxMassByShipUnit={maxMassByShipUnit}
        />
      )}

      <button
        onClick={() => setShowProductForm((prev) => !prev)}
        className="flex flex-row items-center justify-center w-auto gap-2 px-3 py-2 text-sm font-semibold text-center rounded-md shadow-sm bg-slate-600 text-slate-50 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <span>Add Product</span>
      </button>
    </>
  );
}
