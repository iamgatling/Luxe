"use client"

import { useState, useCallback, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js"
import { useCart } from "@/lib/cart-context"
import { createCheckoutSession, completeOrder } from "@/app/actions/checkout"
import { ShippingForm, type ShippingFormData } from "@/components/store/shipping-form"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { Loader2, CheckCircle2, ShoppingBag, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage() {
  const { state, cartTotal, clearCart } = useCart()
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [shippingData, setShippingData] = useState<ShippingFormData | null>(null)

  const fetchClientSecret = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    const result = await createCheckoutSession(state.items)
    setIsLoading(false)

    if (result.error) {
      setError(result.error)
      return null
    }

    setClientSecret(result.clientSecret)
    return result.clientSecret
  }, [state.items])

  const handleShippingSubmit = (data: ShippingFormData) => {
    setShippingData(data)
    fetchClientSecret()
  }

  useEffect(() => {
    if (state.items.length > 0 && !clientSecret && !orderComplete && shippingData) {
      fetchClientSecret()
    }
  }, [state.items.length, clientSecret, orderComplete, shippingData, fetchClientSecret])

  const handleComplete = useCallback(async () => {
    if (!clientSecret || !shippingData) return


    const sessionId = clientSecret.split("_secret_")[0]

    const result = await completeOrder(sessionId, shippingData)

    if (result.success) {
      setOrderComplete(true)
      setOrderId(result.orderId || null)
      clearCart()
    }
  }, [clientSecret, shippingData, clearCart])


  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
        <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some products to your cart to checkout.</p>
        <Link href="/products">
          <Button size="lg">Browse Products</Button>
        </Link>
      </div>
    )
  }


  if (orderComplete) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-2">Thank you for your purchase.</p>
          {orderId && <p className="text-sm text-muted-foreground mb-8">Order ID: {orderId.slice(0, 8)}...</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Link
          href="/products"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Continue Shopping
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">

          <div>
            <h1 className="text-2xl font-semibold mb-8">Order Summary</h1>
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="flex gap-4 py-4 border-b border-border">
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.product.image_url || "/placeholder.svg?height=80&width=80"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="mt-auto font-medium">{formatCurrency(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between font-semibold text-lg pt-4 border-t border-border">
                <span>Total</span>
                <span>{formatCurrency(cartTotal)}</span>
              </div>
            </div>
          </div>

          <div>
            {!shippingData ? (
              <ShippingForm onSubmit={handleShippingSubmit} isLoading={isLoading} />
            ) : (
              <>
                <h2 className="text-2xl font-semibold mb-8">Payment</h2>

                {error && (
                  <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
                    {error}
                  </div>
                )}

                {isLoading && (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                )}

                {clientSecret && (
                  <div id="checkout" className="rounded-xl overflow-hidden border border-border">
                    <EmbeddedCheckoutProvider
                      stripe={stripePromise}
                      options={{
                        clientSecret,
                        onComplete: handleComplete,
                      }}
                    >
                      <EmbeddedCheckout />
                    </EmbeddedCheckoutProvider>
                  </div>
                )}


                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  onClick={() => {
                    setShippingData(null)
                    setClientSecret(null)
                  }}
                >
                  Edit Shipping
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
