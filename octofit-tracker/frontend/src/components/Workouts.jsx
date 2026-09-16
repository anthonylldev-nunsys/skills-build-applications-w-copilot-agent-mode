import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('workouts')
      .then((items) => {
        if (isMounted) setWorkouts(items)
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

  if (loading) return <p>Loading workouts...</p>
  if (error) return <p className="text-danger">Error loading workouts: {error}</p>

  return (
    <div>
      <h1>Workouts</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id || workout.id}>
              <td>{workout.title}</td>
              <td>{workout.difficulty}</td>
              <td>{workout.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Workouts
