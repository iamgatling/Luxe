"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"
import { toast } from "sonner"

interface AddToCartButtonProps {
  product: Product
  disabled?: boolean
}

export function AddToCartButton({ product, disabled }: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast.success(`${quantity} x ${product.name} added to cart`)
    setQuantity(1)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center border border-border rounded-lg">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-r-none"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
          <span className="sr-only">Decrease quantity</span>
        </Button>
        <span className="w-12 text-center font-medium">{quantity}</span>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-l-none"
          onClick={() => setQuantity(Math.min(product.inventory_count, quantity + 1))}
          disabled={quantity >= product.inventory_count}
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Increase quantity</span>
        </Button>
      </div>
      <Button size="lg" className="flex-1 gap-2" onClick={handleAddToCart} disabled={disabled}>
        <ShoppingBag className="h-4 w-4" />
        {disabled ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  )
}
