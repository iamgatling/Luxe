import { Skeleton } from "@/components/ui/skeleton"

export default function CheckoutLoading() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <Skeleton className="h-5 w-40 mb-8 rounded" />

        <div className="grid lg:grid-cols-2 gap-12">

          <div className="space-y-6">
            <Skeleton className="h-8 w-44 rounded-lg" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-4 py-4 border-b border-border">
                  <Skeleton className="h-20 w-20 rounded-lg shrink-0" />
                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4 rounded" />
                      <Skeleton className="h-3 w-16 rounded" />
                    </div>
                    <Skeleton className="h-4 w-20 rounded" />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-16 rounded" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-4 w-12 rounded" />
              </div>
              <div className="flex justify-between pt-4 border-t border-border">
                <Skeleton className="h-6 w-24 rounded" />
                <Skeleton className="h-6 w-24 rounded" />
              </div>
            </div>
          </div>


          <div className="space-y-6">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-28 rounded" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
            <Skeleton className="h-11 w-full rounded-md mt-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
