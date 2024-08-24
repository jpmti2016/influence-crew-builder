export default function ProgressBar({
  label = "Volumen",
  progress = 0,
  capacity = 100,
}) {
  const percentageStored = (progress * 100) / capacity;
  const available = capacity - progress;

  // mass is in g, volume is in mL
  return (
    <div className="space-y-2 sm:space-y-4">
      <h4 className="sr-only">Status</h4>
      <div className="flex flex-row justify-between">
        <div className="text-base font-medium text-slate-900">{label}</div>
        <div
          className={`text-sm font-medium  ${
            percentageStored < 80 ? "text-slate-400" : "text-red-400"
          }`}
        >{`${percentageStored}% (${progress})`}</div>
      </div>
      <div aria-hidden="true" className="mt-2">
        <div className="overflow-hidden rounded-full bg-slate-50">
          <div
            style={{ width: `${progress}%` }}
            className={`h-2 ${
              percentageStored < 80 ? "bg-slate-400" : "bg-red-400"
            } rounded-full`}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between mt-1">
        <div className="text-sm font-medium text-slate-900">{`Capacity: ${capacity}`}</div>
        <div className="text-sm font-medium text-slate-900">{`Stored: ${progress}`}</div>
        <div className="text-sm font-medium text-slate-900">{`Available: ${available}`}</div>
      </div>
    </div>
  );
}
