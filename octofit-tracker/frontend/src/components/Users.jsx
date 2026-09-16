import { useEffect, useState } from 'react'
import { fetchResource } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    fetchResource('users')
      .then((items) => {
        if (isMounted) setUsers(items)
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

  if (loading) return <p>Loading users...</p>
  if (error) return <p className="text-danger">Error loading users: {error}</p>

  return (
    <div>
      <h1>Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Fitness Level</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id || user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.fitnessLevel}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
