import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAdminStats, getAdminOrders, getAdminProducts } from "@/app/actions/admin"
import { formatCurrency } from "@/lib/utils"
import { Package, ShoppingCart, DollarSign, AlertTriangle, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default async function AdminDashboard() {
  const [stats, recentOrders, products] = await Promise.all([getAdminStats(), getAdminOrders(), getAdminProducts()])

  const lowStockProducts = products.filter((p) => p.inventory_count <= 5 && p.is_active)

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Welcome back! Here's your store overview.</p>
        </div>
        <Link href="/admin/products/new" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Add Product</Button>
        </Link>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold tabular-nums">{formatCurrency(stats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground mt-0.5">From {stats.totalOrders} orders</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold tabular-nums">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-0.5">All time orders</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold tabular-nums">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Active products</p>
          </CardContent>
        </Card>
        <Card className="shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground shrink-0" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold tabular-nums">{stats.lowStockCount}</div>
            <p className="text-xs text-muted-foreground mt-0.5">Items need restocking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

        <Card className="shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-4">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold">Recent Orders</CardTitle>
              <CardDescription className="text-xs">Latest customer orders</CardDescription>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-xs px-2.5">
                View All <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length > 0 ? (
              <div className="space-y-3">
                {recentOrders.slice(0, 5).map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-2.5 border-b border-border/50 last:border-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-foreground truncate">{order.customer_name}</p>
                      <p className="text-xs text-muted-foreground truncate">{order.customer_email}</p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2">
                      <p className="font-semibold text-sm tabular-nums">{formatCurrency(order.total)}</p>
                      <Badge
                        variant={
                          order.status === "completed"
                            ? "default"
                            : order.status === "cancelled"
                              ? "destructive"
                              : "secondary"
                        }
                        className="text-[10px] px-2 py-0.5 capitalize"
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8 text-sm">No orders yet</p>
            )}
          </CardContent>
        </Card>


        <Card className="shadow-2xs">
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-4">
            <div>
              <CardTitle className="text-base sm:text-lg font-semibold">Low Stock Alert</CardTitle>
              <CardDescription className="text-xs">Products that need restocking</CardDescription>
            </div>
            <Link href="/admin/inventory">
              <Button variant="ghost" size="sm" className="gap-1 text-xs px-2.5">
                Manage <ArrowUpRight className="h-3 w-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between gap-3 py-2.5 border-b border-border/50 last:border-0"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-foreground truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                    </div>
                    <Badge variant={product.inventory_count === 0 ? "destructive" : "secondary"} className="shrink-0 text-[10px] px-2 py-0.5">
                      {product.inventory_count} left
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8 text-sm">All products are well stocked</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
