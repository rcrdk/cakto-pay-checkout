import { useFormContext, useWatch } from 'react-hook-form'

import { CreditCardIcon } from '@/shared/components/icons/credit-card-icon'
import { PixIcon } from '@/shared/components/icons/pix-icon'
import { FieldLabel } from '@/shared/components/ui/field-label'
import { MIN_INSTALLMENTS } from '../constants/fee-rates'
import type { PaymentMethod } from '../constants/payment-methods'
import type { CheckoutFormSchema } from '../schemas/checkout-form-schema'
import { PaymentMethodOption } from './payment-method-option'

export function PaymentMethodSelector() {
	const { control, setValue } = useFormContext<CheckoutFormSchema>()
	const method = useWatch({ control, name: 'method' })
	const isPixSelected = method === 'pix'
	const isCardSelected = method === 'card'

	const handleMethodChange = (nextMethod: PaymentMethod) => {
		setValue('method', nextMethod, { shouldDirty: true })
		if (nextMethod === 'pix') setValue('installments', MIN_INSTALLMENTS)
	}

	return (
		<fieldset className="flex flex-col gap-2 border-0 p-0">
			<FieldLabel as="legend" className="mb-1">
				Forma de pagamento
			</FieldLabel>

			<div className="grid gap-2">
				<PaymentMethodOption
					title="PIX"
					description="Aprovação imediata e taxa zero para o produtor."
					Icon={PixIcon}
					selected={isPixSelected}
					onClick={() => handleMethodChange('pix')}
					variant="highlighted"
					badge="Recomendado"
				/>

				<PaymentMethodOption
					title="Cartão de crédito"
					description="Parcele em até 12x. O total do comprador continua o mesmo."
					Icon={CreditCardIcon}
					selected={isCardSelected}
					onClick={() => handleMethodChange('card')}
				/>
			</div>
		</fieldset>
	)
}
