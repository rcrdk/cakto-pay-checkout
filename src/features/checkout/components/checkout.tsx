'use client'

import { useState } from 'react'

import { MIN_INSTALLMENTS } from '../constants/fee-rates'
import type { PaymentMethod } from '../constants/payment-methods'
import type { Product } from '../types/checkout'
import { CheckoutFormFields } from './checkout-form-fields'
import { CheckoutSubmit } from './checkout-submit'
import { CheckoutSummary } from './checkout-summary'
import { InstallmentSelect } from './installment-select'
import { PaymentMethodSelector } from './payment-method-selector'
import { ProductHeader } from './product-header'

const INITIAL_METHOD: PaymentMethod = 'card'
const INITIAL_INSTALLMENTS = 2

interface CheckoutProps {
	product: Product
}

export function Checkout({ product }: Readonly<CheckoutProps>) {
	const [method, setMethod] = useState<PaymentMethod>(INITIAL_METHOD)
	const [installments, setInstallments] = useState(INITIAL_INSTALLMENTS)

	const handleMethodChange = (nextMethod: PaymentMethod) => {
		setMethod(nextMethod)
		if (nextMethod === 'pix') setInstallments(MIN_INSTALLMENTS)
	}

	return (
		<main className="mx-auto flex w-full max-w-md flex-col px-4 py-8 lg:max-w-4xl">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 lg:gap-y-12">
				<ProductHeader product={product} />

				<div className="flex flex-col gap-6">
					<PaymentMethodSelector method={method} onMethodChange={handleMethodChange} />
					<InstallmentSelect
						priceCents={product.currentPriceCents}
						method={method}
						installments={installments}
						onInstallmentsChange={setInstallments}
					/>
					<CheckoutFormFields />
				</div>

				<div className="flex flex-col gap-6">
					<CheckoutSummary priceCents={product.currentPriceCents} method={method} installments={installments} />
					<CheckoutSubmit />
				</div>
			</div>
		</main>
	)
}
