import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { getAdminOrders } from "@/app/actions/admin"
import { formatCurrency } from "@/lib/utils"
import { OrderStatusSelect } from "@/components/admin/order-status-select"
import { Hash, User, Calendar, DollarSign, Activity, SlidersHorizontal, ShoppingBag } from "lucide-react"

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders()

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 capitalize">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            {status}
          </span>
        )
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-500/20 capitalize">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
            {status}
          </span>
        )
      case "cancelled":
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive border border-destructive/20 capitalize">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive"></span>
            {status}
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20 capitalize">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            {status}
          </span>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Orders</h1>
            <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs font-semibold">
              {orders.length} {orders.length === 1 ? "Order" : "Orders"}
            </Badge>
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">Track customer orders, updates, and fulfillment statuses</p>
        </div>
      </div>

      {orders.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <Hash className="h-3.5 w-3.5" />
                  Order ID
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <User className="h-3.5 w-3.5" />
                  Customer
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  Date
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5" />
                  Total
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  Status
                </div>
              </TableHead>
              <TableHead className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Update Status
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const customerInitials = order.customer_name
                ? order.customer_name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()
                : "CU"

              return (
                <TableRow key={order.id}>
                  <TableCell>
                    <span className="font-mono text-xs font-medium bg-muted/80 px-2 py-1 rounded-md text-foreground border border-border/40">
                      #{order.id.slice(0, 8)}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[150px] sm:max-w-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-xs border border-primary/20 shrink-0">
                        {customerInitials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-sm truncate">{order.customer_name}</p>
                        <p className="text-xs text-muted-foreground truncate">{order.customer_email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {new Date(order.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell className="font-semibold tabular-nums text-foreground tracking-tight">
                    {formatCurrency(order.total)}
                  </TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell className="text-right">
                    <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={6} className="text-xs text-muted-foreground text-center py-3">
                Showing {orders.length} placed orders
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 sm:p-12 text-center bg-card/50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <ShoppingBag className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No orders yet</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-sm">
            Customer orders will automatically appear here once checkouts are completed.
          </p>
        </div>
      )}
    </div>
  )
}
