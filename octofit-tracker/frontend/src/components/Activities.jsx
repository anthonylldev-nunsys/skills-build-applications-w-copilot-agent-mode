import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('activities')
      .then((items) => {
        if (isMounted) setActivities(items)
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

  if (loading) return <p>Loading activities...</p>
  if (error) return <p className="text-danger">Error loading activities: {error}</p>

  return (
    <div>
      <h1>Activities</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Team</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Completed At</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id || activity.id}>
              <td>{activity.userId?.name || activity.userId}</td>
              <td>{activity.teamId?.name || activity.teamId}</td>
              <td>{activity.type}</td>
              <td>{activity.durationMinutes}</td>
              <td>
                {activity.completedAt
                  ? new Date(activity.completedAt).toLocaleString()
                  : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Activities
