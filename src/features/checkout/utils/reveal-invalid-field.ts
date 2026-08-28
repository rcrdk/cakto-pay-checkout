const shouldFocusInvalidField = () => {
	if (typeof window === 'undefined') return false

	const canHoverWithoutTouch = window.matchMedia('(hover: hover) and (pointer: fine)').matches
	return canHoverWithoutTouch
}

export const revealInvalidField = (fieldId: string) => {
	if (typeof document === 'undefined') return

	const field = document.getElementById(fieldId)
	if (!field) return

	field.scrollIntoView({ behavior: 'smooth', block: 'center' })
	if (!shouldFocusInvalidField()) return

	field.focus({ preventScroll: true })
}
