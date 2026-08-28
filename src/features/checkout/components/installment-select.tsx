import { useFormContext, useWatch } from 'react-hook-form'

import { SelectField } from '@/shared/components/ui/select-field'
import type { CheckoutFormSchema } from '../schemas/checkout-form-schema'
import { listCardInstallmentOptions } from '../services/list-card-installment-options'
import type { CheckoutAmounts } from '../types/checkout'
import { formatBrlFromCents } from '../utils/format-brl-from-cents'

interface InstallmentSelectProps {
	priceCents: number
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

export function InstallmentSelect({ priceCents }: Readonly<InstallmentSelectProps>) {
	const { control, setValue } = useFormContext<CheckoutFormSchema>()

	const method = useWatch({ control, name: 'method' })
	const installments = useWatch({ control, name: 'installments' })

	const options = listCardInstallmentOptions(priceCents)
	const isCard = method === 'card'

	const handleInstallmentsChange = (value: string) => {
		setValue('installments', Number(value), { shouldDirty: true })
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
