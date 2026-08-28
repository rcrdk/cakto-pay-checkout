import { MAX_INSTALLMENTS, MIN_INSTALLMENTS } from '../constants/fee-rates'
import { calculateCheckoutAmounts } from './calculate-checkout-amounts'

const installmentCounts = Array.from(
	{ length: MAX_INSTALLMENTS - MIN_INSTALLMENTS + 1 },
	(_, index) => index + MIN_INSTALLMENTS,
)

export const listCardInstallmentOptions = (priceCents: number) => {
	const options = installmentCounts.map((installments) => {
		const amounts = calculateCheckoutAmounts({ priceCents, method: 'card', installments })

		return { installments, amounts }
	})

	return options
}
