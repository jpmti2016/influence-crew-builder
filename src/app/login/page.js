import { makeInfluenceApi, influenceApiUrl } from "influence-typed-sdk/api";
import { makeInfluenceImageUrls } from "influence-typed-sdk/images";

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
  // console.log(
  //   "influenceApi object",
  //   await getCrews(
  //     "0x0243f739A0D94059222c741d8B8D283Ab5922e40db3529A23bbB5306652a2c84"
  //   )
  // );

  // console.log('influenceApi')

  return <div>Login</div>;
}
