import type { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/shared/utils/tailwind-cn'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	loading?: boolean
}

export function Button({
	children,
	type = 'button',
	disabled = false,
	loading = false,
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
				'bg-highlighted focus-visible:ring-highlighted/35 enabled:hover:bg-highlighted-dark h-12 w-full rounded-2xl text-base font-semibold text-white transition-[background-color,opacity,transform] duration-200 select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus-visible:outline-none enabled:active:scale-[0.98] disabled:opacity-60',
				loading ? 'cursor-wait disabled:cursor-wait' : 'cursor-pointer disabled:cursor-not-allowed',
				className,
			)}
		>
			{children}
		</button>
	)
}
