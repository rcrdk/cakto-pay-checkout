import { zodResolver } from '@hookform/resolvers/zod'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'

import {
	checkoutFormSchema,
	defaultCheckoutFormValues,
	type CheckoutFormSchema,
} from '@/features/checkout/schemas/checkout-form-schema'
import { CheckoutFormFields } from '../checkout-form-fields'

function CheckoutFormFieldsHarness() {
	const form = useForm<CheckoutFormSchema>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: defaultCheckoutFormValues,
		mode: 'onTouched',
	})

	return (
		<FormProvider {...form}>
			<form>
				<CheckoutFormFields />
			</form>
		</FormProvider>
	)
}

describe('CheckoutFormFields component', () => {
	it('should mask the CPF as digits are typed', async () => {
		const user = userEvent.setup()
		render(<CheckoutFormFieldsHarness />)

		await user.type(screen.getByRole('textbox', { name: 'CPF:' }), '52998224725')

		expect(screen.getByRole('textbox', { name: 'CPF:' })).toHaveValue('529.982.247-25')
	})

	it('should announce an invalid email after the field is touched', async () => {
		const user = userEvent.setup()
		render(<CheckoutFormFieldsHarness />)

		await user.type(screen.getByRole('textbox', { name: 'E-mail:' }), 'a')
		await user.tab()

		expect(screen.getByRole('alert')).toHaveTextContent('Informe um e-mail válido.')
	})
})
