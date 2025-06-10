'use client'

import { useAccount as useWagmiAccount, useConnect as useWagmiConnect, useDisconnect as useWagmiDisconnect } from 'wagmi'
import { useAccount as useStarknetAccount, useConnect as useStarknetConnect, useDisconnect as useStarknetDisconnect } from '@starknet-react/core'

// Combined hook for accessing both Ethereum and StarkNet accounts
export const useAccounts = () => {
  const { address: ethereumAddress, isConnected: isEthereumConnected } = useWagmiAccount()
  const { address: starknetAddress, isConnected: isStarknetConnected } = useStarknetAccount()

  const accounts = {
    ethereum: isEthereumConnected ? { address: ethereumAddress } : undefined,
    starknet: isStarknetConnected ? { address: starknetAddress } : undefined,
    isConnected: isEthereumConnected || isStarknetConnected,
  }

  // Debug logging (only when connection state changes)
  if (accounts.isConnected) {
    console.log('Wallet connected:', {
      ethereum: accounts.ethereum ? 'Connected' : 'Not connected',
      starknet: accounts.starknet ? 'Connected' : 'Not connected'
    })
  }

  return accounts
}

// Hook for Ethereum wallet connections (Metamask, etc.)
export const useEthereumWallet = () => {
  const { connect, connectors, isPending } = useWagmiConnect()
  const { disconnect } = useWagmiDisconnect()
  const { address, isConnected } = useWagmiAccount()

  const connectMetamask = () => {
    const metamaskConnector = connectors.find(connector => 
      connector.name.toLowerCase().includes('metamask') || 
      connector.id === 'metaMask'
    )
    if (metamaskConnector) {
      connect({ connector: metamaskConnector })
    }
  }

  const connectInjected = () => {
    const injectedConnector = connectors.find(connector => 
      connector.id === 'injected'
    )
    if (injectedConnector) {
      connect({ connector: injectedConnector })
    }
  }

  return {
    address,
    isConnected,
    isPending,
    connect,
    disconnect,
    connectMetamask,
    connectInjected,
    connectors,
  }
}

// Hook for StarkNet wallet connections (Argent, Braavos, etc.)
export const useStarknetWallet = () => {
  const { connect, connectors, isPending } = useStarknetConnect()
  const { disconnect } = useStarknetDisconnect()
  const { address, isConnected } = useStarknetAccount()

  const connectArgent = () => {
    const argentConnector = connectors.find(connector => 
      connector.name.toLowerCase().includes('argent')
    )
    if (argentConnector) {
      connect({ connector: argentConnector })
    }
  }

  const connectBraavos = () => {
    const braavosConnector = connectors.find(connector => 
      connector.name.toLowerCase().includes('braavos')
    )
    if (braavosConnector) {
      connect({ connector: braavosConnector })
    }
  }

  return {
    address,
    isConnected,
    isPending,
    connect,
    disconnect,
    connectArgent,
    connectBraavos,
    connectors,
  }
}

// Hook for disconnecting all wallets
export const useDisconnectAll = () => {
  const { disconnect: disconnectEthereum } = useWagmiDisconnect()
  const { disconnect: disconnectStarknet } = useStarknetDisconnect()
  const accounts = useAccounts()

  const disconnectAll = async () => {
    try {
      // Disconnect Ethereum wallets if connected
      if (accounts.ethereum) {
        await disconnectEthereum()
      }

      // Disconnect StarkNet wallets if connected
      if (accounts.starknet) {
        await disconnectStarknet()
      }
    } catch (error) {
      console.error('Error disconnecting wallets:', error)
    }
  }

  return { disconnectAll, isAnyConnected: accounts.isConnected }
}