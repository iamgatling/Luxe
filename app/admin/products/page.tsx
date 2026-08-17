import Link from "next/link"
import Image from "next/image"
import { Plus, Pencil, Package, Tag, DollarSign, Layers, Activity, PackageOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { getAdminProducts } from "@/app/actions/admin"
import { formatCurrency } from "@/lib/utils"
import { DeleteProductButton } from "@/components/admin/delete-product-button"

export default async function AdminProductsPage() {
  const products = await getAdminProducts()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Products</h1>
            <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs font-semibold">
              {products.length} {products.length === 1 ? "Product" : "Products"}
            </Badge>
          </div>
          <p className="text-muted-foreground text-sm mt-1">Manage your catalog, stock levels, and pricing</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="gap-2 shadow-xs hover:shadow-md transition-all">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {products.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16"></TableHead>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5" />
                  Product Name
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
                  <DollarSign className="h-3.5 w-3.5" />
                  Price
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" />
                  Stock Level
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  Status
                </div>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const isOut = product.inventory_count <= 0
              const isLow = product.inventory_count > 0 && product.inventory_count <= 5

              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="relative h-11 w-11 overflow-hidden rounded-lg border border-border/60 bg-muted/50 shadow-2xs group-hover:scale-105 transition-transform duration-200">
                      <Image
                        src={product.image_url || "/placeholder.svg?height=44&width=44"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    <span className="line-clamp-1">{product.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-md bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border/40">
                      {product.category || "Uncategorized"}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold tabular-nums text-foreground tracking-tight">
                    {formatCurrency(product.price)}
                  </TableCell>
                  <TableCell>
                    {isOut ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive border border-destructive/20">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-destructive"></span>
                        </span>
                        Out of stock
                      </span>
                    ) : isLow ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                        Low stock ({product.inventory_count})
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        {product.inventory_count} units
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {product.is_active ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground border border-border">
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/60"></span>
                        Draft
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-muted text-muted-foreground hover:text-foreground">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit product</span>
                        </Button>
                      </Link>
                      <DeleteProductButton productId={product.id} productName={product.name} />
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={7} className="text-xs text-muted-foreground text-center py-3">
                Showing {products.length} catalog items
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-12 text-center bg-card/50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <PackageOpen className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No products found</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-6 max-w-sm">
            Your catalog is currently empty. Start adding products or seed initial data to manage catalog items.
          </p>
          <Link href="/admin/products/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add First Product
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
