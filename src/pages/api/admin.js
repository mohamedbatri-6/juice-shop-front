import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function AdminPage() {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    axios
      .get('http://localhost:8000/api/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data)
      })
      .catch((err) => {
        console.error(err)
        setError('Accès refusé. Vous devez être administrateur.')
        router.push('/login')
      })
  }, [router])

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-6">Espace Admin</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Liste des utilisateurs</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border-b pb-2">
              <p>Email : {user.email}</p>
              <p className="text-sm text-gray-600">Rôles : {user.roles.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
