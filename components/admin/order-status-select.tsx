"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { updateOrderStatus } from "@/app/actions/admin"
import { toast } from "sonner"
import type { Order } from "@/lib/types"

interface OrderStatusSelectProps {
  orderId: string
  currentStatus: Order["status"]
}

const statuses: Array<{ value: Order["status"]; label: string }> = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
]

export function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const [status, setStatus] = useState<Order["status"]>(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = async (value: string) => {
    if (!isOrderStatus(value)) return
    setIsUpdating(true)
    setStatus(value)

    const result = await updateOrderStatus(orderId, value)

    setIsUpdating(false)

    if (result.success) {
      toast.success("Order status updated")
    } else {
      setStatus(currentStatus)
      toast.error(result.error || "Failed to update status")
    }
  }

  return (
    <Select value={status} onValueChange={handleChange} disabled={isUpdating}>
      <SelectTrigger className="w-36">
        {isUpdating ? (
          <div className="flex items-center gap-2">
            <Spinner className="h-3.5 w-3.5" />
            <span className="text-xs text-muted-foreground">Updating...</span>
          </div>
        ) : (
          <SelectValue />
        )}
      </SelectTrigger>
      <SelectContent>
        {statuses.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function isOrderStatus(value: string): value is Order["status"] {
  return statuses.some((status) => status.value === value)
}
