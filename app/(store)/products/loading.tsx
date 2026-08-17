import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsLoading() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-10 space-y-2">
          <Skeleton className="h-9 w-48 rounded-lg" />
          <Skeleton className="h-4 w-32 rounded" />
        </div>


        <div className="flex flex-wrap gap-2 mb-8">
          <Skeleton className="h-8 w-14 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-18 rounded-md" />
        </div>


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-3 w-1/3 rounded" />
              <Skeleton className="h-5 w-4/5 rounded" />
              <Skeleton className="h-4 w-1/4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
