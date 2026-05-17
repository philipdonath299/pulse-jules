import { cn } from "@/lib/utils"

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-ios-secondary-bg dark:bg-white/10", className)}
      {...props}
    />
  )
}
