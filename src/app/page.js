'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAccounts, useDisconnectAll } from './lib/wallet-hooks'
import { useCrewmates } from './lib/crew-hooks'
import { useCrewSimulator } from './lib/simulator-hooks'
import { defaultAdalianCrew } from './lib/default-crew'
import CrewmateGrid from "./components/CrewmateGrid"
import CrewSimulator from "./components/CrewSimulator"
import BonusByAbility from "./components/BonusByAbility"
import CollectionSummary from "./components/CollectionSummary"
import CrewImpactfulTraits from "./components/CrewImpactfulTraits"
import Footer from "./components/Footer"

export default function Home() {
  const router = useRouter()
  const accounts = useAccounts()
  const { disconnectAll } = useDisconnectAll()
  const [isRedirecting, setIsRedirecting] = useState(false)
  const { crewmates, loading, error } = useCrewmates(
    accounts.starknet?.address
  )
  
  // Crew simulator
  const {
    simulatedCrew,
    isSimulatorOpen,
    addToSimulator,
    removeFromSimulator,
    clearSimulator,
    toggleSimulator,
    closeSimulator,
    getSimulatorStats,
  } = useCrewSimulator()

  // Don't redirect when not connected - show default crew instead
  // This allows users to explore the interface before connecting

  // Handle wallet disconnect
  const handleDisconnectWallet = async () => {
    if (accounts.isConnected) {
      setIsRedirecting(true)
      // Clear the crew simulator when disconnecting
      clearSimulator()
      // Note: disconnectAll() now handles page reload automatically
      await disconnectAll()
    }
  }

  // Determine what crewmates to show
  const crewmatesToShow = accounts.isConnected ? crewmates : defaultAdalianCrew
  const isShowingDefault = !accounts.isConnected

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {isShowingDefault ? "Adalian Crew Builder" : "My Crewmates"}
              </h1>
              <div className="text-sm text-gray-600">
                {isShowingDefault ? (
                  <p>Explore crew composition with sample Adalian crewmates</p>
                ) : (
                  <>
                    {accounts.starknet && (
                      <p>StarkNet: {accounts.starknet.address.slice(0, 6)}...{accounts.starknet.address.slice(-4)}</p>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="flex gap-3">
              {/* Crew Simulator Button */}
              <button
                onClick={toggleSimulator}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Crew Simulator ({simulatedCrew.length})
              </button>
              {isShowingDefault ? (
                <button
                  onClick={() => router.push('/login')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  onClick={handleDisconnectWallet}
                  disabled={isRedirecting}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRedirecting ? 'Disconnecting...' : 'Disconnect'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Crewmate content */}
      {isShowingDefault ? (
        // Show default Adalian crew
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-medium text-blue-900">Demo Mode</h3>
                  <p className="text-sm text-blue-700">
                    These are sample Adalian crewmates. Connect your wallet to see your actual crewmates.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700">
              Sample crew: {defaultAdalianCrew.length} Adalian crewmates
            </p>
          </div>
          <CrewmateGrid crewmates={crewmatesToShow} onAddToSimulator={addToSimulator} isDemo={isShowingDefault} />
        </div>
      ) : loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your crewmates...</p>
          </div>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-red-800 font-semibold mb-2">Error Loading Crewmates</h3>
            <p className="text-red-600">{error}</p>
          </div>
        </div>
      ) : crewmates.length === 0 ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Crewmates Found</h3>
            <p className="text-gray-600 mb-6">
              You don&apos;t have any crewmates associated with this wallet address.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Connect Wallet
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <p className="text-lg text-gray-700">
              Found {crewmates.length} crewmate{crewmates.length !== 1 ? 's' : ''} for your wallet
            </p>
          </div>
          <CrewmateGrid crewmates={crewmatesToShow} onAddToSimulator={addToSimulator} isDemo={isShowingDefault} />
        </div>
      )}

      {/* Crew Simulator Modal */}
      <CrewSimulator
        simulatedCrew={simulatedCrew}
        isOpen={isSimulatorOpen}
        onRemove={removeFromSimulator}
        onClear={clearSimulator}
        onClose={closeSimulator}
        stats={getSimulatorStats()}
      />

      {/* Advanced Analytics Section - shown when crew simulator has crewmates */}
      {simulatedCrew.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Crew Analytics</h2>
            <div className="space-y-6">
              <CollectionSummary simulatedCrew={simulatedCrew} />
              <CrewImpactfulTraits simulatedCrew={simulatedCrew} />
              <BonusByAbility simulatedCrew={simulatedCrew} />
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  )
}
