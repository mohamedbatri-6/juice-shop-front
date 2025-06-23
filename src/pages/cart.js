import { useEffect, useState } from 'react'
import { getCart, createOrder } from '../../lib/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
      setMessage('Commande validée !')
      setCart([])
    } catch {
      setMessage("Erreur lors de la commande")
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Mon panier</h1>
        <Link href="/products" className="bg-blue-500 text-white px-4 py-2 rounded">Continuer les achats</Link>
      </div>
      
      {message && <p className="mb-4 p-2 bg-green-100 text-green-800 rounded">{message}</p>}
      
      {cart.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide</p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {cart.map(item => (
              <div key={item.id} className="border border-gray-200 p-4 rounded flex justify-between">
                <div>
                  <p className="font-bold">Produit #{item.product.id}</p>
                  <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                </div>
                <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
          <button
            onClick={handleOrder}
            className="bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600"
          >
            Passer la commande
          </button>
        </>
      )}
    </div>
  )
}
