import { formatVol, formatMass } from "../utils";

export default function Products({ products }) {
  return (
    <div>
      {[
        { productId: 1, useId: null, filledMass: 1000, filledVolume: 5000 },
        { productId: 2, useId: "WH", filledMass: 1000, filledVolume: 5000 },
        { productId: 3, useId: "LT", filledMass: 1000, filledVolume: 5000 },
        { productId: 4, useId: "REF", filledMass: 1000, filledVolume: 5000 },
      ].map((prod) => (
        <div key={prod.productId}>
          <div className="text-sm">{prod.productId}</div>
          <div className="text-sm"> {prod.useId ?? "NA"}</div>
          <div className="text-sm"> {formatMass(prod.filledMass)}</div>
          <div className="text-sm"> {formatVol(prod.filledVolume)}</div>
        </div>
      ))}
    </div>
  );
}
