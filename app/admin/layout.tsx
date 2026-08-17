import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30 flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 lg:pl-64 transition-all">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  )
}

