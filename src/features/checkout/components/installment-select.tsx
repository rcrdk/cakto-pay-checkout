import { SelectField } from '@/shared/components/ui/select-field'
import type { PaymentMethod } from '../constants/payment-methods'
import { listCardInstallmentOptions } from '../services/list-card-installment-options'
import type { CheckoutAmounts } from '../types/checkout'
import { formatBrlFromCents } from '../utils/format-brl-from-cents'

interface InstallmentSelectProps {
	priceCents: number
	method: PaymentMethod
	installments: number
	onInstallmentsChange: (installments: number) => void
}

interface InstallmentOptionProps {
	installments: number
	amounts: CheckoutAmounts
}

function InstallmentOption({ installments, amounts }: Readonly<InstallmentOptionProps>) {
	const amount = formatBrlFromCents(amounts.installmentAmountCents)
	const label = `${installments}x de ${amount}`

	return <option value={installments}>{label}</option>
}

export function InstallmentSelect({
	priceCents,
	method,
	installments,
	onInstallmentsChange,
}: Readonly<InstallmentSelectProps>) {
	const options = listCardInstallmentOptions(priceCents)
	const isCard = method === 'card'

	const handleInstallmentsChange = (value: string) => {
		const nextInstallments = Number(value)
		onInstallmentsChange(nextInstallments)
	}

	if (!isCard) return null

	return (
		<SelectField id="installments" label="Parcelas" value={installments} onChange={handleInstallmentsChange}>
			{options.map((option) => (
				<InstallmentOption key={option.installments} {...option} />
			))}
		</SelectField>
	)
}
