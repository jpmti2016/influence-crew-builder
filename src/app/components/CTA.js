export default function CTA() {
  return (
    <div className="mb-4 bg-slate-50">
      <div className="mx-auto max-w-7xl ">
        <div className="relative px-6 py-24 overflow-hidden text-center shadow-2xl bg-slate-900 isolate ">
          <h2 className="max-w-2xl mx-auto text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">
            Adalian Crew Simulator
          </h2>
          {/* <p className="max-w-xl mx-auto mt-6 text-lg leading-8 text-slate-300">
            If you find it helpful send some resources to Warehouse #8,735
          </p> */}

          <svg
            viewBox="0 0 1024 1024"
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
          >
            <circle
              r={512}
              cx={512}
              cy={512}
              fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}
