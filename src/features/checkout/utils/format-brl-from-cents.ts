import { CENTS_PER_UNIT } from '../constants/fee-rates'

const BRL_FORMATTER = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const formatBrlFromCents = (cents: number) => {
	const amount = cents / CENTS_PER_UNIT
	const formatted = BRL_FORMATTER.format(amount)

	return formatted
}
