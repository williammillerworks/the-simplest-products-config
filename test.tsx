"use client"

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Search } from 'lucide-react'

interface Product {
  id: string
  name: string
  description: string
  url: string
  icon: string
}

export function ProductMenu({ currentProductId }: { currentProductId?: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Replace with your actual JSON URL
    fetch('https://yourdomain.com/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to load products:', err)
        setLoading(false)
      })
  }, [])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) {
    return <div className="p-4">Loading products...</div>
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search tools..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredProducts.map(product => (
          <Card 
            key={product.id}
            className={`cursor-pointer hover:shadow-lg transition-shadow ${
              currentProductId === product.id ? 'ring-2 ring-primary' : ''
            }`}
          >
            <a href={product.url} className="block">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{product.icon}</span>
                  {product.name}
                </CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
            </a>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          No products found matching "{search}"
        </div>
      )}
    </div>
  )
}
