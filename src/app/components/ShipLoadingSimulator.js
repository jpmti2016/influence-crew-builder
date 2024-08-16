"use client";
import { Inventory, Ship } from "@influenceth/sdk";
import { useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export function ShipToLoad({
  inventoryType = Inventory.getType(Inventory.IDS.WAREHOUSE_PRIMARY),
}) {
  console.log("Type", Inventory.getType(Inventory.IDS.WAREHOUSE_PRIMARY));
  console.log(
    "Inventory",
    Inventory.getFilledCapacity(Inventory.IDS.WAREHOUSE_PRIMARY)
  );
  // console.log("Inventory", Inventory);
  const [inventory, setInventory] = useState([
    Inventory.getFilledCapacity(inventoryType),
  ]);
  return <div className="py-6">Ship</div>;
}

export default function InventoryLoadingSimulator({
  inventoryType = "warehouse",
}) {
  const [ships, setShips] = useState([]);

  function onChangeClass(e) {
    e.preventDefault();

    //   setSimulatedCrewmateClass(Number(e.target.value));
    //   setSimulatedCrewmateTrait(
    //     Number(TRAITS_BY_CLASS[Number(e.target.value)][0])
    //   );

    console.log("onchangeclass");
  }
  return (
    <div className="p-2 sm:p-10 ">
      <h1 className="py-10">Inventory Loading Simulator</h1>
      <div className="flex flex-col rounded-sm bg-slate-100">
        <ProgressBar label="Volumen" progress={45} capacity={100} />
        <ProgressBar label="Mass" progress={85} capacity={500} />
      </div>

      <ShipToLoad />

      <form className="flex flex-col gap-3 p-2 text-base rounded-md bg-slate-50">
        <div className="">
          <label
            htmlFor={`classId-${inventoryType}`}
            className="block text-sm font-medium leading-6 text-slate-900"
          >
            Class
          </label>
          <select
            value={inventoryType}
            onChange={onChangeClass}
            id={`classId-${inventoryType}`}
            name={`classId-${inventoryType}`}
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
          >
            {["option value"]
              .filter((c) => c !== 0)
              .map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
      </form>
    </div>
  );
}
