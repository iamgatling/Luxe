import { Skeleton } from "@/components/ui/skeleton"

export default function ProductDetailLoading() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Skeleton className="h-5 w-32 mb-8 rounded" />

        <div className="grid lg:grid-cols-2 gap-12">

          <Skeleton className="aspect-square w-full rounded-2xl" />


          <div className="flex flex-col space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-9 w-3/4 rounded-lg" />
              <Skeleton className="h-8 w-28 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>


            <div className="pt-4 space-y-2">
              <Skeleton className="h-4 w-24 rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>


            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Skeleton className="h-10 w-32 rounded-lg" />
              <Skeleton className="h-10 flex-1 rounded-lg" />
            </div>


            <div className="mt-8 pt-8 border-t border-border space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-3 w-40 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full shrink-0" />
                <div className="space-y-1 flex-1">
                  <Skeleton className="h-4 w-28 rounded" />
                  <Skeleton className="h-3 w-40 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
