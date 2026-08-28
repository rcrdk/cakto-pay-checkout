interface FieldErrorProps {
	id: string
	message?: string | null
}

export function FieldError({ id, message }: Readonly<FieldErrorProps>) {
	if (!message) return null

	return (
		<p id={id} role="alert" className="text-sm text-red-600 select-none">
			{message}
		</p>
	)
}
