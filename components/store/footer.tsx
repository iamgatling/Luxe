import Link from "next/link"

export function StoreFooter() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-semibold tracking-tight">
              LUXE
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-md">
              Discover premium products curated for those who appreciate quality and design. Every item in our
              collection is carefully selected.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Electronics"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Accessories"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Clothing"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clothing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
