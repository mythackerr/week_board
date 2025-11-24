import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

export function Showcase({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full h-screen flex items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}
