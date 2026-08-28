import { cn } from '@/shared/utils/tailwind-cn'

interface FieldLabelProps {
	children: string
	htmlFor?: string
	as?: 'label' | 'legend' | 'span'
	className?: string
}

const BASE_CLASSNAME = 'text-sm font-medium select-none'

export function FieldLabel({ children, htmlFor, as = 'label', className }: Readonly<FieldLabelProps>) {
	const labeled = `${children}:`

	if (as === 'legend') return <legend className={cn(BASE_CLASSNAME, className)}>{labeled}</legend>
	if (as === 'span') return <span className={cn(BASE_CLASSNAME, className)}>{labeled}</span>

	return (
		<label htmlFor={htmlFor} className={cn(BASE_CLASSNAME, className)}>
			{labeled}
		</label>
	)
}
