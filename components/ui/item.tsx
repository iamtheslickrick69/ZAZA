"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const itemVariants = cva(
  "flex w-full items-start gap-4 rounded-lg border transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground hover:bg-accent/50",
        outline: "border-2 border-primary",
        muted: "bg-muted/50 hover:bg-muted",
      },
      size: {
        default: "p-6",
        sm: "p-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center",
  {
    variants: {
      variant: {
        default: "rounded-lg bg-primary/10",
        icon: "h-10 w-10 rounded-lg bg-primary/10",
        image: "h-16 w-16 overflow-hidden rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface ItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemVariants> {
  asChild?: boolean
}

const Item = React.forwardRef<HTMLDivElement, ItemProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn(itemVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Item.displayName = "Item"

const ItemGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2", className)}
    {...props}
  />
))
ItemGroup.displayName = "ItemGroup"

const ItemSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentPropsWithoutRef<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn("my-2", className)}
    {...props}
  />
))
ItemSeparator.displayName = "ItemSeparator"

export interface ItemMediaProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof itemMediaVariants> {}

const ItemMedia = React.forwardRef<HTMLDivElement, ItemMediaProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
)
ItemMedia.displayName = "ItemMedia"

const ItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-1 flex-col gap-1.5", className)}
    {...props}
  />
))
ItemContent.displayName = "ItemContent"

const ItemTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
ItemTitle.displayName = "ItemTitle"

const ItemDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
ItemDescription.displayName = "ItemDescription"

const ItemActions = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
ItemActions.displayName = "ItemActions"

const ItemHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
))
ItemHeader.displayName = "ItemHeader"

const ItemFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 text-xs text-muted-foreground", className)}
    {...props}
  />
))
ItemFooter.displayName = "ItemFooter"

export {
  Item,
  ItemGroup,
  ItemSeparator,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemHeader,
  ItemFooter,
}
