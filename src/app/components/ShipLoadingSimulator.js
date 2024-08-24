"use client";
import { Inventory, Ship } from "@influenceth/sdk";
import { useDeepCompareEffect } from "react-use";

import { useState, useEffect, useMemo } from "react";
import ProgressBar from "@/components/ProgressBar";
import { AddProductForm } from "@/components/AddProductForm";

const ships = {
  // WAREHOUSE_PRIMARY: 10,
  CARGO_SMALL: { id: 15, transport: "SHUTTLE", short: "SH" },
  CARGO_MEDIUM: { id: 16, transport: "LIGHT_TRANSPORT", short: "LT" },
  CARGO_LARGE: { id: 17, transport: "HEAVY_TRANSPORT", short: "HT" },
};

export function AddShipForm({ shipId, onChangeShip, addShip }) {
  return (
    <form className="flex flex-col w-1/4 gap-3 p-2 my-2 text-base rounded-md bg-slate-50">
      <div className="">
        <label
          htmlFor={"inventory-type"}
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Ship Inventory
        </label>

        <select
          value={shipId}
          onChange={onChangeShip}
          id={"inventory-type"}
          name={"inventory-type"}
          className="capitalize mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
        >
          {Object.entries(ships).map(([k, v]) => (
            <option key={k} value={k}>
              {v.transport.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <button
        formAction={addShip}
        className="flex flex-row items-center justify-center w-full gap-2 px-3 py-2 text-sm font-semibold text-center rounded-md shadow-sm bg-slate-600 text-slate-50 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
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
            d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
          />
        </svg>

        <span>Add Ship</span>
      </button>
    </form>
  );
}

export function ShipInventory({ inv, setInventory }) {
  const [showProductForm, setShowProductForm] = useState(false);

  const { products, totals } = Inventory?.getContents(inv?.products || {});
  const storedMass = totals?.mass;
  const storedVolumen = totals?.volumen;

  // useDeepCompareEffect(() => {
  //   // GET product stats
  // }, [inv]);
  return (
    <>
      <div className="p-2 mb-4 rounded-sm bg-slate-200 ">
        <div className="uppercase">{`${inv?.key}`}</div>
        <div className="text-sm uppercase">{`${inv?.transport.replace(
          "_",
          " "
        )}`}</div>
        <ProgressBar
          label="Volumen"
          progress={storedVolumen}
          capacity={inv?.filledVolum}
        />
        <ProgressBar
          label="Mass"
          progress={storedMass}
          capacity={inv?.filledMass}
        />
      </div>

      {showProductForm && (
        <AddProductForm setInventory={setInventory} inv={inv} />
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

export default function InventoryLoadingSimulator() {
  // const stored = (progress / 100) * capacity;
  // const available = capacity - stored;

  const [shipId, setShipId] = useState("CARGO_MEDIUM");

  const { filledMass, filledVolume } = Inventory.getFilledCapacity(
    Inventory.IDS[shipId]
  );

  const [totalFilledMass, setTotalFilledMass] = useState(filledMass);
  const [storedMass, setStoredMass] = useState(0);

  const [totalFilledVolume, setTotalFilledVolume] = useState(filledVolume);
  const [storedVolume, setStoredVolume] = useState(0);

  const [inventory, setInventory] = useState([
    {
      key: `LT-1`,
      transport: "LIGHT_TRANSPORT",
      ...Inventory.getFilledCapacity(Inventory.IDS[shipId]),
      id: Inventory.IDS[shipId],
      stored: 0,
      products: {},
    },
  ]);

  useEffect(() => {
    const inventoryContents = inventory.map((invent) => {
      const { products, totals } = Inventory?.getContents(
        invent?.products || {}
      );

      const content = { mass: totals?.mass, volume: totals?.volume };
      return content;
    });

    const inventoryTotals = { mass: 0, volume: 0 };
    for (const element of inventoryContents) {
      inventoryTotals.mass = inventoryTotals.mass + element.mass;
      inventoryTotals.volume = inventoryTotals.volume + element.volume;
    }

    setStoredMass(inventoryTotals?.mass);
    setStoredVolume(inventoryTotals?.volume);
  }, [inventory]);

  function addShip(formData) {
    const filledCapacity = Inventory.getFilledCapacity(Inventory.IDS[shipId]);

    setInventory((prev) => [
      ...prev,
      {
        key: `${ships[shipId].short}-${inventory.length + 1}`,
        transport: `${ships[shipId].transport}`,
        ...filledCapacity,
        id: Inventory.IDS[shipId],
        storedVolumen: 0,
        storedMass: 0,
        products: {},
      },
    ]);

    setTotalFilledMass((prev) => prev + filledCapacity.filledMass);
    setTotalFilledVolume((prev) => prev + filledCapacity.filledVolume);
  }

  function onChangeShip(e) {
    setShipId(e.target.value);
  }
  return (
    <div className="p-2 rounded-md sm:p-10">
      <h1 className="py-10">Inventory Loading Simulator</h1>
      <div className="flex flex-col rounded-sm sm:p-6 bg-slate-100">
        <h2>Total Inventory</h2>
        <ProgressBar
          label="Volumen"
          progress={storedVolume}
          capacity={totalFilledVolume}
        />
        <ProgressBar
          label="Mass"
          progress={storedMass}
          capacity={totalFilledMass}
        />
      </div>

      <AddShipForm
        shipId={shipId}
        onChangeShip={onChangeShip}
        addShip={addShip}
      />

      <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2 lg:grid-cols-3 ">
        {inventory.map((inv) => (
          <div key={inv?.key} className="p-2 rounded-md bg-slate-100">
            <ShipInventory inv={inv} setInventory={setInventory} />
          </div>
        ))}
      </div>
    </div>
  );
}
