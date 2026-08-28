import type { PaymentMethod } from '../constants/payment-methods'
import { calculateCheckoutAmounts } from '../services/calculate-checkout-amounts'
import { formatBrlFromCents } from '../utils/format-brl-from-cents'
import { PixSavingsBanner } from './pix-savings-banner'
import { SummaryRow } from './summary-row'

interface CheckoutSummaryProps {
	priceCents: number
	method: PaymentMethod
	installments: number
}

export function CheckoutSummary({ priceCents, method, installments }: Readonly<CheckoutSummaryProps>) {
	const amounts = calculateCheckoutAmounts({
		priceCents,
		method,
		installments,
	})

	const productValue = formatBrlFromCents(amounts.buyerTotalCents)
	const buyerTotal = formatBrlFromCents(amounts.buyerTotalCents)
	const platformFee = formatBrlFromCents(amounts.platformFeeCents)
	const producerNet = formatBrlFromCents(amounts.producerNetCents)
	const pixSavings = formatBrlFromCents(amounts.pixSavingsCents)
	const installmentAmount = formatBrlFromCents(amounts.installmentAmountCents)

	const installmentValue = `${amounts.installmentCount}x de ${installmentAmount}`

	const isCard = method === 'card'

	const showPixSavings = isCard && amounts.pixSavingsCents > 0
	const showInstallments = isCard && amounts.installmentCount > 1

	return (
		<section aria-live="polite" className="border-line bg-surface flex flex-col gap-3 rounded-2xl border p-4">
			<h2 className="text-sm font-semibold select-none">Resumo do pedido:</h2>

			<SummaryRow label="Valor do produto" value={productValue} />
			<SummaryRow label="Total do comprador" value={buyerTotal} />
			<SummaryRow label="Parcelas" value={installmentValue} show={showInstallments} />
			<SummaryRow label="Taxa Cakto (produtor)" value={platformFee} />
			<SummaryRow label="Líquido do produtor" value={producerNet} emphasize />

			<PixSavingsBanner savings={pixSavings} show={showPixSavings} />
		</section>
	)
}
