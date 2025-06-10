# Influence Crew Builder

## Project Overview
This is a Next.js application for building and managing crews in the Influence game. It allows users to create crews with crewmates from multiple collections, manage their abilities, traits, and optimize crew compositions.

## Tech Stack
- **Framework**: Next.js 14.2.4 with App Router
- **Styling**: Tailwind CSS with @tailwindcss/forms
- **UI Components**: Headless UI (@headlessui/react) with Heroicons
- **Game Integration**: Influence SDK (@influenceth/sdk, influence-typed-sdk)
- **Type Safety**: TypeScript, Zod for schema validation
- **Utilities**: UUID generation

## Key Features
- Multi-collection crew builder with dynamic 5-slot system
- Department support for crew organization
- Crewmate management with abilities, traits, and titles
- Ship inventory simulation
- Token-based authentication system
- Consistent card layouts and UI components

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm start` - Start production server

## Code Conventions
- Use JavaScript (.js) files for components and logic
- Follow Next.js App Router patterns
- Components are in `src/app/components/`
- Business logic in `src/app/lib/`
- Server actions in `src/app/actions.js`
- Use Tailwind for styling with consistent design patterns
- Implement proper TypeScript types where configured

## Architecture
- **Components**: Reusable UI components in `/components`
- **Pages**: App Router pages in route folders
- **Libraries**: Game logic and utilities in `/lib`
- **Actions**: Server-side actions for data operations
- **Schemas**: Zod schemas for data validation

## Recent Work
- Implemented department support with consistent card heights
- Built multi-collection crew builder system
- Created crew management functionality
- Added token authentication flow
- Developed inventory loading simulation
- **NEW: Added blockchain wallet connection support**
  - Metamask and Ethereum wallet integration via Wagmi
  - Argent and StarkNet wallet support via StarkNet React
  - Dual-network wallet management with unified UI

## Wallet Integration
- **Ethereum**: Metamask, injected wallets via Wagmi
- **StarkNet**: Argent, Braavos via @starknet-react/core
- **Configuration**: Wagmi config in `src/app/lib/wagmi-config.js`
- **Components**: WalletConnection component in `src/app/components/`
- **Hooks**: Custom wallet hooks in `src/app/lib/wallet-hooks.js`

## Environment Setup
Copy `.env.example` to `.env.local` and configure:
- `INFLUENCE_API_ACCESS_TOKEN`: Required for Influence API access
- `NEXT_PUBLIC_ALCHEMY_API_KEY`: Optional, for Ethereum RPC via Alchemy
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Optional, for WalletConnect support

## Testing & Quality
- Run `npm run lint` before committing changes
- Ensure TypeScript compilation passes with `npm run build`
- Test crew building functionality across different collections
- Verify responsive design on various screen sizes
- Test wallet connections on both Ethereum and StarkNet networks