"use client";
import { useEffect, useState } from "react";
import { Inventory, Ship, Product } from "@influenceth/sdk";

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
                className="w-4 h-4 rounded border-slate-300 text-slate-600 focus:ring-slate-600"
              />
            </div>
            <div className="ml-3 text-sm leading-6">
              <label htmlFor={k[0]} className="font-medium text-slate-900">
                {`${k[1]}`}
              </label>
            </div>
          </div>
        ))}
      </div>
    </fieldset>
  );
}

export function AddProductForm({ setInventory, inv }) {
  const [productClassification, setProductClassification] =
    useState("MANUFACTURED_GOOD");

  const [listByClassification, setListByClassification] = useState(() =>
    Product.getListByClassification(
      Product.CLASSIFICATIONS[productClassification]
    )
  );
  const [selectedProduct, setSelectedProduct] = useState(
    () => listByClassification[0]
  );

  useEffect(() => {
    setListByClassification(
      Product.getListByClassification(
        Product.CLASSIFICATIONS[productClassification]
      )
    );
  }, [productClassification]);

  useEffect(() => {
    setSelectedProduct(listByClassification[0]);
  }, [listByClassification]);

  // CLASSIFICATIONS.REFINED_MATERIAL

  function onChangeClassification(e) {
    setProductClassification(e.target.value);
  }

  function onChangeListByClassification(e) {
    setSelectedProduct(e.target.value);
  }

  function onSave(formData) {
    const productClassification = formData.get("product-classification");
    const listByClassification = formData.get("list-by-classification");
    const quantity = formData.get("quantity");

    setInventory((inventory) =>
      inventory.map((i) => {
        if (i.key === inv.key) {
          return {
            ...i,
            products: { ...inv.products, [selectedProduct]: quantity },
          };
        }
        return i;
      })
    );
  }
  return (
    <form className="p-2 mb-4 space-y-4 bg-slate-50">
      <div className="">
        <label
          htmlFor={"product-classification"}
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Classification
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
          Product
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
      </div>
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium leading-6 text-slate-900"
        >
          Quantity
        </label>
        <div className="mt-2">
          <input
            id="quantity"
            name="quantity"
            type="number"
            placeholder="1"
            className="block w-full rounded-md border-0 py-1.5 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      {/* TODO Sum the volume and mass */}
      <button
        formAction={onSave}
        className="flex flex-row items-center justify-center w-auto gap-2 px-3 py-2 text-sm font-semibold text-center rounded-md shadow-sm bg-slate-600 text-slate-50 hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
      >
        <span>Save</span>
      </button>
    </form>
  );
}
