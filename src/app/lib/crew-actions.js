'use server'

import { makeInfluenceApi, influenceApiUrl } from "influence-typed-sdk/api"

const influenceApi = makeInfluenceApi({
  baseUrl: influenceApiUrl,
  accessToken: process.env.INFLUENCE_API_ACCESS_TOKEN ?? "",
})

export async function fetchCrewsForAddress(address) {
  if (!address) {
    return []
  }

  try {
    const crews = await influenceApi.util.crews(address)
    
    const processedCrews = await Promise.all(
      crews.flatMap(async (entity) => {
        if (!entity.Crew || entity.Crew.roster.length === 0) return []

        const asteroidId = entity.Location?.locations?.asteroid?.id

        const ship = entity.Location?.locations?.ship
        const building = entity.Location?.locations?.building
        const station = ship ?? building
        const actionLocation = await getCrewBusyLocation(entity)
        const habitat = station
          ? await influenceApi.entity(station)
          : undefined

        return [
          {
            id: entity.id,
            name: entity.Name ?? `Crew #${entity.id}`,
            readyAt: entity.Crew.readyAt,
            actionLocation,
            habitat,
            roster: entity.Crew.roster,
            asteroidId,
            lotLocation: entity.Location?.locations.lot,
          },
        ]
      })
    )

    return processedCrews.flat()
  } catch (error) {
    console.error('Error fetching crews:', error)
    throw new Error('Failed to fetch crews')
  }
}

export async function fetchCrewmatesForAddress(address) {
  if (!address) {
    return []
  }

  try {
    const crews = await influenceApi.util.crews(address)
    const allCrewmates = []
    
    // Extract all crewmates from all crews
    for (const entity of crews) {
      if (entity.Crew && entity.Crew.roster.length > 0) {
        const crewInfo = {
          crewId: entity.id,
          crewName: entity.Name ?? `Crew #${entity.id}`,
          asteroidId: entity.Location?.locations?.asteroid?.id,
          readyAt: entity.Crew.readyAt,
        }

        // Add crew info to each crewmate
        entity.Crew.roster.forEach(crewmate => {
          allCrewmates.push({
            ...crewmate,
            crewInfo,
            isInCrew: true,
          })
        })
      }
    }
    
    return allCrewmates
  } catch (error) {
    console.error('Error fetching crewmates:', error)
    throw new Error('Failed to fetch crewmates')
  }
}

async function getCrewBusyLocation(entity) {
  if (entity.Crew?.actionTarget) {
    return influenceApi.entity(entity.Crew.actionTarget)
  }
  return null
}