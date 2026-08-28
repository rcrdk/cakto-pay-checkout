import { type FC, type SVGProps } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { Badge } from '@/shared/components/ui/badge'
import { cn } from '@/shared/utils/tailwind-cn'

const paymentMethodOptionVariants = cva(
	'flex cursor-pointer items-start rounded-2xl border px-4 py-3.5 text-left transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-white active:scale-[0.98]',
	{
		variants: {
			variant: {
				default: '',
				highlighted: 'justify-between',
			},
			selected: {
				true: 'ring-2',
				false: 'border-line bg-surface',
			},
		},
		compoundVariants: [
			{
				variant: 'highlighted',
				selected: true,
				class: 'border-highlighted bg-highlighted/8 ring-highlighted/20 focus-visible:ring-highlighted',
			},
			{
				variant: 'highlighted',
				selected: false,
				class: 'hover:border-highlighted focus-visible:border-highlighted focus-visible:ring-highlighted/35',
			},
			{
				variant: 'default',
				selected: true,
				class: 'border-foreground bg-foreground/6 ring-foreground/20 focus-visible:ring-foreground',
			},
			{
				variant: 'default',
				selected: false,
				class: 'hover:border-foreground/30 focus-visible:ring-foreground/30',
			},
		],
		defaultVariants: {
			variant: 'default',
			selected: false,
		},
	},
)

interface PaymentMethodOptionProps extends VariantProps<typeof paymentMethodOptionVariants> {
	title: string
	description: string
	Icon: FC<SVGProps<SVGSVGElement>>
	badge?: string
	onClick: VoidFunction
}

export function PaymentMethodOption({
	variant = 'default',
	selected = false,
	title,
	description,
	Icon,
	badge,
	onClick,
}: Readonly<PaymentMethodOptionProps>) {
	const isSelected = Boolean(selected)
	const hasHighlightedText = variant === 'highlighted' && isSelected
	const accentClassName = hasHighlightedText && 'text-highlighted'

	return (
		<button
			type="button"
			aria-pressed={isSelected}
			onClick={onClick}
			className={paymentMethodOptionVariants({ variant, selected })}
		>
			<span className="flex min-w-0 gap-2.5">
				<Icon className={cn('mt-0.5', accentClassName)} aria-hidden />

				<span className="flex flex-col gap-0.5">
					<span className={cn('font-semibold', accentClassName)}>{title}</span>
					<span className="text-muted text-sm text-balance">{description}</span>
				</span>
			</span>

			<Badge>{badge}</Badge>
		</button>
	)
}
