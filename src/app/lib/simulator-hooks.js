'use client'

import { useState, useCallback } from 'react'

// Hook for managing crew simulator state
export const useCrewSimulator = () => {
  const [simulatedCrew, setSimulatedCrew] = useState([])
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false)

  // Add crewmate to simulator
  const addToSimulator = useCallback((crewmate) => {
    console.log('Adding crewmate to simulator:', crewmate.id, 'Current simulator open:', isSimulatorOpen)
    
    setSimulatedCrew(prev => {
      console.log('Current crew before adding:', prev.length, 'crewmates')
      
      // Check if crewmate is already in simulator
      const isAlreadyAdded = prev.some(cm => cm.id === crewmate.id)
      
      if (isAlreadyAdded) {
        console.log('Crewmate already added, skipping')
        return prev // Don't add duplicates
      }

      // Limit to 5 crewmates (typical crew size)
      if (prev.length >= 5) {
        console.log('Simulator full, replacing first crewmate')
        // Replace the first crewmate with the new one
        return [crewmate, ...prev.slice(1)]
      }

      console.log('Adding crewmate to simulator')
      return [...prev, crewmate]
    })
    
    // Always open simulator when adding a crewmate
    console.log('Opening simulator modal')
    setIsSimulatorOpen(true)
  }, [])

  // Remove crewmate from simulator
  const removeFromSimulator = useCallback((crewmateId) => {
    setSimulatedCrew(prev => prev.filter(cm => cm.id !== crewmateId))
  }, [])

  // Clear all crewmates from simulator
  const clearSimulator = useCallback(() => {
    setSimulatedCrew([])
  }, [])

  // Toggle simulator visibility
  const toggleSimulator = useCallback(() => {
    setIsSimulatorOpen(prev => !prev)
  }, [])

  // Close simulator
  const closeSimulator = useCallback(() => {
    setIsSimulatorOpen(false)
  }, [])

  // Get simulator stats
  const getSimulatorStats = useCallback(() => {
    const stats = {
      count: simulatedCrew.length,
      maxCount: 5,
      isFull: simulatedCrew.length >= 5,
      isEmpty: simulatedCrew.length === 0,
    }

    // Count by class
    const classCounts = {}
    simulatedCrew.forEach(crewmate => {
      const className = crewmate.class || 'Unknown'
      classCounts[className] = (classCounts[className] || 0) + 1
    })

    stats.classCounts = classCounts
    return stats
  }, [simulatedCrew])

  return {
    simulatedCrew,
    isSimulatorOpen,
    addToSimulator,
    removeFromSimulator,
    clearSimulator,
    toggleSimulator,
    closeSimulator,
    getSimulatorStats,
  }
}