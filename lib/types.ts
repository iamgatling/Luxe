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
  created_at: string
  updated_at: string
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
