import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminProductsLoading() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36 rounded-lg" />
          <Skeleton className="h-4 w-56 rounded" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 6 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-10 w-10 rounded-lg" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-40 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-24 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-16 rounded" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-12 rounded-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Skeleton className="h-8 w-8 rounded-md" />
                      <Skeleton className="h-8 w-8 rounded-md" />
                    </div>
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
