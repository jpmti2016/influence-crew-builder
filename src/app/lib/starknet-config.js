import { sepolia, mainnet } from '@starknet-react/chains'
import { StarknetConfig, publicProvider, argent, braavos } from '@starknet-react/core'

// StarkNet configuration for Argent and other StarkNet wallets
export const chains = [mainnet, sepolia]
export const provider = publicProvider()
export const connectors = [argent(), braavos()]

export const starknetConfig = {
  chains,
  provider,
  connectors,
  autoConnect: true,
}