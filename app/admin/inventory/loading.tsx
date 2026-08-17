import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminInventoryLoading() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-36 rounded-lg" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-64 rounded" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        <div className="lg:col-span-2">
          <Card className="border border-border/80 shadow-xs">
            <CardHeader className="pb-4 border-b border-border/40 space-y-1">
              <Skeleton className="h-6 w-40 rounded" />
              <Skeleton className="h-4 w-64 rounded" />
            </CardHeader>
            <CardContent className="p-0">
              <Table className="border-0 shadow-none rounded-none">
                <TableHeader>
                  <TableRow>
                    <TableHead><Skeleton className="h-4 w-20 rounded" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-20 rounded" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-24 rounded" /></TableHead>
                    <TableHead><Skeleton className="h-4 w-20 rounded" /></TableHead>
                    <TableHead className="text-right"><Skeleton className="h-4 w-24 rounded ml-auto" /></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-36 rounded" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20 rounded-md" />
                      </TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Skeleton className="h-5 w-20 rounded-full" />
                          <Skeleton className="h-1.5 w-28 rounded-full" />
                        </div>
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
          <Card className="border border-border/80 shadow-xs">
            <CardHeader className="pb-4 border-b border-border/40 space-y-1">
              <Skeleton className="h-6 w-36 rounded" />
              <Skeleton className="h-4 w-48 rounded" />
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="p-3 rounded-lg border border-border/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-4 w-32 rounded" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-28 rounded" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
