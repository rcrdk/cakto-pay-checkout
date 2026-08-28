const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const isValidEmail = (email: string) => {
	const trimmed = email.trim()
	const isValid = EMAIL_PATTERN.test(trimmed)

	return isValid
}
