import "server-only"

import { Pool, type QueryResultRow } from "pg"

import type {
  InventoryLog,
  InventoryLogWithProduct,
  Order,
  OrderItem,
  Product,
  ProductSummary,
} from "@/lib/types"

type SqlValue = string | number | boolean | null | Date | string[]

function toParam<T extends SqlValue>(value: T): T {
  return value
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString()
  if (typeof value === "string") return value
  return String(value)
}

function toNumber(value: unknown): number {
  if (typeof value === "number") return value
  if (typeof value === "string") return Number(value)
  return Number(value)
}

function mapProduct(row: QueryResultRow): Product {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: toNumber(row.price),
    image_url: row.image_url,
    category: row.category,
    inventory_count: toNumber(row.inventory_count),
    is_active: row.is_active,
    created_at: toIso(row.created_at),
    updated_at: toIso(row.updated_at),
  }
}

function mapOrder(row: QueryResultRow): Order {
  return {
    id: row.id,
    customer_email: row.customer_email,
    customer_name: row.customer_name,
    stripe_session_id: row.stripe_session_id,
    stripe_payment_intent_id: row.stripe_payment_intent_id,
    status: row.status,
    subtotal: toNumber(row.subtotal),
    total: toNumber(row.total),
    shipping_first_name: row.shipping_first_name,
    shipping_last_name: row.shipping_last_name,
    shipping_email: row.shipping_email,
    shipping_phone: row.shipping_phone,
    shipping_address_line1: row.shipping_address_line1,
    shipping_address_line2: row.shipping_address_line2,
    shipping_city: row.shipping_city,
    shipping_state: row.shipping_state,
    shipping_postal_code: row.shipping_postal_code,
    shipping_country: row.shipping_country,
    created_at: toIso(row.created_at),
    updated_at: toIso(row.updated_at),
  }
}

function mapOrderItem(row: QueryResultRow): OrderItem {
  return {
    id: row.id,
    order_id: row.order_id,
    product_id: row.product_id,
    product_name: row.product_name,
    quantity: toNumber(row.quantity),
    unit_price: toNumber(row.unit_price),
    created_at: toIso(row.created_at),
  }
}

function mapInventoryLog(row: QueryResultRow): InventoryLog {
  return {
    id: row.id,
    product_id: row.product_id,
    previous_count: toNumber(row.previous_count),
    new_count: toNumber(row.new_count),
    change_type: row.change_type,
    notes: row.notes,
    created_at: toIso(row.created_at),
  }
}

function mapInventoryLogWithProduct(row: QueryResultRow): InventoryLogWithProduct {
  return {
    ...mapInventoryLog(row),
    products: row.products ?? null,
  }
}

function mapProductSummary(row: QueryResultRow): ProductSummary {
  return {
    id: row.id,
    name: row.name,
    inventory_count: toNumber(row.inventory_count),
    price: toNumber(row.price),
  }
}

export async function getFeaturedProducts(limit: number): Promise<Product[]> {
  const result = await pool.query<QueryResultRow>(
    `SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC LIMIT $1`,
    [toParam(limit)],
  )
  return result.rows.map(mapProduct)
}

export async function getProducts(category?: string): Promise<Product[]> {
  if (category) {
    const result = await pool.query<QueryResultRow>(
      `SELECT * FROM products WHERE is_active = true AND category = $1 ORDER BY created_at DESC`,
      [toParam(category)],
    )
    return result.rows.map(mapProduct)
  }

  const result = await pool.query<QueryResultRow>(
    `SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC`,
  )
  return result.rows.map(mapProduct)
}

export async function getProductCategories(): Promise<string[]> {
  const result = await pool.query<QueryResultRow>(
    `SELECT DISTINCT category FROM products WHERE is_active = true AND category IS NOT NULL ORDER BY category ASC`,
  )
  return result.rows
    .map((row) => row.category)
    .filter((value): value is string => typeof value === "string" && value.length > 0)
}

export async function getProductById(id: string, options?: { activeOnly?: boolean }): Promise<Product | null> {
  const result = await pool.query<QueryResultRow>(
    `SELECT * FROM products WHERE id = $1 ${options?.activeOnly ? "AND is_active = true" : ""} LIMIT 1`,
    [toParam(id)],
  )
  const row = result.rows[0]
  return row ? mapProduct(row) : null
}

export async function getProductsByIds(ids: string[]): Promise<ProductSummary[]> {
  if (ids.length === 0) return []
  const result = await pool.query<QueryResultRow>(
    `SELECT id, name, inventory_count, price FROM products WHERE id = ANY($1::uuid[])`,
    [toParam(ids)],
  )
  return result.rows.map(mapProductSummary)
}

export async function getProductInventoryCount(id: string): Promise<number | null> {
  const result = await pool.query<QueryResultRow>(
    `SELECT inventory_count FROM products WHERE id = $1 LIMIT 1`,
    [toParam(id)],
  )
  const row = result.rows[0]
  return row ? toNumber(row.inventory_count) : null
}

export async function countProducts(): Promise<number> {
  const result = await pool.query<QueryResultRow>(
    `SELECT COUNT(*)::int AS count FROM products`,
  )
  return toNumber(result.rows[0]?.count ?? 0)
}

export async function countLowStockProducts(threshold: number): Promise<number> {
  const result = await pool.query<QueryResultRow>(
    `SELECT COUNT(*)::int AS count FROM products WHERE inventory_count <= $1`,
    [toParam(threshold)],
  )
  return toNumber(result.rows[0]?.count ?? 0)
}

export async function getOrders(): Promise<Order[]> {
  const result = await pool.query<QueryResultRow>(
    `SELECT * FROM orders ORDER BY created_at DESC`,
  )
  return result.rows.map(mapOrder)
}

export async function getOrderItemsByOrderId(orderId: string): Promise<OrderItem[]> {
  const result = await pool.query<QueryResultRow>(
    `SELECT * FROM order_items WHERE order_id = $1 ORDER BY created_at ASC`,
    [toParam(orderId)],
  )
  return result.rows.map(mapOrderItem)
}

export async function getInventoryLogs(options?: { productId?: string; limit?: number }): Promise<InventoryLogWithProduct[]> {
  const params: SqlValue[] = []
  let where = ""
  if (options?.productId) {
    params.push(toParam(options.productId))
    where = `WHERE il.product_id = $${params.length}`
  }
  params.push(toParam(options?.limit ?? 50))
  const limitClause = `LIMIT $${params.length}`

  const result = await pool.query<QueryResultRow>(
    `SELECT il.*, json_build_object('name', p.name) AS products
       FROM inventory_logs il
       LEFT JOIN products p ON p.id = il.product_id
       ${where}
       ORDER BY il.created_at DESC
       ${limitClause}`,
    params,
  )
  return result.rows.map(mapInventoryLogWithProduct)
}

export type ProductInsert = Omit<Product, "id" | "created_at" | "updated_at">

export async function createProduct(data: ProductInsert): Promise<Product> {
  const result = await pool.query<QueryResultRow>(
    `INSERT INTO products (name, description, price, image_url, category, inventory_count, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
    [
      toParam(data.name),
      toParam(data.description),
      toParam(data.price),
      toParam(data.image_url),
      toParam(data.category),
      toParam(data.inventory_count),
      toParam(data.is_active),
    ],
  )
  const row = result.rows[0]
  if (!row) throw new Error("Failed to create product")
  return mapProduct(row)
}

export async function updateProduct(id: string, data: Partial<ProductInsert>): Promise<void> {
  const sets: string[] = []
  const params: SqlValue[] = []

  const fields: Array<keyof ProductInsert> = [
    "name",
    "description",
    "price",
    "image_url",
    "category",
    "inventory_count",
    "is_active",
  ]
  for (const field of fields) {
    if (field in data) {
      params.push(toParam(data[field] as SqlValue))
      sets.push(`${field} = $${params.length}`)
    }
  }

  sets.push("updated_at = NOW()")
  params.push(toParam(id))

  await pool.query(
    `UPDATE products SET ${sets.join(", ")} WHERE id = $${params.length}`,
    params,
  )
}

export async function deleteProduct(id: string): Promise<void> {
  await pool.query(`DELETE FROM products WHERE id = $1`, [toParam(id)])
}

export interface InventoryLogInsert {
  product_id: string
  previous_count: number
  new_count: number
  change_type: string
  notes?: string | null
}

export async function insertInventoryLog(log: InventoryLogInsert): Promise<void> {
  await pool.query(
    `INSERT INTO inventory_logs (product_id, previous_count, new_count, change_type, notes)
       VALUES ($1, $2, $3, $4, $5)`,
    [
      toParam(log.product_id),
      toParam(log.previous_count),
      toParam(log.new_count),
      toParam(log.change_type),
      toParam(log.notes ?? null),
    ],
  )
}

export async function setProductInventory(id: string, newCount: number): Promise<void> {
  await pool.query(
    `UPDATE products SET inventory_count = $1, updated_at = NOW() WHERE id = $2`,
    [toParam(newCount), toParam(id)],
  )
}

export type OrderInsert = Omit<Order, "id" | "created_at" | "updated_at">

export async function createOrder(data: OrderInsert): Promise<Order> {
  const result = await pool.query<QueryResultRow>(
    `INSERT INTO orders (
        customer_email,
        customer_name,
        stripe_session_id,
        stripe_payment_intent_id,
        status,
        subtotal,
        total,
        shipping_first_name,
        shipping_last_name,
        shipping_email,
        shipping_phone,
        shipping_address_line1,
        shipping_address_line2,
        shipping_city,
        shipping_state,
        shipping_postal_code,
        shipping_country
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
      RETURNING *`,
    [
      toParam(data.customer_email),
      toParam(data.customer_name),
      toParam(data.stripe_session_id),
      toParam(data.stripe_payment_intent_id),
      toParam(data.status),
      toParam(data.subtotal),
      toParam(data.total),
      toParam(data.shipping_first_name),
      toParam(data.shipping_last_name),
      toParam(data.shipping_email),
      toParam(data.shipping_phone),
      toParam(data.shipping_address_line1),
      toParam(data.shipping_address_line2),
      toParam(data.shipping_city),
      toParam(data.shipping_state),
      toParam(data.shipping_postal_code),
      toParam(data.shipping_country),
    ],
  )
  const row = result.rows[0]
  if (!row) throw new Error("Failed to create order")
  return mapOrder(row)
}

export interface OrderItemInsert {
  order_id: string
  product_id: string
  product_name: string
  quantity: number
  unit_price: number
}

export async function insertOrderItems(items: OrderItemInsert[]): Promise<void> {
  if (items.length === 0) return
  const params: SqlValue[] = []
  const valueRows: string[] = []
  for (const item of items) {
    const base = params.length
    params.push(
      toParam(item.order_id),
      toParam(item.product_id),
      toParam(item.product_name),
      toParam(item.quantity),
      toParam(item.unit_price),
    )
    valueRows.push(`($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5})`)
  }
  await pool.query(
    `INSERT INTO order_items (order_id, product_id, product_name, quantity, unit_price)
       VALUES ${valueRows.join(", ")}`,
    params,
  )
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<void> {
  await pool.query(
    `UPDATE orders SET status = $1, updated_at = NOW() WHERE id = $2`,
    [toParam(status), toParam(id)],
  )
}
