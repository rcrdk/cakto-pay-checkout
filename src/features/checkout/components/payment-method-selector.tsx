import { CreditCardIcon } from '@/shared/components/icons/credit-card-icon'
import { PixIcon } from '@/shared/components/icons/pix-icon'
import { FieldLabel } from '@/shared/components/ui/field-label'
import type { PaymentMethod } from '../constants/payment-methods'
import { PaymentMethodOption } from './payment-method-option'

interface PaymentMethodSelectorProps {
	method: PaymentMethod
	onMethodChange: (method: PaymentMethod) => void
}

export function PaymentMethodSelector({ method, onMethodChange }: Readonly<PaymentMethodSelectorProps>) {
	const isPixSelected = method === 'pix'
	const isCardSelected = method === 'card'

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
					onClick={() => onMethodChange('pix')}
					variant="highlighted"
					badge="Recomendado"
				/>

				<PaymentMethodOption
					title="Cartão de crédito"
					description="Parcele em até 12x. O total do comprador continua o mesmo."
					Icon={CreditCardIcon}
					selected={isCardSelected}
					onClick={() => onMethodChange('card')}
				/>
			</div>
		</fieldset>
	)
}
