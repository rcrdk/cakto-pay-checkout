const NON_DIGIT_PATTERN = /\D/g

export const digitsOnly = (value: string) => {
	const digits = value.replace(NON_DIGIT_PATTERN, '')

	return digits
}
