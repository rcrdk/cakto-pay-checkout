import { CENTS_PER_UNIT } from '../constants/fee-rates'

export const toCents = (value: number) => {
	const amount = value * CENTS_PER_UNIT
	const cents = Math.round(amount)

	return cents
}
