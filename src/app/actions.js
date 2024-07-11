"use server";

import { cache } from "react";

import "server-only";
import { v4 as uuidv4 } from "uuid";

import influence from "./lib/influence-sdk";
import { influenceApiUrl } from "influence-typed-sdk/api";

import entityCrewmate from "./lib/crewmate";
import { GetTokenFormSchema } from "./lib/schema";

export const manageCrew = (formData) => {
  const cremateId = uuidv4();

  // console.log("Change crew button clicked", formData);
  const cremate = {
    id: cremateId,
    name: formData.get("name"),
  };
};

export const getAbilities = cache((crew) => {
  const stats = Object.values(entityCrewmate.ABILITY_TYPES);
  const classIds = Object.entries(entityCrewmate.CLASS_IDS);
  const classById = (id) => {
    const className = classIds.find(([key, value]) => value === id);
    return className ? className[0] : "N/A";
  };

  return stats
    .map((stat) => ({
      name: stat.name,
      class: stat.class,
      departments: Object.entries(stat.departments ?? {}),
      traits: Object.entries(stat.traits ?? {}),
      class: classById(stat.class),
      notFurtherModified: stat.notFurtherModified,
    }))
    .sort((a, b) => a.class.localeCompare(b.class));
});

export const getTitles = cache(() => {
  const titles = Object.values(entityCrewmate.TITLES)
    .filter((t) => t.name !== "None")
    .map((title) => {
      return {
        name: title.name,
        department: title.department
          ? entityCrewmate.DEPARTMENTS[title.department].name
          : "N/A",
        tier: title.tier ?? "N/A",
      };
    })
    .sort((a, b) => a.department.localeCompare(b.department));

  return titles;
});

export const getSVGColorByClass = cache((crewClass) => {
  const colors = {
    Miner: "fill-orange-400",
    Scientist: "fill-blue-400",
    Merchant: "fill-yellow-400",
    Pilot: "fill-purple-400",
    Engineer: "fill-red-400",
  };

  return colors[crewClass];
});

export const getJWTToken = cache(async (state, formData) => {
  const urls = {
    influence: influenceApiUrl,
    prerelease: process.env.INFLUENCE_API_PRERELEASE,
  };

  const result = GetTokenFormSchema.safeParse({
    api_url: formData.get("api_url"),
  });

  if (result.success) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const url = `${urls[result.data.api_url]}/v1/auth/token`;

    const response = await fetch(`${url}`, {
      method: "POST",
      body: JSON.stringify({
        grant_type: process.env.GRANT_TYPE,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
      }),
      headers: myHeaders,
    });
    const data = await response.json();

    return data;
  }

  if (result.error) {
    return { error: result.error.format() };
  }
});

export const getCrew = async (crewId) => {
  //TODO Auth fail
  const ownedCrew = await influence.api.utils.crews(crewId);
};
