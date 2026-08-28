import type { ComponentPropsWithoutRef } from 'react'

import { FieldError } from '@/shared/components/ui/field-error'
import { FieldLabel } from '@/shared/components/ui/field-label'
import { cn } from '@/shared/utils/tailwind-cn'

interface TextFieldProps extends Omit<ComponentPropsWithoutRef<'input'>, 'id' | 'onChange'> {
	id: string
	label: string
	error?: string | null
	onChange: (value: string) => void
}

export function TextField({
	id,
	label,
	error,
	onChange,
	type = 'text',
	inputMode = 'text',
	className,
	...props
}: Readonly<TextFieldProps>) {
	const errorId = `${id}-error`
	const hasError = Boolean(error)

	return (
		<div className="flex flex-col gap-1.5">
			<FieldLabel htmlFor={id}>{label}</FieldLabel>

			<input
				{...props}
				id={id}
				name={id}
				type={type}
				inputMode={inputMode}
				onChange={(event) => onChange(event.target.value)}
				aria-invalid={hasError}
				aria-describedby={hasError ? errorId : undefined}
				className={cn(
					'border-line bg-surface text-foreground placeholder:text-muted/40 focus:border-foreground focus:ring-foreground/20 h-12 rounded-xl border px-3.5 text-base transition-all outline-none placeholder:text-sm placeholder:italic focus:shadow-sm focus:ring-2',
					className,
				)}
			/>

			<FieldError id={errorId} message={error} />
		</div>
	)
}
