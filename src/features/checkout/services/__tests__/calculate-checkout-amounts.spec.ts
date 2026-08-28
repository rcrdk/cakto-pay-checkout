import { calculateCheckoutAmounts } from '../calculate-checkout-amounts'

const PRICE_CENTS = 29700

describe('CalculateCheckoutAmounts', () => {
	it('should keep the buyer total equal to the product price for every method', () => {
		const pixAmounts = calculateCheckoutAmounts({ priceCents: PRICE_CENTS, method: 'pix', installments: 1 })
		const cardAmounts = calculateCheckoutAmounts({ priceCents: PRICE_CENTS, method: 'card', installments: 12 })

		expect(pixAmounts.buyerTotalCents).toBe(PRICE_CENTS)
		expect(cardAmounts.buyerTotalCents).toBe(PRICE_CENTS)
	})

	it('should charge no platform fee on "PIX"', () => {
		const amounts = calculateCheckoutAmounts({ priceCents: PRICE_CENTS, method: 'pix', installments: 1 })

		expect(amounts.platformFeeCents).toBe(0)
		expect(amounts.producerNetCents).toBe(PRICE_CENTS)
		expect(amounts.pixSavingsCents).toBe(0)
	})

	it.each([
		[1185, 1],
		[2076, 2],
		[2670, 3],
		[8016, 12],
	])('should apply producer fee of %i cents for card %ix', (feeCents, installments) => {
		const amounts = calculateCheckoutAmounts({ priceCents: PRICE_CENTS, method: 'card', installments })
		const expectedNet = PRICE_CENTS - feeCents

		expect(amounts.platformFeeCents).toBe(feeCents)
		expect(amounts.producerNetCents).toBe(expectedNet)
		expect(amounts.pixSavingsCents).toBe(feeCents)
		expect(amounts.buyerTotalCents).toBe(PRICE_CENTS)
	})
})
