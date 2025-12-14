import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAdminOrders } from "@/app/actions/admin"
import { formatCurrency } from "@/lib/utils"
import { OrderStatusSelect } from "@/components/admin/order-status-select"

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Orders</h1>
        <p className="text-muted-foreground">Manage customer orders</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">{order.id.slice(0, 8)}...</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          order.status === "completed"
                            ? "default"
                            : order.status === "cancelled" || order.status === "refunded"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <OrderStatusSelect orderId={order.id} currentStatus={order.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No orders yet. Orders will appear here after customers checkout.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
