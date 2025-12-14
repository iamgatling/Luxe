"use server"

import { createAdminClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import type { Product } from "@/lib/types"

export async function getAdminProducts() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return data || []
}

export async function getAdminOrders() {
  const supabase = await createAdminClient()
  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching orders:", error)
    return []
  }

  return data || []
}

export async function getOrderItems(orderId: string) {
  const supabase = await createAdminClient()
  const { data, error } = await supabase.from("order_items").select("*").eq("order_id", orderId)

  if (error) {
    console.error("Error fetching order items:", error)
    return []
  }

  return data || []
}

export async function getInventoryLogs(productId?: string) {
  const supabase = await createAdminClient()
  let query = supabase.from("inventory_logs").select("*, products(name)").order("created_at", { ascending: false })

  if (productId) {
    query = query.eq("product_id", productId)
  }

  const { data, error } = await query.limit(50)

  if (error) {
    console.error("Error fetching inventory logs:", error)
    return []
  }

  return data || []
}

export async function updateProductInventory(productId: string, newCount: number, notes?: string) {
  const supabase = await createAdminClient()


  const { data: product } = await supabase.from("products").select("inventory_count").eq("id", productId).single()

  if (!product) {
    return { success: false, error: "Product not found" }
  }

  const previousCount = product.inventory_count


  const { error: updateError } = await supabase
    .from("products")
    .update({ inventory_count: newCount, updated_at: new Date().toISOString() })
    .eq("id", productId)

  if (updateError) {
    return { success: false, error: "Failed to update inventory" }
  }


  await supabase.from("inventory_logs").insert({
    product_id: productId,
    previous_count: previousCount,
    new_count: newCount,
    change_type: newCount > previousCount ? "restock" : "adjustment",
    notes: notes || null,
  })

  revalidatePath("/admin")
  revalidatePath("/admin/inventory")
  revalidatePath("/products")

  return { success: true }
}

export async function createProduct(productData: Omit<Product, "id" | "created_at" | "updated_at">) {
  const supabase = await createAdminClient()

  const { data, error } = await supabase.from("products").insert(productData).select().single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/admin/products")
  revalidatePath("/products")

  return { success: true, product: data }
}

export async function updateProduct(productId: string, productData: Partial<Product>) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from("products")
    .update({ ...productData, updated_at: new Date().toISOString() })
    .eq("id", productId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/admin/products")
  revalidatePath("/products")
  revalidatePath(`/products/${productId}`)

  return { success: true }
}

export async function deleteProduct(productId: string) {
  const supabase = await createAdminClient()

  const { error } = await supabase.from("products").delete().eq("id", productId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/admin/products")
  revalidatePath("/products")

  return { success: true }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createAdminClient()

  const { error } = await supabase
    .from("orders")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", orderId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath("/admin")
  revalidatePath("/admin/orders")

  return { success: true }
}

export async function getAdminStats() {
  const supabase = await createAdminClient()

  const [productsResult, ordersResult, lowStockResult] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("orders").select("total, status"),
    supabase.from("products").select("id", { count: "exact", head: true }).lte("inventory_count", 5),
  ])

  const totalProducts = productsResult.count || 0
  const orders = ordersResult.data || []
  const completedOrders = orders.filter((o) => o.status === "completed")
  const totalRevenue = completedOrders.reduce((sum, o) => sum + Number(o.total), 0)
  const lowStockCount = lowStockResult.count || 0

  return {
    totalProducts,
    totalOrders: orders.length,
    totalRevenue,
    lowStockCount,
  }
}
