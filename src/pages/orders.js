import { useEffect, useState } from 'react'
import { getOrders } from '../../lib/api'
import { useRouter } from 'next/router'

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')

    getOrders(token)
      .then(setOrders)
      .catch(() => {
        localStorage.removeItem('token')
        router.push('/login')
      })
  }, [router])

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Mes commandes</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white p-4 rounded shadow">
            <p className="font-bold">Commande #{order.id}</p>
            <p>Total : {order.totalPrice} €</p>
            <p>Statut : {order.status}</p>
            <p>Date : {new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
