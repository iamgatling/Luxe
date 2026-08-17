"use server"

import { revalidatePath } from "next/cache"

import {
  countLowStockProducts,
  countProducts,
  createProduct as dbCreateProduct,
  deleteProduct as dbDeleteProduct,
  getInventoryLogs as getInventoryLogsQuery,
  getOrderItemsByOrderId,
  getOrders,
  getProducts as dbGetProducts,
  getProductInventoryCount,
  insertInventoryLog,
  setProductInventory,
  updateOrderStatus as dbUpdateOrderStatus,
  updateProduct as dbUpdateProduct,
  type ProductInsert,
} from "@/lib/db"
import type { Order, OrderItem, Product } from "@/lib/types"

export async function getAdminProducts(): Promise<Product[]> {
  try {
    return await dbGetProducts()
  } catch (error) {
    console.error("Error fetching products:", error)
    return []
  }
}

export async function getAdminOrders(): Promise<Order[]> {
  try {
    return await getOrders()
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  try {
    return await getOrderItemsByOrderId(orderId)
  } catch (error) {
    console.error("Error fetching order items:", error)
    return []
  }
}

export async function getInventoryLogs(productId?: string) {
  try {
    return await getInventoryLogsQuery({ productId, limit: 50 })
  } catch (error) {
    console.error("Error fetching inventory logs:", error)
    return []
  }
}

export async function updateProductInventory(
  productId: string,
  newCount: number,
  notes?: string,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    const previousCount = await getProductInventoryCount(productId)
    if (previousCount === null) {
      return { success: false, error: "Product not found" }
    }

    await setProductInventory(productId, newCount)
    await insertInventoryLog({
      product_id: productId,
      previous_count: previousCount,
      new_count: newCount,
      change_type: newCount > previousCount ? "restock" : "adjustment",
      notes: notes ?? null,
    })

    revalidatePath("/admin")
    revalidatePath("/admin/inventory")
    revalidatePath("/products")

    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update inventory"
    console.error("Error updating inventory:", error)
    return { success: false, error: message }
  }
}

export async function createProduct(
  productData: ProductInsert,
): Promise<{ success: true; product: Product } | { success: false; error: string }> {
  try {
    const product = await dbCreateProduct(productData)
    revalidatePath("/admin")
    revalidatePath("/admin/products")
    revalidatePath("/products")
    return { success: true, product }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to create product"
    return { success: false, error: message }
  }
}

export async function updateProduct(
  productId: string,
  productData: Partial<ProductInsert>,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await dbUpdateProduct(productId, productData)
    revalidatePath("/admin")
    revalidatePath("/admin/products")
    revalidatePath("/products")
    revalidatePath(`/products/${productId}`)
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update product"
    return { success: false, error: message }
  }
}

export async function deleteProduct(
  productId: string,
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await dbDeleteProduct(productId)
    revalidatePath("/admin")
    revalidatePath("/admin/products")
    revalidatePath("/products")
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to delete product"
    return { success: false, error: message }
  }
}

export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
): Promise<{ success: true } | { success: false; error: string }> {
  try {
    await dbUpdateOrderStatus(orderId, status)
    revalidatePath("/admin")
    revalidatePath("/admin/orders")
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to update order status"
    return { success: false, error: message }
  }
}

export interface AdminStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  lowStockCount: number
}

export async function getAdminStats(): Promise<AdminStats> {
  try {
    const [totalProducts, orders, lowStockCount] = await Promise.all([
      countProducts(),
      getOrders(),
      countLowStockProducts(5),
    ])

    const completedOrders = orders.filter((order) => order.status === "completed")
    const totalRevenue = completedOrders.reduce((sum, order) => sum + order.total, 0)

    return {
      totalProducts,
      totalOrders: orders.length,
      totalRevenue,
      lowStockCount,
    }
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: 0,
      lowStockCount: 0,
    }
  }
}
