// In your page.tsx or app component
import { ProductMenu } from '@/components/ProductMenu'

export default function Home() {
  return (
    <div>
      <h1>The Simplest Products</h1>
      
      {/* Show all products with current one highlighted */}
      <ProductMenu currentProductId="combine-images" />
      
      {/* Your actual tool UI below */}
      <div className="mt-8">
        {/* Your combine images functionality */}
      </div>
    </div>
  )
}
