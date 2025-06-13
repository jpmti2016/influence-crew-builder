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
- **NEW: Added StarkNet wallet connection support**
  - Argent and StarkNet wallet support via StarkNet React
  - StarkNet-focused blockchain integration for crewmate ownership
  - Standalone crewmate fetching from StarkNet addresses

## Wallet Integration
- **StarkNet Only**: Argent, Braavos via @starknet-react/core
- **Configuration**: StarkNet config in `src/app/lib/starknet-config.js`
- **Components**: WalletConnection component in `src/app/components/`
- **Hooks**: Custom wallet hooks in `src/app/lib/wallet-hooks.js`
- **Focus**: Standalone crewmate fetching works exclusively with StarkNet addresses

## Environment Setup
Copy `.env.example` to `.env.local` and configure:

### Server-Only Variables (Secure)
- `INFLUENCE_API_ACCESS_TOKEN`: Required for Influence API access
- `ALCHEMY_API_KEY`: Optional, for server-side Ethereum RPC calls

### Client-Safe Variables (Public)
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`: Optional, for WalletConnect support
- `NEXT_PUBLIC_TEST_STARKNET_ADDRESS`: Optional, for development testing

### Security Note
⚠️ **NEVER use `NEXT_PUBLIC_` prefix for sensitive data like API keys or tokens** - these are exposed to the client-side code and visible in the browser!

## Testing & Quality
- Run `npm run lint` before committing changes
- Ensure TypeScript compilation passes with `npm run build`
- Test crew building functionality across different collections
- Verify responsive design on various screen sizes
- Test StarkNet wallet connections with Argent and Braavos