import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { createAdminClient } from "@/lib/supabase/server"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { AddToCartButton } from "@/components/store/add-to-cart-button"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createAdminClient()
  const { data, error } = await supabase.from("products").select("*").eq("id", id).eq("is_active", true).single()

  if (error) {
    console.error("Error fetching product:", error)
    return null
  }

  return data
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const isOutOfStock = product.inventory_count === 0
  const isLowStock = product.inventory_count > 0 && product.inventory_count <= 5

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">

          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <Image
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>


          <div className="flex flex-col">
            {product.category && (
              <p className="text-sm text-muted-foreground uppercase tracking-wide">{product.category}</p>
            )}
            <h1 className="mt-2 text-3xl font-semibold">{product.name}</h1>
            <p className="mt-4 text-2xl font-semibold">{formatCurrency(product.price)}</p>


            <div className="mt-4">
              {isOutOfStock ? (
                <Badge variant="destructive">Out of Stock</Badge>
              ) : isLowStock ? (
                <Badge variant="secondary">Only {product.inventory_count} left</Badge>
              ) : (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  In Stock
                </Badge>
              )}
            </div>


            {product.description && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}


            <div className="mt-8">
              <AddToCartButton product={product} disabled={isOutOfStock} />
            </div>


            <div className="mt-12 pt-8 border-t border-border space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over $100</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <svg className="h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm">Easy Returns</p>
                  <p className="text-sm text-muted-foreground">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
