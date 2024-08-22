"use client";
import { Inventory, Ship, Product } from "@influenceth/sdk";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export function FilterProducts() {
  return (
    <fieldset>
      <legend className="sr-only">Notifications</legend>
      <div className="space-y-3">
        {Object.entries(Product.CLASSIFICATIONS).map((k) => (
          <div key={k[0]} className="relative flex items-start">
            <div className="flex items-center h-6">
              <input
                id={k[0]}
                name={k[0]}
                type="checkbox"
                aria-describedby={k[0]}
                className="w-4 h-4 border-gray-300 rounded text-slate-600 focus:ring-slate-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor={k[0]} className="font-medium text-gray-900">
                {`${k[1]}`}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export function AddProductForm() {
  const [productClassification, setProductClassification] =
    useState("MANUFACTURED_GOOD");
  const [listByClassification, setListByClassification] = useState(
    Product.getListByClassification(
      Product.CLASSIFICATIONS[productClassification]
    )
  );
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    setListByClassification(
      Product.getListByClassification(
        Product.CLASSIFICATIONS[productClassification]
      )
    );
  }, [productClassification]);

  // CLASSIFICATIONS.REFINED_MATERIAL

  function onChangeClassification(e) {
    setProductClassification(e.target.value);
  }

  function onChangeListByClassification(e) {
    setSelectedProduct(e.target.value);
  }
  return (
    <form>
      <div className="">
        <label
          htmlFor={"product-classification"}
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Ship Inventory
        </label>

        <select
          value={productClassification}
          onChange={onChangeClassification}
          id={"product-classification"}
          name={"product-classification"}
          className="capitalize mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
        >
          {Object.entries(Product.CLASSIFICATIONS).map(([k, v]) => (
            <option key={k} value={k}>
              {k.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>
      <div className="">
        <label
          htmlFor={"list-by-classification"}
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Ship Inventory
        </label>

        <select
          value={selectedProduct}
          onChange={onChangeListByClassification}
          id={"list-by-classification"}
          name={"list-by-classification"}
          className="capitalize mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-slate-900 ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
        >
          {listByClassification.map((p) => (
            <option key={p} value={p}>
              {Product.TYPES[p].name}
            </option>
          ))}
        </select>

        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Quantity
          </label>
          <div className="mt-2">
            <input
              id="quantity"
              name="quantity"
              type="text"
              placeholder="1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      {/* TODO Sum the volume and mass */}
    </form>
  );
}

export function AddShipForm({ shipId, onChangeShip, addShip }) {
  const ships = {
    // WAREHOUSE_PRIMARY: 10,
    CARGO_SMALL: { id: 15, transport: "SHUTTLE" },
    CARGO_MEDIUM: { id: 16, transport: "LIGHT_TRANSPORT" },
    CARGO_LARGE: { id: 17, transport: "HEAVY_TRANSPORT" },
  };

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
  return (
    <>
      <div className="p-2 bg-slate-200">
        <div className="uppercase">{`${inv?.key}`}</div>
        <ProgressBar label="Volumen" progress={45} capacity={inv.filledVolum} />
        <ProgressBar label="Mass" progress={85} capacity={inv.filledMass} />
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

export default function InventoryLoadingSimulator({ inventoryType = "inv" }) {
  // const stored = (progress / 100) * capacity;
  // const available = capacity - stored;

  let totalFilledMass = 0;
  let totalFilledVolume = 0;

  const [shipId, setShipId] = useState("CARGO_SMALL");

  const [inventory, setInventory] = useState([
    {
      key: `SHUTTLE-1`,
      ...Inventory.getFilledCapacity(Inventory.IDS[shipId]),
      id: Inventory.IDS[shipId],
      stored: 0,
      products: [],
    },
  ]);

  function addShip(formData) {
    setInventory((prev) => [
      ...prev,
      {
        key: `${shipId}-${inventory.length + 1}`,
        ...Inventory.getFilledCapacity(Inventory.IDS[shipId]),
        id: Inventory.IDS[shipId],
        storedVolumen: 0,
        storedMass: 0,
        products: [],
      },
    ]);
  }

  function onChangeShip(e) {
    setShipId(e.target.value);
  }
  return (
    <div className="p-2 sm:p-10 ">
      <h1 className="py-10">Inventory Loading Simulator</h1>
      <div className="flex flex-col rounded-sm sm:p-6 bg-slate-100">
        <ProgressBar label="Volumen" progress={45} capacity={100} />
        <ProgressBar label="Mass" progress={85} capacity={500} />
      </div>

      <AddShipForm
        shipId={shipId}
        onChangeShip={onChangeShip}
        addShip={addShip}
      />

      <div className="flex flex-row flex-wrap gap-3 py-2">
        {inventory.map((inv) => (
          <div key={inv.key} className="flex-wrap p-2 bg-slate-400">
            <ShipInventory inv={inv} setInventory={setInventory} />
          </div>
        ))}
      </div>
    </div>
  );
}
