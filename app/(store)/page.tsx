import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/store/product-card"
import { createAdminClient } from "@/lib/supabase/server"
import type { Product } from "@/lib/types"

async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = await createAdminClient()
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(4)

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts()

  return (
    <div>

      <section className="relative bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
                Curated products for modern living
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-lg">
                Discover a thoughtfully selected collection of premium products designed to elevate your everyday
                experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="gap-2">
                    Shop Collection <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/products?category=Electronics">
                  <Button size="lg" variant="outline">
                    Browse Electronics
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
              <Image src="/premium-lifestyle-products-flatlay.jpg" alt="Featured products" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-semibold">Featured Products</h2>
              <p className="mt-1 text-muted-foreground">Our latest arrivals</p>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-muted/30 rounded-xl">
              <p className="text-muted-foreground">
                No products available yet. Run the database seed scripts to add products.
              </p>
            </div>
          )}
        </div>
      </section>


      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold mb-10 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Electronics", image: "/modern-electronics.png" },
              { name: "Accessories", image: "/premium-leather-accessories.png" },
              { name: "Clothing", image: "/minimalist-fashion-clothing.jpg" },
              { name: "Home", image: "/modern-home-decor.png" },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.name}`}
                className="group relative aspect-square rounded-xl overflow-hidden bg-muted"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-semibold mb-4">Ready to elevate your lifestyle?</h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
              Join thousands of customers who trust LUXE for their premium product needs.
            </p>
            <Link href="/products">
              <Button size="lg" variant="secondary" className="gap-2">
                Start Shopping <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
