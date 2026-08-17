import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="space-y-12 pb-16">

      <section className="relative bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Skeleton className="h-12 sm:h-16 w-4/5 rounded-lg" />
              <Skeleton className="mt-4 h-12 w-3/4 rounded-lg" />
              <Skeleton className="mt-6 h-5 w-full max-w-lg rounded" />
              <Skeleton className="mt-2 h-5 w-2/3 max-w-lg rounded" />
              <div className="mt-8 flex flex-wrap gap-4">
                <Skeleton className="h-11 w-40 rounded-md" />
                <Skeleton className="h-11 w-44 rounded-md" />
              </div>
            </div>
            <Skeleton className="aspect-square lg:aspect-[4/3] w-full rounded-2xl" />
          </div>
        </div>
      </section>


      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Skeleton className="h-8 w-48 rounded" />
              <Skeleton className="mt-2 h-4 w-32 rounded" />
            </div>
            <Skeleton className="h-9 w-24 rounded-md" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="h-3 w-1/3 rounded" />
                <Skeleton className="h-5 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/4 rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-56 mx-auto mb-10 rounded" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
