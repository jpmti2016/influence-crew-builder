'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccounts, useStarknetWallet, useDisconnectAll } from '../lib/wallet-hooks'

export default function WalletConnection() {
  const [showConnectors, setShowConnectors] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()
  const accounts = useAccounts()
  const starknetWallet = useStarknetWallet()
  const { disconnectAll } = useDisconnectAll()

  // Redirect to main page when wallet is connected
  useEffect(() => {
    if (accounts.isConnected && !isRedirecting) {
      console.log('Wallet connected, redirecting to home page...')
      setIsRedirecting(true)
      // Small delay to ensure connection is stable
      setTimeout(() => {
        router.replace('/')
      }, 500)
    }
  }, [accounts.isConnected, router, isRedirecting])

  const handleDisconnect = async () => {
    await disconnectAll()
  }

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (accounts.isConnected) {
    if (isRedirecting) {
      return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to your crews...</p>
          </div>
        </div>
      )
    }

    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Connected Wallet</h2>
        
        <div className="space-y-4">
          {accounts.starknet && (
            <div className="border rounded-lg p-4 bg-purple-50">
              <h3 className="font-semibold text-purple-800 mb-2">StarkNet Network</h3>
              <p className="text-sm text-gray-600">Address: {formatAddress(accounts.starknet.address)}</p>
              <p className="text-xs text-gray-500 mt-1">Connected via Argent wallet</p>
            </div>
          )}
        </div>

        <button
          onClick={handleDisconnect}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Disconnect & Clear Session
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Connect Your Wallet</h2>
      
      {!showConnectors ? (
        <button
          onClick={() => setShowConnectors(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="space-y-4">
          {/* Security Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-medium text-amber-800">Security Notice</p>
                <p className="text-xs text-amber-700 mt-1">
                  Disconnecting will clear all session data and reload the page for security. Always verify transactions in your wallet.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-3">Argent Wallet</h3>
            <div className="space-y-2">
              <button
                onClick={starknetWallet.connectArgent}
                disabled={starknetWallet.isPending}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
              >
                {starknetWallet.isPending ? 'Connecting...' : 'Connect Argent'}
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowConnectors(false)}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  )
}