import { useEffect, useState } from 'react'
import { getProducts, addToCart } from '../../lib/api'
import { useRouter } from 'next/router'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
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
      setSuccess('Produit ajouté !')
      setTimeout(() => setSuccess(null), 2000)
    } catch {
      setError("Erreur d'ajout")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Produits</h1>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <div key={p.id} className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-bold">{p.name}</h2>
            <p>{p.description}</p>
            <p className="text-blue-600 font-semibold">{p.price} €</p>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              onClick={() => handleAddToCart(p.id)}
            >
              Ajouter au panier
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
