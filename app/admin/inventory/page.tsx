import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAdminProducts, getInventoryLogs } from "@/app/actions/admin"
import { InventoryUpdateForm } from "@/components/admin/inventory-update-form"
import { formatCurrency } from "@/lib/utils"

export default async function AdminInventoryPage() {
  const [products, logs] = await Promise.all([getAdminProducts(), getInventoryLogs()])

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Inventory</h1>
        <p className="text-muted-foreground">Track and manage product inventory</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Stock</CardTitle>
              <CardDescription>Update inventory levels for your products</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {products.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="text-right">Update</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category || "-"}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              product.inventory_count === 0
                                ? "destructive"
                                : product.inventory_count <= 5
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {product.inventory_count} units
                          </Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell className="text-right">
                          <InventoryUpdateForm productId={product.id} currentStock={product.inventory_count} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products to manage. Add products first.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>


        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest inventory changes</CardDescription>
            </CardHeader>
            <CardContent>
              {logs.length > 0 ? (
                <div className="space-y-4">
                  {logs.slice(0, 10).map((log) => (
                    <div key={log.id} className="flex flex-col gap-1 py-3 border-b border-border last:border-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">
                          {(log.products as { name: string } | null)?.name || "Unknown Product"}
                        </span>
                        <Badge variant={log.change_type === "sale" ? "destructive" : "default"} className="text-xs">
                          {log.change_type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{log.previous_count}</span>
                        <span>→</span>
                        <span>{log.new_count}</span>
                        <span className="text-xs">
                          ({log.new_count > log.previous_count ? "+" : ""}
                          {log.new_count - log.previous_count})
                        </span>
                      </div>
                      {log.notes && <p className="text-xs text-muted-foreground">{log.notes}</p>}
                      <p className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">No inventory changes yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
