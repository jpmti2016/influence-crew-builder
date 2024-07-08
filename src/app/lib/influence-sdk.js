import { makeInfluenceApi } from "influence-typed-sdk/api";

import { makeInfluenceImageUrls } from "influence-typed-sdk/images";

let instance;

class InfluenceSDK {
  constructor() {
    if (instance) {
      throw new Error("You can only create one instance!");
    }

    this.api = makeInfluenceApi({
      baseUrl: process.env.INFLUENCE_API,
      accessToken: process.env.INFLUENCE_API_TOKEN,
    });

    this.imageUrls = makeInfluenceImageUrls({
      cloudfrontImageHost: "d2xo5vocah3zyk.cloudfront.net",
      apiImagesUrl: "https://images.influenceth.io/v1",
      cloudfrontBucket: "unstoppablegames",
    });
    instance = this;
  }

  getInstance() {
    return this;
  }
}

export default Object.freeze(new InfluenceSDK());
