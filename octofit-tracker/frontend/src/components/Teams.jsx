import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

// VITE_CODESPACE_NAME must be defined (for example in `.env.local`).
// Falls back to localhost when unset, avoiding `https://undefined-8000...` URLs.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const TEAMS_API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource(TEAMS_API_URL)
      .then((items) => {
        if (isMounted) setTeams(items)
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

  if (loading) return <p>Loading teams...</p>
  if (error) return <p className="text-danger">Error loading teams: {error}</p>

  return (
    <div>
      <h1>Teams</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id || team.id}>
              <td>{team.name}</td>
              <td>{team.city}</td>
              <td>
                {(team.memberIds || [])
                  .map((member) => member.name || member)
                  .join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Teams
