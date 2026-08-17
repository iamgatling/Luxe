"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface ImageWithSkeletonProps extends ImageProps {
  containerClassName?: string
}

export function ImageWithSkeleton({
  className,
  containerClassName,
  alt,
  onLoad,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className={cn("relative overflow-hidden bg-muted", containerClassName)}>
      {!isLoaded && <Skeleton className="absolute inset-0 z-10 size-full rounded-none" />}
      <Image
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={(e) => {
          setIsLoaded(true)
          if (onLoad) onLoad(e)
        }}
        {...props}
      />
    </div>
  )
}
