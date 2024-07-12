import { BonusClass } from "../components/BonusClass";
import { BonusTraits } from "../components/BonusTraits";
import { BonusTitles } from "../components/BonusTitles";
import { getBonus } from "../utils";

export default function BonusByAbility({ simulatedCrew }) {
  const bonuses = getBonus(simulatedCrew);
  return (
    <div className="mb-4 sm:mb-8 lg:mb-10">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h2 className="mb-4 text-2xl font-semibold leading-6 text-slate-900">
            Bonus by Abilities
          </h2>
        </div>
      </div>
      <div className="flow-root overflow-auto">
        {/* <div className=""> */}
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-slate-300">
                <thead className="bg-slate-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-slate-900 sm:pl-6"
                    >
                      Ability
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                    >
                      Class
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                    >
                      Traits
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                    >
                      Titles
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                    >
                      Crewmates Multiplier
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                    >
                      Station Multiplier
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                    >
                      Food Multiplier
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-slate-900"
                    >
                      Total Bonus
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {bonuses?.map((bonus) => (
                    <tr key={bonus?.name}>
                      <td className="py-4 pl-4 pr-3 text-sm font-medium text-slate-900 whitespace-nowrap sm:pl-6">
                        {bonus?.name}
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap">
                        <BonusClass bonusClass={bonus?.class} />
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap">
                        <BonusTraits traits={bonus?.traits} />
                      </td>
                      <td className="px-3 py-4 text-sm text-slate-500 whitespace-nowrap">
                        <BonusTitles titles={bonus?.titles} />
                      </td>
                      <td className="px-3 py-4 text-lg text-slate-500 whitespace-nowrap">
                        {bonus?.crewmatesMultiplier?.toFixed(4)}
                      </td>
                      <td className="px-3 py-4 text-lg text-slate-500 whitespace-nowrap">
                        {bonus?.stationMultiplier?.toFixed(4) || (
                          <span className="text-sm">{"N/A"}</span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-lg text-slate-500 whitespace-nowrap">
                        {bonus?.foodMultiplier?.toFixed(4) || (
                          <span className="text-sm">{"N/A"}</span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-lg font-semibold text-slate-500 whitespace-nowrap">
                        {bonus?.totalBonus?.toFixed(4)}
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
