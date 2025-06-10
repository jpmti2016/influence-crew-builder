'use client'

import { useState, useEffect } from 'react'
import { fetchCrewsForAddress, fetchCrewmatesForAddress } from './crew-actions'

// Hook to fetch crews for a given address
export const useCrews = (address) => {
  const [crews, setCrews] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!address) {
      setCrews([])
      setLoading(false)
      setError(null)
      return
    }

    const fetchCrews = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const crewData = await fetchCrewsForAddress(address)
        setCrews(crewData.map(crew => ({
          ...crew,
          readyAt: new Date(crew.readyAt) // Convert date string back to Date object
        })))
      } catch (err) {
        setError(err.message || 'Failed to fetch crews')
        setCrews([])
      } finally {
        setLoading(false)
      }
    }

    fetchCrews()
  }, [address])

  const refetch = async () => {
    if (address) {
      setLoading(true)
      setError(null)
      
      try {
        const crewData = await fetchCrewsForAddress(address)
        setCrews(crewData.map(crew => ({
          ...crew,
          readyAt: new Date(crew.readyAt)
        })))
      } catch (err) {
        setError(err.message || 'Failed to fetch crews')
        setCrews([])
      } finally {
        setLoading(false)
      }
    }
  }

  return { crews, loading, error, refetch }
}

// Hook to fetch individual crewmates for a given address
export const useCrewmates = (address) => {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!address) {
      setCrewmates([])
      setLoading(false)
      setError(null)
      return
    }

    const fetchCrewmates = async () => {
      setLoading(true)
      setError(null)
      
      try {
        const crewmateData = await fetchCrewmatesForAddress(address)
        setCrewmates(crewmateData)
      } catch (err) {
        setError(err.message || 'Failed to fetch crewmates')
        setCrewmates([])
      } finally {
        setLoading(false)
      }
    }

    fetchCrewmates()
  }, [address])

  const refetch = async () => {
    if (address) {
      setLoading(true)
      setError(null)
      
      try {
        const crewmateData = await fetchCrewmatesForAddress(address)
        setCrewmates(crewmateData)
      } catch (err) {
        setError(err.message || 'Failed to fetch crewmates')
        setCrewmates([])
      } finally {
        setLoading(false)
      }
    }
  }

  return { crewmates, loading, error, refetch }
}