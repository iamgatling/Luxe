import { Suspense } from "react"
import { ProductCard } from "@/components/store/product-card"
import { createAdminClient } from "@/lib/supabase/server"
import type { Product } from "@/lib/types"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ProductsPageProps {
  searchParams: Promise<{ category?: string }>
}

async function getProducts(category?: string): Promise<Product[]> {
  const supabase = await createAdminClient()
  let query = supabase.from("products").select("*").eq("is_active", true).order("created_at", { ascending: false })

  if (category) {
    query = query.eq("category", category)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

async function getCategories(): Promise<string[]> {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from("products")
    .select("category")
    .eq("is_active", true)
    .not("category", "is", null)

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  const categories = [...new Set(data?.map((p) => p.category).filter(Boolean) || [])]
  return categories as string[]
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams
  const category = params.category
  const [products, categories] = await Promise.all([getProducts(category), getCategories()])

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10">
          <h1 className="text-3xl font-semibold">{category || "All Products"}</h1>
          <p className="mt-2 text-muted-foreground">
            {products.length} product{products.length !== 1 ? "s" : ""} available
          </p>
        </div>


        <div className="flex flex-wrap gap-2 mb-8">
          <Link href="/products">
            <Button variant={!category ? "default" : "outline"} size="sm">
              All
            </Button>
          </Link>
          {categories.map((cat) => (
            <Link key={cat} href={`/products?category=${cat}`}>
              <Button variant={category === cat ? "default" : "outline"} size="sm">
                {cat}
              </Button>
            </Link>
          ))}
        </div>


        <Suspense fallback={<ProductsGridSkeleton />}>
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/30 rounded-xl">
              <p className="text-muted-foreground">No products found. Run the database seed scripts to add products.</p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  )
}

function ProductsGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-square bg-muted rounded-xl" />
          <div className="mt-4 h-4 bg-muted rounded w-1/3" />
          <div className="mt-2 h-4 bg-muted rounded w-2/3" />
          <div className="mt-2 h-4 bg-muted rounded w-1/4" />
        </div>
      ))}
    </div>
  )
}
