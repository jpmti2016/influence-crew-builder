'use client'

import { useState } from 'react'
import { useAccounts, useEthereumWallet, useStarknetWallet } from '../lib/wallet-hooks'

export default function WalletConnection() {
  const [showConnectors, setShowConnectors] = useState(false)
  const accounts = useAccounts()
  const ethereumWallet = useEthereumWallet()
  const starknetWallet = useStarknetWallet()

  const handleDisconnect = () => {
    if (accounts.ethereum) {
      ethereumWallet.disconnect()
    }
    if (accounts.starknet) {
      starknetWallet.disconnect()
    }
  }

  const formatAddress = (address) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (accounts.isConnected) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4 text-center">Connected Wallets</h2>
        
        <div className="space-y-4">
          {accounts.ethereum && (
            <div className="border rounded-lg p-4 bg-blue-50">
              <h3 className="font-semibold text-blue-800 mb-2">Ethereum Network</h3>
              <p className="text-sm text-gray-600">Address: {formatAddress(accounts.ethereum.address)}</p>
              <p className="text-xs text-gray-500 mt-1">Connected via Metamask/Ethereum wallet</p>
            </div>
          )}
          
          {accounts.starknet && (
            <div className="border rounded-lg p-4 bg-purple-50">
              <h3 className="font-semibold text-purple-800 mb-2">StarkNet Network</h3>
              <p className="text-sm text-gray-600">Address: {formatAddress(accounts.starknet.address)}</p>
              <p className="text-xs text-gray-500 mt-1">Connected via Argent/StarkNet wallet</p>
            </div>
          )}
        </div>

        <button
          onClick={handleDisconnect}
          className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Disconnect All Wallets
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
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-blue-800 mb-3">Ethereum Wallets</h3>
            <div className="space-y-2">
              <button
                onClick={ethereumWallet.connectMetamask}
                disabled={ethereumWallet.isPending}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
              >
                {ethereumWallet.isPending ? 'Connecting...' : 'Connect Metamask'}
              </button>
              <button
                onClick={ethereumWallet.connectInjected}
                disabled={ethereumWallet.isPending}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
              >
                {ethereumWallet.isPending ? 'Connecting...' : 'Connect Injected Wallet'}
              </button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-purple-800 mb-3">StarkNet Wallets</h3>
            <div className="space-y-2">
              <button
                onClick={starknetWallet.connectArgent}
                disabled={starknetWallet.isPending}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
              >
                {starknetWallet.isPending ? 'Connecting...' : 'Connect Argent'}
              </button>
              <button
                onClick={starknetWallet.connectBraavos}
                disabled={starknetWallet.isPending}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50"
              >
                {starknetWallet.isPending ? 'Connecting...' : 'Connect Braavos'}
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