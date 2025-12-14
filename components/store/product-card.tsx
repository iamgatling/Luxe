"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    if (product.inventory_count > 0) {
      addItem(product)
      toast.success(`${product.name} added to cart`)
    }
  }

  const isOutOfStock = product.inventory_count === 0

  return (
    <Card className="group overflow-hidden border-0 shadow-none bg-transparent">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
          <Image
            src={product.image_url || "/placeholder.svg?height=400&width=400"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isOutOfStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge variant="secondary" className="text-sm">
                Out of Stock
              </Badge>
            </div>
          )}
          {!isOutOfStock && (
            <Button
              size="icon"
              className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
              onClick={handleAddToCart}
            >
              <Plus className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          )}
        </div>
        <CardContent className="px-0 pt-4">
          {product.category && (
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">{product.category}</p>
          )}
          <h3 className="font-medium text-foreground line-clamp-1 group-hover:text-muted-foreground transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm font-semibold">{formatCurrency(product.price)}</p>
        </CardContent>
      </Link>
    </Card>
  )
}
