'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StarknetConfig } from '@starknet-react/core'
import { starknetConfig } from '../lib/starknet-config'

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
})

export function Providers({ children }) {
  return (
    <StarknetConfig
      chains={starknetConfig.chains}
      provider={starknetConfig.provider}
      connectors={starknetConfig.connectors}
      autoConnect={starknetConfig.autoConnect}
    >
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </StarknetConfig>
  )
}