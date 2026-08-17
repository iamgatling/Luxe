export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  inventory_count: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  customer_email: string
  customer_name: string
  stripe_session_id: string | null
  stripe_payment_intent_id: string | null
  status: "pending" | "processing" | "completed" | "cancelled" | "refunded"
  subtotal: number
  total: number
  shipping_first_name: string | null
  shipping_last_name: string | null
  shipping_email: string | null
  shipping_phone: string | null
  shipping_address_line1: string | null
  shipping_address_line2: string | null
  shipping_city: string | null
  shipping_state: string | null
  shipping_postal_code: string | null
  shipping_country: string | null
  created_at: string
  updated_at: string
}

export interface InventoryLogWithProduct extends InventoryLog {
  products: { name: string } | null
}

export interface ProductSummary {
  id: string
  name: string
  inventory_count: number
  price: number
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
  created_at: string
}

export interface InventoryLog {
  id: string
  product_id: string
  previous_count: number
  new_count: number
  change_type: string
  notes: string | null
  created_at: string
}
