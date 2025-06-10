import { makeInfluenceApi, influenceApiUrl } from "influence-typed-sdk/api";
import { makeInfluenceImageUrls } from "influence-typed-sdk/images";
import WalletConnection from "../components/WalletConnection";

export const influenceApi = makeInfluenceApi({
  baseUrl: influenceApiUrl,
  accessToken: process.env.INFLUENCE_API_ACCESS_TOKEN ?? "",
});

export const getCrews = async (address) =>
  influenceApi.util
    .crews(address)
    .then((crews) =>
      Promise.all(
        crews.flatMap(async (entity) => {
          if (!entity.Crew || entity.Crew.roster.length === 0) return [];

          const asteroidId = entity.Location?.locations?.asteroid?.id;

          const ship = entity.Location?.locations?.ship;
          const building = entity.Location?.locations?.building;
          const station = ship ?? building;
          const actionLocation = await getCrewBusyLocation(entity);
          const habitat = station
            ? await influenceApi.entity(station)
            : undefined;

          return [
            {
              id: entity.id,
              name: entity.Name ?? `Crew #${entity.id}`,
              readyAt: new Date(entity.Crew.readyAt),
              actionLocation,
              habitat,
              roster: entity.Crew.roster,
              asteroidId,
              lotLocation: entity.Location?.locations.lot,
            },
          ];
        })
      )
    )
    .then((e) => e.flat());

const getCrewBusyLocation = (entity) => {
  if (entity.Crew?.actionTarget) {
    return influenceApi.entity(entity.Crew.actionTarget);
  }
};

export default async function Login() {
  console.log("api object", influenceApi.util.ships);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900 mb-2">
            Influence Crew Builder
          </h1>
          <p className="text-center text-sm text-gray-600">
            Connect your wallet to manage your crews
          </p>
        </div>
        <WalletConnection />
      </div>
    </div>
  );
}
