import { type ComponentPropsWithoutRef, type ElementType } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/shared/utils/tailwind-cn'

const buttonVariants = cva(
	'inline-flex h-12 w-full items-center justify-center rounded-2xl text-base font-semibold no-underline transition-[background-color,opacity,transform] duration-200 select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60',
	{
		variants: {
			variant: {
				highlighted: 'bg-highlighted hover:bg-highlighted-dark focus-visible:ring-highlighted/35 text-white',
				muted: 'bg-muted hover:bg-foreground focus-visible:ring-muted/35 text-white',
			},
		},
		defaultVariants: {
			variant: 'highlighted',
		},
	},
)

type ButtonOwnProps = { loading?: boolean } & VariantProps<typeof buttonVariants>

type ButtonProps<T extends ElementType = 'button'> = { as?: T } & ButtonOwnProps &
	Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps | 'as'>

export function Button<T extends ElementType = 'button'>({
	as,
	children,
	className,
	disabled,
	loading = false,
	type,
	variant = 'highlighted',
	...props
}: ButtonProps<T>) {
	const Component = (as ?? 'button') as ElementType
	const isNativeButton = Component === 'button'
	const isInactive = Boolean(disabled) || loading

	const classNames = cn(
		buttonVariants({ variant }),
		loading ? 'cursor-wait' : 'cursor-pointer',
		isInactive && !loading && 'cursor-not-allowed',
		className,
	)

	if (!isNativeButton)
		return (
			<Component
				{...props}
				className={classNames}
				aria-busy={loading || undefined}
				aria-disabled={isInactive || undefined}
			>
				{children}
			</Component>
		)

	return (
		<button
			{...props}
			type={type ?? 'button'}
			disabled={isInactive}
			aria-busy={loading || undefined}
			className={classNames}
		>
			{children}
		</button>
	)
}
