import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('teams')
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
