import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
})

// Authentification
export const login = async (email, password) => {
  const res = await API.post('/login', { email, password })
  return res.data.token
}

// Produits
export const getProducts = async (token) => {
  const res = await API.get('/products', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

// Panier
export const addToCart = async (productId, quantity, token) => {
  const res = await API.post(
    '/cart/add',
    { product_id: productId, quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return res.data
}

export const getCart = async (token) => {
  const res = await API.get('/cart', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

// Commande
export const createOrder = async (productIds, token) => {
  const res = await API.post(
    '/orders/create',
    { products: productIds },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return res.data
}

export const getOrders = async (token) => {
  const res = await API.get('/orders', {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}
