"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateOrderStatus } from "@/app/actions/admin"
import { toast } from "sonner"

interface OrderStatusSelectProps {
  orderId: string
  currentStatus: string
}

const statuses = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
]

export function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleChange = async (newStatus: string) => {
    setIsUpdating(true)
    setStatus(newStatus)

    const result = await updateOrderStatus(orderId, newStatus)

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
      <SelectTrigger className="w-32">
        <SelectValue />
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
