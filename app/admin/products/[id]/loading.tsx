import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function EditProductLoading() {
  return (
    <div>
      <div className="mb-8 space-y-2">
        <Skeleton className="h-8 w-40 rounded-lg" />
        <Skeleton className="h-4 w-60 rounded" />
      </div>

      <Card className="max-w-2xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-36 rounded" />
          <Skeleton className="h-4 w-72 rounded" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-24 w-full rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
