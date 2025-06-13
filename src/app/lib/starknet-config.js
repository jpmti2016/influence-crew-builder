import { sepolia, mainnet } from '@starknet-react/chains'
import { StarknetConfig, publicProvider, argent } from '@starknet-react/core'

// StarkNet configuration for Argent and other StarkNet wallets
export const chains = [mainnet, sepolia]
export const provider = publicProvider()
export const connectors = [argent()]

export const starknetConfig = {
  chains,
  provider,
  connectors,
  autoConnect: false, // Disabled for security - always require explicit user consent
}