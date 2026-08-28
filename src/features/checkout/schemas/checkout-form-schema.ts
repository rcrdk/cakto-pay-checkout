import { z } from 'zod'

import { MAX_INSTALLMENTS, MIN_INSTALLMENTS } from '../constants/fee-rates'
import { PAYMENT_METHODS } from '../constants/payment-methods'
import { isValidCpf } from '../utils/is-valid-cpf'
import { isValidEmail } from '../utils/is-valid-email'

export const checkoutFormSchema = z.object({
	email: z.string().trim().refine(isValidEmail, 'Informe um e-mail válido.'),
	cpf: z.string().refine(isValidCpf, 'Informe um CPF válido.'),
	method: z.enum(PAYMENT_METHODS),
	installments: z.number().int().min(MIN_INSTALLMENTS).max(MAX_INSTALLMENTS),
})

export type CheckoutFormSchema = z.infer<typeof checkoutFormSchema>

export const defaultCheckoutFormValues: CheckoutFormSchema = {
	email: '',
	cpf: '',
	method: 'pix',
	installments: MIN_INSTALLMENTS,
}
