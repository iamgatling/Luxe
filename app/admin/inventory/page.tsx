import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { getAdminProducts, getInventoryLogs } from "@/app/actions/admin"
import { InventoryUpdateForm } from "@/components/admin/inventory-update-form"
import { formatCurrency } from "@/lib/utils"
import { Package, Tag, Layers, DollarSign, SlidersHorizontal, History, ArrowUpRight, ArrowDownRight, PackageOpen } from "lucide-react"

export default async function AdminInventoryPage() {
  const [products, logs] = await Promise.all([getAdminProducts(), getInventoryLogs()])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
            <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs font-semibold">
              {products.length} {products.length === 1 ? "Item" : "Items"}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1">Track stock availability, log adjustments, and audit history</p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-2 space-y-4">
          <Card className="border border-border/80 shadow-xs">
            <CardHeader className="pb-4 border-b border-border/40">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <Layers className="h-5 w-5 text-primary" />
                    Stock Management
                  </CardTitle>
                  <CardDescription className="text-xs">Adjust and update current product inventory counts</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {products.length > 0 ? (
                <Table className="border-0 shadow-none rounded-none">
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <div className="flex items-center gap-1.5">
                          <Package className="h-3.5 w-3.5" />
                          Product
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1.5">
                          <Tag className="h-3.5 w-3.5" />
                          Category
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5" />
                          Stock Status
                        </div>
                      </TableHead>
                      <TableHead>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-3.5 w-3.5" />
                          Unit Price
                        </div>
                      </TableHead>
                      <TableHead className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <SlidersHorizontal className="h-3.5 w-3.5" />
                          Quick Adjust
                        </div>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => {
                      const count = product.inventory_count
                      const isOut = count <= 0
                      const isLow = count > 0 && count <= 5
                      const progressPct = Math.min(100, Math.max(0, (count / 20) * 100))

                      return (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium text-foreground">
                            {product.name}
                          </TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-md bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground border border-border/40">
                              {product.category || "General"}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1.5">
                              <div className="flex items-center gap-2">
                                {isOut ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive border border-destructive/20">
                                    <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse"></span>
                                    0 units
                                  </span>
                                ) : isLow ? (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
                                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                    {count} units
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                    {count} units
                                  </span>
                                )}
                              </div>
                              <div className="w-28 bg-muted h-1.5 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${
                                    isOut
                                      ? "bg-destructive"
                                      : isLow
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                  }`}
                                  style={{ width: `${progressPct}%` }}
                                />
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="font-semibold tabular-nums text-foreground tracking-tight">
                            {formatCurrency(product.price)}
                          </TableCell>
                          <TableCell className="text-right">
                            <InventoryUpdateForm productId={product.id} currentStock={product.inventory_count} />
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={5} className="text-xs text-muted-foreground text-center py-3">
                        Total {products.length} managed inventory items
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <PackageOpen className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">No inventory items found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border border-border/80 shadow-xs">
            <CardHeader className="pb-4 border-b border-border/40">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                Recent Audit Activity
              </CardTitle>
              <CardDescription className="text-xs">Latest automated and manual stock updates</CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              {logs.length > 0 ? (
                <div className="space-y-3">
                  {logs.slice(0, 8).map((log) => {
                    const isAddition = log.new_count > log.previous_count
                    const diff = log.new_count - log.previous_count

                    return (
                      <div
                        key={log.id}
                        className="flex flex-col gap-1.5 p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-medium text-xs text-foreground line-clamp-1">
                            {(log.products as { name: string } | null)?.name || "Unknown Product"}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              log.change_type === "sale"
                                ? "bg-destructive/10 text-destructive border border-destructive/20"
                                : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                            }`}
                          >
                            {isAddition ? (
                              <ArrowUpRight className="h-3 w-3" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" />
                            )}
                            {log.change_type}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5 font-mono">
                            <span>{log.previous_count}</span>
                            <span>→</span>
                            <span className="font-semibold text-foreground">{log.new_count}</span>
                            <span className={`font-semibold ${isAddition ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"}`}>
                              ({isAddition ? `+${diff}` : diff})
                            </span>
                          </div>
                          <span className="text-[10px] text-muted-foreground/80">
                            {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        {log.notes && <p className="text-[11px] text-muted-foreground/90 italic">{log.notes}</p>}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-xs text-muted-foreground">No recent inventory activity recorded</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
