import { useEffect, useState } from 'react'
import { getCart, createOrder } from '../../lib/api'
import { useRouter } from 'next/router'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [message, setMessage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')

    getCart(token)
      .then(setCart)
      .catch(() => {
        localStorage.removeItem('token')
        router.push('/login')
      })
  }, [router])

  const handleOrder = async () => {
    const token = localStorage.getItem('token')
    const productIds = cart.map(item => item.product.id)
    try {
      await createOrder(productIds, token)
      setMessage('Commande passée avec succès !')
      setCart([])
    } catch {
      setMessage("Erreur lors de la commande.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Mon panier</h1>
      {message && <p className="mb-4 text-center">{message}</p>}
      <div className="space-y-4">
        {cart.map(item => (
          <div key={item.id} className="bg-white p-4 shadow rounded">
            <p className="font-semibold">Produit ID : {item.product.id}</p>
            <p>Quantité : {item.quantity}</p>
            <p className="text-sm text-gray-500">Ajouté le : {new Date(item.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <button
          onClick={handleOrder}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Passer la commande
        </button>
      )}
    </div>
  )
}
