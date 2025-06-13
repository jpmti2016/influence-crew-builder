'use client'

import { useAccount as useStarknetAccount, useConnect as useStarknetConnect, useDisconnect as useStarknetDisconnect } from '@starknet-react/core'

// Hook for accessing StarkNet account only
export const useAccounts = () => {
  const { address: starknetAddress, isConnected: isStarknetConnected } = useStarknetAccount()

  const accounts = {
    starknet: isStarknetConnected ? { address: starknetAddress } : undefined,
    isConnected: isStarknetConnected,
  }

  // Debug logging (only when connection state changes)
  if (accounts.isConnected) {
    console.log('StarkNet wallet connected:', {
      starknet: accounts.starknet ? 'Connected' : 'Not connected'
    })
  }

  return accounts
}


// Hook for StarkNet wallet connections (Argent, Braavos, etc.)
export const useStarknetWallet = () => {
  const { connect, connectors, isPending } = useStarknetConnect()
  const { disconnect } = useStarknetDisconnect()
  const { address, isConnected } = useStarknetAccount()

  const connectArgent = () => {
    console.log('🔗 Attempting to connect Argent wallet...')
    console.log('Available connectors:', connectors.map(c => c.name))
    
    const argentConnector = connectors.find(connector => 
      connector.name.toLowerCase().includes('argent')
    )
    
    if (argentConnector) {
      console.log('✅ Found Argent connector:', argentConnector.name)
      connect({ connector: argentConnector })
    } else {
      console.error('❌ Argent connector not found!')
    }
  }


  return {
    address,
    isConnected,
    isPending,
    connect,
    disconnect,
    connectArgent,
    connectors,
  }
}

// Hook for disconnecting StarkNet wallet
export const useDisconnectAll = () => {
  const { disconnect: disconnectStarknet } = useStarknetDisconnect()
  const { connect, connectors } = useStarknetConnect()
  const accounts = useAccounts()

  const disconnectAll = async () => {
    try {
      // Disconnect StarkNet wallet if connected
      if (accounts.starknet) {
        console.log('🔓 Disconnecting StarkNet wallet...')
        
        // First, try the standard disconnect
        await disconnectStarknet()
        
        // Clear ALL possible wallet-related data from localStorage and sessionStorage
        const walletKeys = [
          'starknet-last-wallet',
          'wallet-connect-session', 
          'starknetkit_lastConnectedWallet',
          'starknetkit_lastConnectedWallets',
          'argent-wallet-connect',
          'starknet-react',
          'get-starknet-last-wallet',
          'wallet-autoconnect',
          'connector-cache'
        ]
        
        walletKeys.forEach(key => {
          try {
            localStorage.removeItem(key)
            sessionStorage.removeItem(key)
          } catch (e) {
            // Ignore errors for individual keys
          }
        })
        
        // Clear any starknet-related keys that might exist
        Object.keys(localStorage).forEach(key => {
          if (key.toLowerCase().includes('starknet') || key.toLowerCase().includes('argent')) {
            try {
              localStorage.removeItem(key)
            } catch (e) {
              // Ignore errors
            }
          }
        })
        
        // Force a page reload to ensure complete disconnection
        // This is the most reliable way to ensure wallet state is cleared
        setTimeout(() => {
          console.log('🔄 Forcing page reload to ensure complete wallet disconnection...')
          window.location.reload()
        }, 500)
        
        console.log('✅ Cleared all wallet data and forcing reload')
      }
    } catch (error) {
      console.error('Error disconnecting StarkNet wallet:', error)
      // If standard disconnect fails, still try to clear data and reload
      setTimeout(() => {
        window.location.reload()
      }, 500)
    }
  }

  return { disconnectAll, isAnyConnected: accounts.isConnected }
}