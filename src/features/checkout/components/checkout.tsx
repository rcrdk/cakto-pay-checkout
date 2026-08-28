'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

import { checkoutFormSchema, defaultCheckoutFormValues, type CheckoutFormSchema } from '../schemas/checkout-form-schema'
import type { Product } from '../types/checkout'
import { getFirstInvalidFieldId } from '../utils/get-first-invalid-field-id'
import { revealInvalidField } from '../utils/reveal-invalid-field'
import { CheckoutFormFields } from './checkout-form-fields'
import { CheckoutSubmit } from './checkout-submit'
import { CheckoutSuccess } from './checkout-success'
import { CheckoutSummary } from './checkout-summary'
import { InstallmentSelect } from './installment-select'
import { PaymentMethodSelector } from './payment-method-selector'
import { ProductHeader } from './product-header'

interface CheckoutProps {
	product: Product
}

const SUBMIT_DELAY_MS = 1200

export function Checkout({ product }: Readonly<CheckoutProps>) {
	const [isSuccess, setIsSuccess] = useState(false)

	const submitTimeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined)

	const form = useForm<CheckoutFormSchema>({
		resolver: zodResolver(checkoutFormSchema),
		mode: 'onTouched',
		reValidateMode: 'onChange',
		defaultValues: defaultCheckoutFormValues,
	})

	const handleCheckoutSubmit = (event: FormEvent<HTMLFormElement>) => {
		void form.handleSubmit(
			async () => {
				await new Promise<void>((resolve) => {
					clearTimeout(submitTimeoutRef.current)
					submitTimeoutRef.current = setTimeout(() => {
						setIsSuccess(true)
						resolve()
					}, SUBMIT_DELAY_MS)
				})
			},
			(submitErrors) => {
				const fieldId = getFirstInvalidFieldId(submitErrors)
				if (!fieldId) return

				requestAnimationFrame(() => revealInvalidField(fieldId))
			},
		)(event)
	}

	useEffect(() => () => clearTimeout(submitTimeoutRef.current), [])

	if (isSuccess)
		return (
			<main className="mx-auto flex w-full max-w-md flex-col px-4 py-8">
				<CheckoutSuccess product={product} />
			</main>
		)

	return (
		<main className="mx-auto flex w-full max-w-md flex-col px-4 py-8 lg:max-w-4xl">
			<FormProvider {...form}>
				<form
					className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 lg:gap-y-12"
					noValidate
					onSubmit={handleCheckoutSubmit}
				>
					<ProductHeader product={product} />

					<div className="flex flex-col gap-6">
						<PaymentMethodSelector />
						<InstallmentSelect priceCents={product.currentPriceCents} />
						<CheckoutFormFields />
					</div>

					<div className="flex flex-col gap-6">
						<CheckoutSummary priceCents={product.currentPriceCents} />
						<CheckoutSubmit />
					</div>
				</form>
			</FormProvider>
		</main>
	)
}
