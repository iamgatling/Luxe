import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminProductsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-36 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-64 rounded" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16"></TableHead>
            <TableHead><Skeleton className="h-4 w-28 rounded" /></TableHead>
            <TableHead><Skeleton className="h-4 w-20 rounded" /></TableHead>
            <TableHead><Skeleton className="h-4 w-16 rounded" /></TableHead>
            <TableHead><Skeleton className="h-4 w-24 rounded" /></TableHead>
            <TableHead><Skeleton className="h-4 w-16 rounded" /></TableHead>
            <TableHead className="text-right"><Skeleton className="h-4 w-16 rounded ml-auto" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 6 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-11 w-11 rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-40 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24 rounded-md" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24 rounded-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1.5">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
