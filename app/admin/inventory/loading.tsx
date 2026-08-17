import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminInventoryLoading() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-36 rounded-lg" />
        <Skeleton className="h-4 w-56 rounded" />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="space-y-1">
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-4 w-60 rounded" />
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Current Stock</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Update</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-36 rounded" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24 rounded" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16 rounded" />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Skeleton className="h-8 w-16 rounded-md" />
                          <Skeleton className="h-8 w-16 rounded-md" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>


        <div>
          <Card>
            <CardHeader className="space-y-1">
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-4 w-44 rounded" />
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2 py-3 border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-5 w-14 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-3 w-36 rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
