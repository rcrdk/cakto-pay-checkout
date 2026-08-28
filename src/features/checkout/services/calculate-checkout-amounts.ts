import { BASIS_POINTS_DIVISOR, PIX_FEE_BPS } from '../constants/fee-rates'
import type { CheckoutAmounts, PaymentMethod } from '../types/checkout'
import { getProducerFeeBps } from './get-producer-fee-bps'

type CalculateCheckoutAmountsParams = {
	priceCents: number
	method: PaymentMethod
	installments: number
}

const toFeeCents = (priceCents: number, feeBps: number) => {
	const feeCents = Math.round((priceCents * feeBps) / BASIS_POINTS_DIVISOR)

	return feeCents
}

export const calculateCheckoutAmounts = ({
	priceCents,
	method,
	installments,
}: CalculateCheckoutAmountsParams): CheckoutAmounts => {
	const isPix = method === 'pix'
	const installmentCount = isPix ? 1 : installments

	const feeBps = getProducerFeeBps({ method, installments: installmentCount })
	const platformFeeCents = toFeeCents(priceCents, feeBps)
	const pixFeeCents = toFeeCents(priceCents, PIX_FEE_BPS)
	const pixSavingsCents = platformFeeCents - pixFeeCents
	const producerNetCents = priceCents - platformFeeCents
	const installmentAmountCents = Math.floor(priceCents / installmentCount)

	return {
		buyerTotalCents: priceCents,
		platformFeeCents,
		producerNetCents,
		pixSavingsCents,
		installmentCount,
		installmentAmountCents,
	}
}
