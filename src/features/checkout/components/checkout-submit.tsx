import { useFormContext } from 'react-hook-form'

import { Button } from '@/shared/components/ui/button'
import type { CheckoutFormSchema } from '../schemas/checkout-form-schema'

export function CheckoutSubmit() {
	const {
		formState: { isSubmitting },
	} = useFormContext<CheckoutFormSchema>()

	const label = isSubmitting ? 'Finalizando compra...' : 'Finalizar compra'

	return (
		<Button type="submit" loading={isSubmitting}>
			{label}
		</Button>
	)
}
