import type { ComponentPropsWithoutRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/utils/tailwind-cn'

const buttonVariants = cva(
	'h-12 w-full rounded-2xl text-base font-semibold transition-[background-color,opacity,transform] duration-200 select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus-visible:outline-none enabled:active:scale-[0.98] disabled:opacity-60',
	{
		variants: {
			variant: {
				highlighted: 'bg-highlighted focus-visible:ring-highlighted/35 enabled:hover:bg-highlighted-dark text-white',
				muted: 'bg-muted focus-visible:ring-muted/35 enabled:hover:bg-foreground text-white',
			},
		},
		defaultVariants: {
			variant: 'highlighted',
		},
	},
)

interface ButtonProps extends ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonVariants> {
	loading?: boolean
}

export function Button({
	children,
	type = 'button',
	disabled = false,
	loading = false,
	variant = 'highlighted',
	className,
	...props
}: Readonly<ButtonProps>) {
	const isInactive = disabled || loading

	return (
		<button
			{...props}
			type={type}
			disabled={isInactive}
			aria-busy={loading}
			className={cn(
				buttonVariants({ variant }),
				loading ? 'cursor-wait disabled:cursor-wait' : 'cursor-pointer disabled:cursor-not-allowed',
				className,
			)}
		>
			{children}
		</button>
	)
}
