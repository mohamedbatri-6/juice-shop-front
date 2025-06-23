import { useEffect, useState } from 'react'
import { getProducts, addToCart } from '../../lib/api'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/login')

    getProducts(token)
      .then(setProducts)
      .catch(() => {
        localStorage.removeItem('token')
        router.push('/login')
      })
  }, [router])

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem('token')
    try {
      await addToCart(id, 1, token)
      setMessage('Produit ajouté au panier')
      setTimeout(() => setMessage(null), 2000)
    } catch {
      setMessage("Erreur")
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Produits</h1>
        <Link href="/cart" className="bg-green-500 text-white px-4 py-2 rounded">Mon panier</Link>
      </div>
      
      {message && <p className="mb-4 p-2 bg-blue-100 text-blue-800 rounded">{message}</p>}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map(p => (
          <div key={p.id} className="border border-gray-200 p-4 rounded">
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{p.description}</p>
            <p className="text-lg font-bold text-blue-600 mb-3">{p.price} €</p>
            <button
              onClick={() => handleAddToCart(p.id)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
            >
              Ajouter
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}