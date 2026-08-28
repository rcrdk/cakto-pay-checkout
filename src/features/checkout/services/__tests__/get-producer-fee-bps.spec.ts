import { CARD_CASH_FEE_BPS, PIX_FEE_BPS } from '@/features/checkout/constants/fee-rates'
import { getProducerFeeBps } from '../get-producer-fee-bps'

describe('GetProducerFeeBps', () => {
	it('should return the "PIX" fee for "PIX" payments', () => {
		const feeBps = getProducerFeeBps({ method: 'pix', installments: 1 })
		expect(feeBps).toBe(PIX_FEE_BPS)
	})

	it('should ignore installment count for "PIX" payments', () => {
		const oneX = getProducerFeeBps({ method: 'pix', installments: 1 })
		const twelveX = getProducerFeeBps({ method: 'pix', installments: 12 })

		expect(oneX).toBe(PIX_FEE_BPS)
		expect(twelveX).toBe(PIX_FEE_BPS)
	})

	it('should return the cash card fee for 1x', () => {
		const feeBps = getProducerFeeBps({ method: 'card', installments: 1 })
		expect(feeBps).toBe(CARD_CASH_FEE_BPS)
	})

	it.each([
		{ installments: 2, feeBps: 699 },
		{ installments: 3, feeBps: 899 },
		{ installments: 12, feeBps: 2699 },
	])('should add extra installment fees for card $installments x', ({ installments, feeBps }) => {
		const producerFeeBps = getProducerFeeBps({ method: 'card', installments })
		expect(producerFeeBps).toBe(feeBps)
	})
})
