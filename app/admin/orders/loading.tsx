import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminOrdersLoading() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-32 rounded-lg" />
        <Skeleton className="h-4 w-48 rounded" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-4 w-24 rounded font-mono" />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32 rounded" />
                      <Skeleton className="h-3 w-48 rounded" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-28 rounded-md ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
