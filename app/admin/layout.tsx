import type React from "react"
import Link from "next/link"
import { LayoutDashboard, Package, ShoppingCart, Box, Store } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">

      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-background">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Store className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">LUXE Admin</span>
          </Link>
        </div>
        <nav className="p-4 space-y-1">
          <Link
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/products"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Package className="h-4 w-4" />
            Products
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            Orders
          </Link>
          <Link
            href="/admin/inventory"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Box className="h-4 w-4" />
            Inventory
          </Link>
        </nav>
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Store className="h-4 w-4" />
            View Store
          </Link>
        </div>
      </aside>


      <main className="pl-64">
        <div className="p-8">{children}</div>
      </main>
    </div>
  )
}
