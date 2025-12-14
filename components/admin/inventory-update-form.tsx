"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { updateProductInventory } from "@/app/actions/admin"
import { toast } from "sonner"
import { Loader2, Package } from "lucide-react"

interface InventoryUpdateFormProps {
  productId: string
  currentStock: number
}

export function InventoryUpdateForm({ productId, currentStock }: InventoryUpdateFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [newCount, setNewCount] = useState(currentStock.toString())
  const [notes, setNotes] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const result = await updateProductInventory(productId, Number.parseInt(newCount), notes || undefined)

    setIsLoading(false)

    if (result.success) {
      toast.success("Inventory updated")
      setIsOpen(false)
      setNotes("")
    } else {
      toast.error(result.error || "Failed to update inventory")
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 bg-transparent">
          <Package className="h-4 w-4" />
          Update
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Update Stock</h4>
            <p className="text-sm text-muted-foreground">Current stock: {currentStock} units</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newCount">New Stock Level</Label>
            <Input id="newCount" type="number" min="0" value={newCount} onChange={(e) => setNewCount(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Restocked from supplier"
              rows={2}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}
