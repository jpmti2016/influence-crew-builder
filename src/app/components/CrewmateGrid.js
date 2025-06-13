'use client'

import { useState } from 'react'
import { Crewmate } from "@influenceth/sdk"
import CollectionBadge from './CollectionBadge'

export default function CrewmateGrid({ crewmates, onAddToSimulator, isDemo = false }) {
  const [filter, setFilter] = useState('all') // all, assigned, unassigned
  const [selectedClass, setSelectedClass] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Get unique classes for filter
  const availableClasses = [...new Set(crewmates.map(cm => {
    const crewmateClass = Crewmate.getClass(cm.class)
    return crewmateClass?.name || 'Unknown'
  }))].sort()

  // Filter crewmates
  const filteredCrewmates = crewmates.filter(crewmate => {
    // Filter by assignment status
    if (filter === 'assigned' && !crewmate.isInCrew) return false
    if (filter === 'unassigned' && crewmate.isInCrew) return false

    // Filter by class
    if (selectedClass !== 'all') {
      const crewmateClass = Crewmate.getClass(crewmate.class)
      if (crewmateClass?.name !== selectedClass) return false
    }

    // Filter by search term
    if (searchTerm) {
      const crewmateClass = Crewmate.getClass(crewmate.class)
      const className = crewmateClass?.name || ''
      const crewName = crewmate.crewInfo?.crewName || ''
      const searchLower = searchTerm.toLowerCase()
      
      if (!className.toLowerCase().includes(searchLower) && 
          !crewName.toLowerCase().includes(searchLower) &&
          !crewmate.id.toString().includes(searchLower)) {
        return false
      }
    }

    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          {/* Assignment Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Crewmates</option>
              <option value="assigned">In Crews</option>
              <option value="unassigned">Unassigned</option>
            </select>
          </div>

          {/* Class Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value="all">All Classes</option>
              {availableClasses.map(className => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
          </div>

          {/* Search */}
          <div className="flex-1 min-w-64">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by class, crew, or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600">
            Showing {filteredCrewmates.length} of {crewmates.length} crewmates
          </div>
        </div>
      </div>

      {/* Crewmate Grid */}
      {filteredCrewmates.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500">No crewmates found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCrewmates.map((crewmate, index) => {
            const crewmateClass = Crewmate.getClass(crewmate.class)
            const primaryTrait = crewmate.traits?.[0] ? Crewmate.getTrait(crewmate.traits[0]) : null
            const title = crewmate.title ? Crewmate.getTitle(crewmate.title) : null
            
            return (
              <div key={`${crewmate.id}-${index}`} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border">
                {/* Collection Badge */}
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <CollectionBadge collectionId={crewmate.collection} size="sm" />
                    {title && (
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {title.name}
                      </span>
                    )}
                  </div>
                  
                  {/* Crew Status */}
                  {crewmate.isInCrew && crewmate.crewInfo && (
                    <div className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {crewmate.crewInfo.crewName}
                    </div>
                  )}
                </div>

                {/* Crewmate Info */}
                <div className="p-4">
                  <div className="space-y-2">
                    <div>
                      <h5 className="font-semibold text-gray-900">
                        {crewmateClass?.name || 'Unknown Class'}
                      </h5>
                      <p className="text-sm text-gray-500">
                        ID: {crewmate.id}
                      </p>
                    </div>
                    
                    {primaryTrait && (
                      <div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Primary:</span> {primaryTrait.name}
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

                {/* Action Button */}
                <div className="p-4 border-t bg-gray-50">
                  <button
                    onClick={() => {
                      console.log('Button clicked for crewmate:', crewmate.id, crewmate)
                      console.log('onAddToSimulator function:', typeof onAddToSimulator)
                      if (onAddToSimulator) {
                        onAddToSimulator(crewmate)
                      } else {
                        console.error('onAddToSimulator is not defined!')
                      }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    {isDemo ? 'Try in Simulator' : 'Add to Simulator'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}