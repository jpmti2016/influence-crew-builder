import { getTitles } from "../actions";

export default function Titles() {
  const titles = getTitles();

  return (
    <div className="px-4 mb-4 sm:mb-8 lg:mb-10 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="text-base font-semibold leading-6 text-slate-900">
            Titles
          </h2>
        </div>
      </div>
      <div className="flow-root mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-slate-300">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                    >
                      Tier
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {titles?.map((title) => (
                    <tr key={title.name}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900 whitespace-nowrap sm:pl-6">
                        {title.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap">
                        {title.department}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap">
                        {title.tier}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
