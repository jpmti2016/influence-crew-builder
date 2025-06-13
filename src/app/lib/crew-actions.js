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
    console.log('=== Starting fetchCrewmatesForAddress for StarkNet address:', address)
    console.log('Environment check - Access token exists:', !!process.env.INFLUENCE_API_ACCESS_TOKEN)
    
    // Fetch both crews and standalone crewmates in parallel
    const [crews, standaloneCrewmates] = await Promise.all([
      influenceApi.util.crews(address),
      fetchStandaloneCrewmates(address)
    ])
    
    console.log('Crews found:', crews.length)
    console.log('Standalone crewmates found:', standaloneCrewmates.length)
    
    // Log crew details for debugging
    if (crews.length > 0) {
      console.log('Crew details:', crews.map(c => ({ id: c.id, rosterSize: c.Crew?.roster?.length || 0 })))
    }
    
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
            ...normalizeCrewmateData(crewmate),
            crewInfo,
            isInCrew: true,
          })
        })
      }
    }

    // Add standalone crewmates (not in crews)
    console.log('Processing standalone crewmates:', standaloneCrewmates.length)
    standaloneCrewmates.forEach((crewmate, index) => {
      console.log(`Processing standalone crewmate ${index}:`, JSON.stringify(crewmate, null, 2))
      try {
        const normalizedCrewmate = normalizeCrewmateData(crewmate)
        if (normalizedCrewmate) {
          allCrewmates.push({
            ...normalizedCrewmate,
            crewInfo: null,
            isInCrew: false,
          })
          console.log(`Successfully added standalone crewmate ${crewmate.id}`)
        } else {
          console.error(`Failed to normalize crewmate ${crewmate?.id}`)
        }
      } catch (error) {
        console.error(`Error processing standalone crewmate ${crewmate?.id}:`, error)
      }
    })
    
    console.log('=== Total crewmates returned:', allCrewmates.length)
    console.log('Breakdown - In crews:', allCrewmates.filter(c => c.isInCrew).length, 'Standalone:', allCrewmates.filter(c => !c.isInCrew).length)
    
    return allCrewmates
  } catch (error) {
    console.error('Error fetching crewmates:', error)
    throw new Error('Failed to fetch crewmates')
  }
}

async function fetchStandaloneCrewmates(address) {
  try {
    console.log('Fetching standalone crewmates for StarkNet address:', address)
    
    // Use Influence SDK to query crewmates owned by the StarkNet address
    // Focus only on StarkNet ownership path
    let allOwnedCrewmates = []
    
    try {
      console.log('Using Influence SDK to fetch crewmates by StarkNet owner...')
      
      // Use SDK entities method with StarkNet ownership path
      allOwnedCrewmates = await influenceApi.entities({
        match: {
          path: 'Nft.owner',
          value: address
        },
        label: 2 // Entity.IDS.CREWMATE
      })
      
      console.log(`Found ${allOwnedCrewmates.length} crewmates owned by StarkNet address`)
      console.log('Sample crewmate data:', allOwnedCrewmates.length > 0 ? allOwnedCrewmates[0] : 'None')
      
    } catch (sdkError) {
      console.log('SDK entities query failed:', sdkError.message)
      
      // Fallback: try with normalized address format
      try {
        console.log('Trying with normalized StarkNet address format...')
        const normalizedAddress = address.toLowerCase()
        
        allOwnedCrewmates = await influenceApi.entities({
          match: {
            path: 'Nft.owner', 
            value: normalizedAddress
          },
          label: 2
        })
        
        console.log(`Found ${allOwnedCrewmates.length} crewmates with normalized address`)
        
      } catch (normalizedError) {
        console.log('Normalized address SDK query also failed:', normalizedError.message)
        return []
      }
    }

    if (allOwnedCrewmates.length === 0) {
      console.log('No crewmates found for this StarkNet address')
      return []
    }

    // Get crewmates already in crews to filter them out
    const crewmatesInCrews = new Set()
    const crews = await influenceApi.util.crews(address)
    console.log(`Found ${crews.length} crews for filtering`)
    
    for (const entity of crews) {
      if (entity.Crew && entity.Crew.roster.length > 0) {
        entity.Crew.roster.forEach(crewmate => {
          crewmatesInCrews.add(crewmate.id)
        })
      }
    }

    // Return only standalone crewmates (not in any crew)
    const standaloneCrewmates = allOwnedCrewmates.filter(crewmate => !crewmatesInCrews.has(crewmate.id))
    console.log(`Returning ${standaloneCrewmates.length} standalone crewmates (${allOwnedCrewmates.length} total - ${crewmatesInCrews.size} in crews)`)
    
    return standaloneCrewmates
  } catch (error) {
    console.error('Error fetching standalone crewmates:', error)
    // Return empty array if standalone crewmates fetch fails
    // This allows the function to still return crew-based crewmates
    return []
  }
}

function normalizeCrewmateData(crewmate) {
  if (!crewmate) {
    console.error('Attempting to normalize null/undefined crewmate')
    return null
  }
  
  console.log('Normalizing crewmate:', crewmate.id, 'Original data:', JSON.stringify(crewmate, null, 2))
  
  // Ensure base Crewmate component exists
  const baseCrewmate = crewmate.Crewmate || {}
  
  const normalized = {
    ...crewmate,
    // Ensure required Control component exists
    Control: crewmate.Control || {
      controller: null
    },
    // Ensure required Crewmate component with status exists
    Crewmate: {
      ...baseCrewmate,
      status: baseCrewmate.status !== undefined ? baseCrewmate.status : 0,
      // Add other common fields that might be expected
      class: baseCrewmate.class || crewmate.class || 1,
      collection: baseCrewmate.collection || crewmate.collection || 1,
      traits: baseCrewmate.traits || crewmate.traits || [],
      title: baseCrewmate.title || crewmate.title || null
    }
  }
  
  console.log('Normalized crewmate:', normalized.id, 'Normalized data:', JSON.stringify(normalized, null, 2))
  return normalized
}

async function getCrewBusyLocation(entity) {
  if (entity.Crew?.actionTarget) {
    return influenceApi.entity(entity.Crew.actionTarget)
  }
  return null
}

// Debug function to test SDK connectivity and crewmate data structure
export async function debugCrewmateAPI(crewmateId = 1) {
  try {
    console.log('=== DEBUG: Testing Influence SDK connectivity ===')
    
    // Test 1: Fetch a specific crewmate by ID using SDK
    console.log(`Testing SDK entity fetch for crewmate ID: ${crewmateId}`)
    try {
      const singleCrewmate = await influenceApi.entity({
        id: crewmateId,
        label: 2 // Entity.IDS.CREWMATE
      })
      console.log('SDK single crewmate structure:', JSON.stringify(singleCrewmate, null, 2))
    } catch (error) {
      console.log('Single crewmate SDK fetch failed:', error.message)
    }
    
    // Test 2: Fetch multiple crewmates using SDK
    console.log('Testing SDK entities fetch for multiple crewmates')
    try {
      const sampleCrewmates = await influenceApi.entities({
        id: [1, 2, 3, 4, 5],
        label: 2 // Entity.IDS.CREWMATE
      })
      console.log('SDK sample crewmates structure:')
      console.log(JSON.stringify(sampleCrewmates, null, 2))
      
      if (Array.isArray(sampleCrewmates)) {
        sampleCrewmates.forEach((crewmate) => {
          console.log(`SDK Crewmate ${crewmate.id}:`, {
            nft: crewmate.Nft,
            name: crewmate.Name,
            control: crewmate.Control,
            crewmateComponent: crewmate.Crewmate
          })
        })
      }
    } catch (error) {
      console.log('Multiple crewmates SDK fetch failed:', error.message)
    }
    
    return { success: 'SDK tests completed, check console for details' }
  } catch (error) {
    console.error('Debug SDK test failed:', error)
    return { error: error.message }
  }
}