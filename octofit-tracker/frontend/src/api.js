// Base URL for the logic tier API, built from the Codespaces environment.
// VITE_CODESPACE_NAME must be defined (for example in `.env.local`) as:
//   VITE_CODESPACE_NAME=your-codespace-name
// Falls back to localhost when the variable is unset, avoiding `https://undefined-8000...` URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

export async function fetchResource(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`)

  if (!response.ok) {
    throw new Error(`Request to ${resource} failed with status ${response.status}`)
  }

  const data = await response.json()

  // Supports plain arrays, paginated ({ results }), and custom shapes
  // ({ items } / { entries } / { data }) returned by the logic tier.
  if (Array.isArray(data)) {
    return data
  }

  return (
    data.results ||
    data.items ||
    data.entries ||
    data.data ||
    []
  )
}
