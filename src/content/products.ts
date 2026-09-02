export interface Product {
  id: string
  name: string
  thumbnail: string | null
}

export const PRODUCTS: Array<Product> = [
  { id: 'platform', name: 'Platform', thumbnail: null },
  { id: 'engage', name: 'Engage', thumbnail: null },
  { id: 'comply', name: 'Comply', thumbnail: null },
  { id: 'client-a', name: 'Client A', thumbnail: null },
  { id: 'client-b', name: 'Client B', thumbnail: null },
]
