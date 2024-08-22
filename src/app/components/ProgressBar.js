export default function ProgressBar({
  label = "Volumen",
  progress = 0,
  capacity = 100,
}) {
  const stored = (progress / 100) * capacity;
  const available = capacity - stored;

  // mass is in g, volume is in mL
  return (
    <div className="">
      <h4 className="sr-only">Status</h4>
      <div className="flex flex-row justify-between">
        <div className="text-base font-medium text-slate-900">{label}</div>
        <div
          className={`text-sm font-medium  ${
            progress < 80 ? "text-indigo-900" : "text-red-600"
          }`}
        >{`${progress}% (${stored})`}</div>
      </div>
      <div aria-hidden="true" className="mt-2">
        <div className="overflow-hidden rounded-full bg-slate-50">
          <div
            style={{ width: `${progress}%` }}
            className={`h-2 ${
              progress < 80 ? "bg-indigo-600" : "bg-red-600"
            } rounded-full`}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between mt-1">
        <div className="text-sm font-medium text-slate-900">{`Capacity: ${capacity}`}</div>
        <div className="text-sm font-medium text-slate-900">{`Stored: ${stored}`}</div>
        <div className="text-sm font-medium text-slate-900">{`Available: ${available}`}</div>
      </div>
    </div>
  );
}
