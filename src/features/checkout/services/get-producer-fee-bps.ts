import {
	CARD_CASH_FEE_BPS,
	CARD_INSTALLMENT_BASE_FEE_BPS,
	EXTRA_INSTALLMENT_FEE_BPS,
	PIX_FEE_BPS,
} from '../constants/fee-rates'
import type { PaymentMethod } from '../types/checkout'

type GetProducerFeeBpsParams = {
	method: PaymentMethod
	installments: number
}

export const getProducerFeeBps = ({ method, installments }: GetProducerFeeBpsParams) => {
	if (method === 'pix') return PIX_FEE_BPS
	if (installments === 1) return CARD_CASH_FEE_BPS

	const extraInstallments = installments - 1
	const extraBps = extraInstallments * EXTRA_INSTALLMENT_FEE_BPS
	const feeBps = CARD_INSTALLMENT_BASE_FEE_BPS + extraBps

	return feeBps
}
