import { calculateCheckoutAmounts } from '../calculate-checkout-amounts'
import { listCardInstallmentOptions } from '../list-card-installment-options'

const PRICE_CENTS = 29700
const CARD_INSTALLMENT_COUNTS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

describe('ListCardInstallmentOptions', () => {
	it('should return one option for every installment from 1x to 12x', () => {
		const options = listCardInstallmentOptions(PRICE_CENTS)
		const installmentCounts = options.map((option) => option.installments)

		expect(installmentCounts).toEqual(CARD_INSTALLMENT_COUNTS)
	})

	it('should attach card checkout amounts to each installment count', () => {
		const options = listCardInstallmentOptions(PRICE_CENTS)

		const expected = CARD_INSTALLMENT_COUNTS.map((installments) => {
			const amounts = calculateCheckoutAmounts({ priceCents: PRICE_CENTS, method: 'card', installments })
			return { installments, amounts }
		})

		expect(options).toEqual(expected)
	})
})
