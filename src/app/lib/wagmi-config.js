import { createConfig, http } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { injected, metaMask, walletConnect } from 'wagmi/connectors'

// Create wagmi config for Ethereum/Metamask connections
export const wagmiConfig = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
    metaMask({
      dappMetadata: {
        name: 'Influence Crew Builder',
        url: 'https://influence-crew-builder.vercel.app',
      },
    }),
    ...(process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ? [
      walletConnect({
        projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
        metadata: {
          name: 'Influence Crew Builder',
          description: 'Optimize your crew composition for the Influence game',
          url: 'https://influence-crew-builder.vercel.app',
          icons: ['https://influence-crew-builder.vercel.app/favicon.ico']
        }
      })
    ] : []),
  ],
  transports: {
    [mainnet.id]: http()
  },
  ssr: true,
})