'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAccounts } from '../lib/wallet-hooks'
import { 
  HomeIcon, 
 
  Bars3Icon,
  XMarkIcon,
  WalletIcon
} from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Crew Builder', href: '/', icon: HomeIcon },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const accounts = useAccounts()

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and primary navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-gray-900">
                Influence Crew Builder
              </Link>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-1.5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Wallet connection status */}
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {accounts.isConnected ? (
              <div className="flex items-center space-x-2">
                <WalletIcon className="h-5 w-5 text-green-500" />
                <span className="text-sm text-gray-700">StarkNet Connected</span>
                {accounts.starknet?.address && (
                  <span className="text-xs text-gray-500 font-mono">
                    {accounts.starknet.address.slice(0, 6)}...{accounts.starknet.address.slice(-4)}
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <WalletIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm text-gray-500">Not Connected</span>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon className="h-5 w-5 mr-2" />
                    {item.name}
                  </div>
                </Link>
              )
            })}
          </div>
          
          {/* Mobile wallet status */}
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-4">
              <div className="flex items-center space-x-2">
                <WalletIcon className={`h-5 w-5 ${accounts.isConnected ? 'text-green-500' : 'text-gray-400'}`} />
                <span className="text-sm text-gray-700">
                  {accounts.isConnected ? 'StarkNet Connected' : 'No Wallet Connected'}
                </span>
              </div>
              {accounts.isConnected && accounts.starknet?.address && (
                <div className="mt-1">
                  <p className="text-xs text-gray-500">
                    StarkNet: {' '}
                    <span className="font-mono">
                      {accounts.starknet.address.slice(0, 8)}...
                      {accounts.starknet.address.slice(-6)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}