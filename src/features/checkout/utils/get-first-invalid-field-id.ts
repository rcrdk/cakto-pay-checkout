export const CHECKOUT_FIELD_IDS = ['email', 'cpf'] as const

export type CheckoutFieldId = (typeof CHECKOUT_FIELD_IDS)[number]

export const getFirstInvalidFieldId = (errors: Partial<Record<CheckoutFieldId, unknown>>) => {
	const fieldId = CHECKOUT_FIELD_IDS.find((name) => Boolean(errors[name]))

	return fieldId
}
