'use client'

import { Crewmate } from "@influenceth/sdk"
import CollectionBadge from './CollectionBadge'

export default function CrewSimulator({ 
  simulatedCrew, 
  isOpen, 
  onRemove, 
  onClear, 
  onClose, 
  stats 
}) {
  if (!isOpen) return null

  const formatCrewmate = (crewmate) => {
    const crewmateClass = Crewmate.getClass(crewmate.class)
    const primaryTrait = crewmate.traits?.[0] ? Crewmate.getTrait(crewmate.traits[0]) : null
    const title = crewmate.title ? Crewmate.getTitle(crewmate.title) : null
    
    return {
      ...crewmate,
      className: crewmateClass?.name || 'Unknown',
      primaryTraitName: primaryTrait?.name,
      titleName: title?.name,
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Crew Simulator</h2>
            <p className="text-gray-600">
              {stats.count}/{stats.maxCount} crewmates
              {stats.isFull && ' (Full)'}
            </p>
          </div>
          <div className="flex gap-2">
            {stats.count > 0 && (
              <button
                onClick={onClear}
                className="px-4 py-2 text-red-600 hover:bg-red-50 border border-red-300 rounded-md transition-colors"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {stats.isEmpty ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Crewmates Added</h3>
              <p className="text-gray-500">
                Add crewmates to your simulator to test different crew compositions
              </p>
            </div>
          ) : (
            <div>
              {/* Crew Stats */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-gray-900 mb-3">Crew Composition</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(stats.classCounts).map(([className, count]) => {
                    const fullClassName = Crewmate.getClass(parseInt(className))?.name || className
                    return (
                      <div key={className} className="text-center">
                        <div className="text-lg font-semibold text-gray-900">{count}</div>
                        <div className="text-sm text-gray-600">{fullClassName}</div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Crewmate Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {simulatedCrew.map((crewmate, index) => {
                  const formatted = formatCrewmate(crewmate)
                  
                  return (
                    <div key={`sim-${crewmate.id}-${index}`} className="bg-white border rounded-lg p-4 relative">
                      {/* Remove Button */}
                      <button
                        onClick={() => onRemove(crewmate.id)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      {/* Collection Badge */}
                      <div className="flex items-center justify-between mb-3 pr-6">
                        <CollectionBadge collectionId={crewmate.collection} size="sm" />
                        {formatted.titleName && (
                          <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                            {formatted.titleName}
                          </span>
                        )}
                      </div>

                      {/* Crewmate Info */}
                      <div className="space-y-2">
                        <div>
                          <h5 className="font-semibold text-gray-900">
                            {formatted.className}
                          </h5>
                          <p className="text-sm text-gray-500">
                            ID: {crewmate.id}
                          </p>
                        </div>
                        
                        {formatted.primaryTraitName && (
                          <div>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Primary:</span> {formatted.primaryTraitName}
                            </p>
                          </div>
                        )}

                        {/* Original Crew Info */}
                        {crewmate.isInCrew && crewmate.crewInfo && (
                          <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            From: {crewmate.crewInfo.crewName}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}

                {/* Empty Slots */}
                {Array.from({ length: Math.max(0, 5 - simulatedCrew.length) }).map((_, index) => (
                  <div key={`empty-${index}`} className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center min-h-[140px]">
                    <div className="text-center text-gray-400">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <p className="text-sm">Empty Slot</p>
                      <p className="text-xs text-gray-400 mt-1">Add crewmates from the main grid</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}