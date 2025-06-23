import Link from 'next/link'

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Bienvenue</h1>
      <p className="mb-4">Application e-commerce simple</p>
      <div className="space-x-4">
        <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Se connecter</Link>
        <Link href="/products" className="bg-gray-500 text-white px-4 py-2 rounded">Voir produits</Link>
      </div>
    </div>
  )
}