"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Box, Store, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/inventory", label: "Inventory", icon: Box },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const NavLinks = ({ onLinkClick }: { onLinkClick?: () => void }) => (
    <div className="flex flex-col h-full justify-between py-4">
      <nav className="space-y-1.5 px-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="px-3 pt-4 border-t border-border/60">
        <Link
          href="/"
          onClick={onLinkClick}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Store className="h-4 w-4 shrink-0" />
          <span>View Store</span>
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Sticky Top Header */}
      <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-border/80 bg-background/95 backdrop-blur-md px-4 sm:px-6 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-xs">
            <Store className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold tracking-tight text-foreground">LUXE Admin</span>
        </Link>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 flex flex-col">
            <SheetHeader className="h-16 px-6 border-b border-border/60 flex flex-row items-center gap-2.5 space-y-0 text-left">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
                <Store className="h-4 w-4 text-primary-foreground" />
              </div>
              <SheetTitle className="font-bold tracking-tight text-foreground text-base">LUXE Admin</SheetTitle>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              <NavLinks onLinkClick={() => setMobileOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-border/80 bg-background">
        <div className="flex h-16 items-center border-b border-border/60 px-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-xs">
              <Store className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight text-foreground">LUXE Admin</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto py-2">
          <NavLinks />
        </div>
      </aside>
    </>
  )
}
