'use client'

import { useState, useCallback } from 'react'
import { normalizeCrewmateFormat } from '../utils'

// Hook for managing crew simulator state
export const useCrewSimulator = () => {
  const [simulatedCrew, setSimulatedCrew] = useState([])
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false)
  

  // Add crewmate to simulator
  const addToSimulator = useCallback((crewmate) => {
    console.log('🎯 Adding crewmate to simulator:', { id: crewmate.id, isDemo: !!crewmate.id?.includes('demo') })
    
    // Normalize the crewmate data format
    const normalizedCrewmate = normalizeCrewmateFormat(crewmate)
    console.log('✨ Normalized crewmate:', { id: normalizedCrewmate.id, classId: normalizedCrewmate.classId })
    
    setSimulatedCrew(prev => {
      // Ensure the normalized crewmate has a valid ID
      if (!normalizedCrewmate.id) {
        console.error('❌ Normalized crewmate has no ID! Cannot add to simulator:', normalizedCrewmate)
        return prev
      }
      
      // Check if crewmate is already in simulator
      const isAlreadyAdded = prev.some(cm => cm.id === normalizedCrewmate.id)
      
      if (isAlreadyAdded) {
        console.log('Crewmate already added, skipping')
        return prev // Don't add duplicates
      }

      // Limit to 5 crewmates (typical crew size)
      if (prev.length >= 5) {
        // Replace the first crewmate with the new one
        return [normalizedCrewmate, ...prev.slice(1)]
      }

      return [...prev, normalizedCrewmate]
    })
    
    // Always open simulator when adding a crewmate
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
      const classId = crewmate.classId || crewmate.class
      classCounts[classId] = (classCounts[classId] || 0) + 1
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