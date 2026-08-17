import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded" />
        </div>
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-8 w-28 rounded" />
              <Skeleton className="h-3 w-36 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>


      <div className="grid gap-8 lg:grid-cols-2">

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-4 w-44 rounded" />
            </div>
            <Skeleton className="h-8 w-20 rounded" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32 rounded" />
                  <Skeleton className="h-3 w-48 rounded" />
                </div>
                <div className="space-y-1 text-right">
                  <Skeleton className="h-4 w-16 rounded ml-auto" />
                  <Skeleton className="h-5 w-20 rounded-full ml-auto" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>


        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-6 w-32 rounded" />
              <Skeleton className="h-4 w-44 rounded" />
            </div>
            <Skeleton className="h-8 w-20 rounded" />
          </CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-36 rounded" />
                  <Skeleton className="h-3 w-24 rounded" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
