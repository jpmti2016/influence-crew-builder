'use client'

import { useState, useCallback } from 'react'

// Hook for managing crew simulator state
export const useCrewSimulator = () => {
  const [simulatedCrew, setSimulatedCrew] = useState([])
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false)

  // Add crewmate to simulator
  const addToSimulator = useCallback((crewmate) => {
    setSimulatedCrew(prev => {
      // Check if crewmate is already in simulator
      const isAlreadyAdded = prev.some(cm => cm.id === crewmate.id)
      
      if (isAlreadyAdded) {
        return prev // Don't add duplicates
      }

      // Limit to 5 crewmates (typical crew size)
      if (prev.length >= 5) {
        // Replace the first crewmate with the new one
        return [crewmate, ...prev.slice(1)]
      }

      return [...prev, crewmate]
    })
    
    // Open simulator if it's not already open
    if (!isSimulatorOpen) {
      setIsSimulatorOpen(true)
    }
  }, [isSimulatorOpen])

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