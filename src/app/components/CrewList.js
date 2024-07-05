import Titles from "./Titles";
import Abilities from "./Abilities";
import Avatar from "./Avatar";

export function CrewList({ crew }) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="p-4 bg-slate-200">
        {
          <div>
            <div
              role="list"
              className="grid max-w-2xl grid-cols-1 gap-2 mx-auto mb-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-5 sm:gap-3 lg:gap-8"
            >
              {crew?.map((crewmate) => (
                <div key={crewmate.id} className="">
                  <Avatar crewmate={crewmate} />
                </div>
              ))}
            </div>
            <Titles />
            <Abilities crew={crew} />
          </div>
        }
      </div>
    </div>
  );
}
