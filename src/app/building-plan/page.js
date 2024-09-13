"use client";
import { Inventory, Ship, Building, Product } from "@influenceth/sdk";
import { formatMass, formatVol } from "@/app/utils";

export function BuildingCard({ id }) {
  const requirements = Building.getConstructionType(id).requirements;
  const products = Object.entries(requirements).map(([id, qty]) => ({
    name: Product.getType(id).name,
    isAtomic: Product.getType(id).isAtomic,
    quantity: qty,
  }));

  const sortedByName = products.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="flex flex-col items-start p-2 rounded-md">
      {sortedByName.map(({ name, isAtomic, quantity }) => (
        <div
          className="flex flex-row justify-between w-full gap-2 p-2"
          key={name}
        >
          <div className="">{`${name}`}</div>
          <div className="p-1 bg-slate-100 rounded-2xl justify-self-start">
            {isAtomic ? quantity : formatMass(quantity * 1000)}
          </div>
        </div>
      ))}
    </div>
  );
}

import { useState } from "react";
export default function BuildingPlan() {
  const [asteroids, setAsteroids] = useState([
    { id: "9685-CMS", spectralType: "CMS", area: 288 },
  ]);

  return (
    <div className="p-2 pt-10 ">
      <h1 className="mb-4 text-2xl font-bold leading-6 sm:text-3xl text-slate-900 lg:mb-10 sm:mb-8">
        Building Plan
      </h1>
      <div className="grid grid-cols-1 gap-1 sm:gap-4 sm:grid-cols-2">
        {Object.values(Building.TYPES).map((building, index) => {
          if (building.name !== "Empty Lot") {
            return (
              <div key={building.i} className="p-4 bg-slate-200 ">
                <div className="py-2 font-semibold">{building.name}</div>
                <BuildingCard id={building.i} />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
