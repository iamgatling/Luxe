"use server"

import { stripe } from "@/lib/stripe"
import { createAdminClient } from "@/lib/supabase/server"
import type { CartItem } from "@/lib/types"
import type { ShippingFormData } from "@/components/store/shipping-form"

interface CheckoutResult {
  clientSecret: string | null
  error?: string
}

export async function createCheckoutSession(items: CartItem[]): Promise<CheckoutResult> {
  if (!items.length) {
    return { clientSecret: null, error: "Cart is empty" }
  }

  const supabase = await createAdminClient()


  const productIds = items.map((item) => item.product.id)
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, inventory_count, price")
    .in("id", productIds)

  if (productsError || !products) {
    return { clientSecret: null, error: "Failed to validate products" }
  }


  for (const item of items) {
    const product = products.find((p) => p.id === item.product.id)
    if (!product) {
      return { clientSecret: null, error: `Product ${item.product.name} not found` }
    }
    if (product.inventory_count < item.quantity) {
      return {
        clientSecret: null,
        error: `Insufficient stock for ${product.name}. Only ${product.inventory_count} available.`,
      }
    }
  }


  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const total = subtotal

  const getStripeImageUrl = (imageUrl: string | null | undefined): string[] | undefined => {
    if (!imageUrl) return undefined


    if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
      return [imageUrl]
    }



    return undefined
  }


  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          description: item.product.description || undefined,
          images: getStripeImageUrl(item.product.image_url),
        },
        unit_amount: Math.round(item.product.price * 100),
      },
      quantity: item.quantity,
    })),
    mode: "payment",
    metadata: {
      items: JSON.stringify(
        items.map((item) => ({
          productId: item.product.id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      ),
      subtotal: subtotal.toString(),
      total: total.toString(),
    },
  })

  return { clientSecret: session.client_secret }
}

export async function completeOrder(sessionId: string, shippingData: ShippingFormData) {
  const supabase = await createAdminClient()


  const session = await stripe.checkout.sessions.retrieve(sessionId)

  if (!session.metadata?.items) {
    return { success: false, error: "Invalid session" }
  }

  const items = JSON.parse(session.metadata.items) as Array<{
    productId: string
    productName: string
    quantity: number
    unitPrice: number
  }>

  const subtotal = Number.parseFloat(session.metadata.subtotal || "0")
  const total = Number.parseFloat(session.metadata.total || "0")


  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_email: shippingData.email,
      customer_name: `${shippingData.firstName} ${shippingData.lastName}`,
      stripe_session_id: sessionId,
      stripe_payment_intent_id: session.payment_intent as string,
      status: "completed",
      subtotal,
      total,
      shipping_first_name: shippingData.firstName,
      shipping_last_name: shippingData.lastName,
      shipping_email: shippingData.email,
      shipping_phone: shippingData.phone,
      shipping_address_line1: shippingData.addressLine1,
      shipping_address_line2: shippingData.addressLine2,
      shipping_city: shippingData.city,
      shipping_state: shippingData.state,
      shipping_postal_code: shippingData.postalCode,
      shipping_country: shippingData.country,
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error("Order creation error:", orderError)
    return { success: false, error: "Failed to create order" }
  }


  const orderItems = items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    product_name: item.productName,
    quantity: item.quantity,
    unit_price: item.unitPrice,
  }))

  const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

  if (itemsError) {
    console.error("Order items error:", itemsError)
  }


  for (const item of items) {
    const { data: product } = await supabase
      .from("products")
      .select("inventory_count")
      .eq("id", item.productId)
      .single()

    if (product) {
      const newCount = Math.max(0, product.inventory_count - item.quantity)


      await supabase.from("products").update({ inventory_count: newCount }).eq("id", item.productId)


      await supabase.from("inventory_logs").insert({
        product_id: item.productId,
        previous_count: product.inventory_count,
        new_count: newCount,
        change_type: "sale",
        notes: `Order ${order.id}`,
      })
    }
  }

  return { success: true, orderId: order.id }
}
