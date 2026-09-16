export async function fetchResource(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request to ${url} failed with status ${response.status}`)
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
