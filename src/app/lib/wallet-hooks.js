'use client'

import { useAccount as useWagmiAccount, useConnect as useWagmiConnect, useDisconnect as useWagmiDisconnect } from 'wagmi'
import { useAccount as useStarknetAccount, useConnect as useStarknetConnect, useDisconnect as useStarknetDisconnect } from '@starknet-react/core'

// Combined hook for accessing both Ethereum and StarkNet accounts
export const useAccounts = () => {
  const { address: ethereumAddress, isConnected: isEthereumConnected } = useWagmiAccount()
  const { address: starknetAddress, isConnected: isStarknetConnected } = useStarknetAccount()

  return {
    ethereum: isEthereumConnected ? { address: ethereumAddress } : undefined,
    starknet: isStarknetConnected ? { address: starknetAddress } : undefined,
    isConnected: isEthereumConnected || isStarknetConnected,
  }
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