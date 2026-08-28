import { Controller, useFormContext } from 'react-hook-form'

import { TextField } from '@/shared/components/ui/text-field'
import type { CheckoutFormSchema } from '../schemas/checkout-form-schema'
import { maskCpf } from '../utils/mask-cpf'

export function CheckoutFormFields() {
	const { control, formState } = useFormContext<CheckoutFormSchema>()

	const emailError = formState.errors.email?.message ?? null
	const cpfError = formState.errors.cpf?.message ?? null

	return (
		<div className="flex flex-col gap-4">
			<Controller
				name="email"
				control={control}
				render={({ field }) => (
					<TextField
						id="email"
						label="E-mail"
						type="email"
						inputMode="email"
						autoComplete="email"
						placeholder="voce@email.com"
						value={field.value}
						error={emailError}
						onChange={field.onChange}
						onBlur={field.onBlur}
					/>
				)}
			/>

			<Controller
				name="cpf"
				control={control}
				render={({ field }) => (
					<TextField
						id="cpf"
						label="CPF"
						inputMode="numeric"
						autoComplete="off"
						placeholder="000.000.000-00"
						value={field.value}
						error={cpfError}
						onChange={(value) => field.onChange(maskCpf(value))}
						onBlur={field.onBlur}
					/>
				)}
			/>
		</div>
	)
}
