import { getJWTToken } from "../actions";
import GetTokenForm from "./GetTokenForm";

export default function GetToken() {
  //   const getInfluenceToken = getJWTToken.bind(null, process.env.INFLUENCE_API);
  return (
    <div className="px-4 text-xl sm:px-6 lg:px-8 ">
      <h1 className="mb-4 sm:mb-6 lg:mb-8">Get Token</h1>

      <GetTokenForm />
    </div>
  );
}
