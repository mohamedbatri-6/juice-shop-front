import { useEffect, useState } from 'react'
import { getOrders } from '../../lib/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mes commandes</h1>
        <Link href="/products" className="bg-blue-500 text-white px-4 py-2 rounded">Nouveaux achats</Link>
      </div>
      
      {orders.length === 0 ? (
        <p className="text-gray-500">Aucune commande</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-200 p-4 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold">Commande #{order.id}</p>
                  <p className="text-lg text-green-600 font-bold">{order.totalPrice} €</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{order.status}</p>
                  <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}