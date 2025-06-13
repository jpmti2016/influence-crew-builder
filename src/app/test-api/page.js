'use client'

import { useState } from 'react'
import { fetchCrewmatesForAddress, debugCrewmateAPI } from '../lib/crew-actions'

export default function TestApi() {
  const [testAddress, setTestAddress] = useState(process.env.NEXT_PUBLIC_TEST_STARKNET_ADDRESS || '0x1234567890123456789012345678901234567890')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const testFetch = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await fetchCrewmatesForAddress(testAddress)
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const testDebugAPI = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const data = await debugCrewmateAPI()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">API Test Page</h1>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-800 mb-2">Setup Instructions:</h3>
        <ol className="text-sm text-blue-700 space-y-1">
          <li>1. Add your actual StarkNet address to <code className="bg-blue-100 px-1 rounded">.env.local</code>:</li>
          <li className="ml-4"><code className="bg-blue-100 px-1 rounded">NEXT_PUBLIC_TEST_STARKNET_ADDRESS=&quot;YOUR_STARKNET_ADDRESS&quot;</code></li>
          <li>2. Replace the placeholder address below with your real StarkNet address that owns crewmates</li>
          <li>3. Check browser console for detailed logs</li>
          <li>4. Note: Only StarkNet addresses are supported for standalone crewmate fetching</li>
        </ol>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Test StarkNet Address:</label>
        <input
          type="text"
          value={testAddress}
          onChange={(e) => setTestAddress(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Enter StarkNet address that owns crewmates"
        />
      </div>

      <div className="space-x-4">
        <button
          onClick={testFetch}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Fetch Crewmates'}
        </button>
        
        <button
          onClick={testDebugAPI}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Debug API Structure'}
        </button>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded">
          <h3 className="font-bold text-red-800">Error:</h3>
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
          <h3 className="font-bold text-green-800">Success:</h3>
          <pre className="text-sm text-green-600 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}