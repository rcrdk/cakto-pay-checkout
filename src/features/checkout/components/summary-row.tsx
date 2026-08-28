import { FieldLabel } from '@/shared/components/ui/field-label'

interface SummaryRowProps {
	label: string
	value: string
	emphasize?: boolean
	show?: boolean
}

export function SummaryRow({ label, value, emphasize, show = true }: Readonly<SummaryRowProps>) {
	if (!show) return null

	const accentClassName = emphasize ? 'font-semibold' : 'font-medium'

	return (
		<div className="flex items-baseline justify-between gap-3 text-sm">
			<FieldLabel as="span" className="text-muted font-normal">
				{label}
			</FieldLabel>

			<span className={accentClassName}>{value}</span>
		</div>
	)
}
