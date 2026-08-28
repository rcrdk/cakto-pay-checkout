import type { ComponentPropsWithoutRef } from 'react'

import { ChevronDownIcon } from '@/shared/components/icons/chevron-down-icon'
import { FieldError } from '@/shared/components/ui/field-error'
import { FieldLabel } from '@/shared/components/ui/field-label'
import { cn } from '@/shared/utils/tailwind-cn'

interface SelectFieldProps extends Omit<ComponentPropsWithoutRef<'select'>, 'id' | 'onChange'> {
	id: string
	label: string
	error?: string | null
	onChange: (value: string) => void
}

export function SelectField({ id, label, error, onChange, className, children, ...props }: Readonly<SelectFieldProps>) {
	const errorId = `${id}-error`
	const hasError = Boolean(error)

	return (
		<div className="flex flex-col gap-1.5">
			<FieldLabel htmlFor={id}>{label}</FieldLabel>

			<div className="relative">
				<select
					{...props}
					id={id}
					name={id}
					onChange={(event) => onChange(event.target.value)}
					aria-invalid={hasError}
					aria-describedby={hasError ? errorId : undefined}
					className={cn(
						'border-line bg-surface focus:border-foreground focus:ring-foreground/20 h-12 w-full appearance-none rounded-xl border py-0 pr-10 pl-3.5 text-base transition-all outline-none focus:shadow-sm focus:ring-2',
						className,
					)}
				>
					{children}
				</select>

				<ChevronDownIcon
					className="text-muted pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2"
					aria-hidden
				/>
			</div>

			<FieldError id={errorId} message={error} />
		</div>
	)
}
