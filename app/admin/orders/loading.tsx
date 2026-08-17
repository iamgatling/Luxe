import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminOrdersLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-32 rounded-lg" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
          <Skeleton className="h-4 w-60 rounded" />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Skeleton className="h-4 w-20 rounded" /></TableHead>
            <TableHead><Skeleton className="h-4 w-28 rounded" /></TableHead>
            <TableHead><Skeleton className="h-4 w-16 rounded" /></TableHead>
            <TableHead><Skeleton className="h-4 w-16 rounded" /></TableHead>
            <TableHead><Skeleton className="h-4 w-20 rounded" /></TableHead>
            <TableHead className="text-right"><Skeleton className="h-4 w-28 rounded ml-auto" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 6 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-md font-mono" />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-3 w-44 rounded" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20 rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-24 rounded-full" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-9 w-32 rounded-md ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
