'use client'

import { useState } from 'react'
import { Crewmate } from "@influenceth/sdk"
import CollectionBadge from './CollectionBadge'

export default function UserCrewsList({ crews }) {
  const [expandedCrew, setExpandedCrew] = useState(null)

  const toggleCrewExpansion = (crewId) => {
    setExpandedCrew(expandedCrew === crewId ? null : crewId)
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString()
  }

  const getCrewStatus = (readyAt) => {
    const now = new Date()
    const readyTime = new Date(readyAt)
    if (readyTime <= now) {
      return { status: 'Ready', color: 'text-green-600 bg-green-100' }
    } else {
      return { status: 'Busy', color: 'text-orange-600 bg-orange-100' }
    }
  }

  if (!crews || crews.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No crews found.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="space-y-6">
        {crews.map((crew) => {
          const status = getCrewStatus(crew.readyAt)
          const isExpanded = expandedCrew === crew.id
          
          return (
            <div key={crew.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Crew Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCrewExpansion(crew.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {crew.name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                      {status.status}
                    </span>
                    <span className="text-sm text-gray-500">
                      {crew.roster.length} crewmate{crew.roster.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Ready at:</p>
                      <p className="text-sm font-medium">
                        {formatDate(crew.readyAt)}
                      </p>
                    </div>
                    <div className="transform transition-transform duration-200">
                      {isExpanded ? (
                        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>

                {/* Crew metadata */}
                <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-600">
                  {crew.asteroidId && (
                    <span>Asteroid: {crew.asteroidId}</span>
                  )}
                  {crew.habitat && (
                    <span>Location: {crew.habitat.Name || 'Station'}</span>
                  )}
                  {crew.actionLocation && (
                    <span>Action: {crew.actionLocation.Name || 'Active'}</span>
                  )}
                </div>
              </div>

              {/* Expanded Crewmates */}
              {isExpanded && (
                <div className="px-6 pb-6">
                  <div className="border-t pt-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Crewmates ({crew.roster.length})
                    </h4>
                    
                    {crew.roster.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {crew.roster.map((crewmate, index) => {
                          const crewmateClass = Crewmate.getClass(crewmate.class)
                          const primaryTrait = crewmate.traits?.[0] ? Crewmate.getTrait(crewmate.traits[0]) : null
                          const title = crewmate.title ? Crewmate.getTitle(crewmate.title) : null
                          
                          return (
                            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
                              {/* Collection Badge */}
                              <div className="flex items-center justify-between mb-3">
                                <CollectionBadge collectionId={crewmate.collection} size="sm" />
                                {title && (
                                  <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                                    {title.name}
                                  </span>
                                )}
                              </div>
                              
                              {/* Crewmate Info */}
                              <div className="space-y-2">
                                <div>
                                  <h5 className="font-medium text-gray-900">
                                    {crewmateClass?.name || 'Unknown Class'}
                                  </h5>
                                  <p className="text-sm text-gray-500">
                                    ID: {crewmate.id}
                                  </p>
                                </div>
                                
                                {primaryTrait && (
                                  <div>
                                    <p className="text-sm text-gray-600">
                                      <span className="font-medium">Primary Trait:</span> {primaryTrait.name}
                                    </p>
                                  </div>
                                )}
                                
                                {crewmate.traits && crewmate.traits.length > 1 && (
                                  <div>
                                    <p className="text-xs text-gray-500">
                                      +{crewmate.traits.length - 1} more trait{crewmate.traits.length > 2 ? 's' : ''}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 italic">No crewmates in this crew.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}