"use client"

import { X, Minus, Plus, ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/utils"

export function CartDrawer() {
  const { state, toggleCart, removeItem, updateQuantity, cartTotal } = useCart()

  if (!state.isOpen) return null

  return (
    <>

      <div className="fixed inset-0 z-50 bg-black/50" onClick={toggleCart} />


      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-md bg-background shadow-xl flex flex-col">

        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold">Shopping Cart</h2>
          <Button variant="ghost" size="icon" onClick={toggleCart}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close cart</span>
          </Button>
        </div>


        <div className="flex-1 overflow-y-auto px-6 py-4">
          {state.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={toggleCart}>
                Continue Shopping
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {state.items.map((item) => (
                <li key={item.product.id} className="flex gap-4 py-4 border-b border-border last:border-0">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.product.image_url || "/placeholder.svg?height=80&width=80"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium line-clamp-2">{item.product.name}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.product.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.inventory_count}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>


        {state.items.length > 0 && (
          <div className="border-t border-border px-6 py-4 space-y-4">
            <div className="flex justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatCurrency(cartTotal)}</span>
            </div>
            <p className="text-sm text-muted-foreground">Shipping and taxes calculated at checkout.</p>
            <Link href="/checkout" onClick={toggleCart}>
              <Button className="w-full" size="lg">
                Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
