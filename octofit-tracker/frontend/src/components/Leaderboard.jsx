import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

// VITE_CODESPACE_NAME must be defined (for example in `.env.local`).
// Falls back to localhost when unset, avoiding `https://undefined-8000...` URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const LEADERBOARD_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource(LEADERBOARD_API_URL)
      .then((items) => {
        if (isMounted) setEntries(items)
      })
      .catch((err) => {
        if (isMounted) setError(err.message)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) return <p>Loading leaderboard...</p>
  if (error) return <p className="text-danger">Error loading leaderboard: {error}</p>

  return (
    <div>
      <h1>Leaderboard</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Streak (days)</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id || entry.id}>
              <td>{entry.rank}</td>
              <td>{entry.userId?.name || entry.userId}</td>
              <td>{entry.teamId?.name || entry.teamId}</td>
              <td>{entry.userId?.streakDays ?? ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Leaderboard
