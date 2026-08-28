export const PAYMENT_METHODS = ['pix', 'card'] as const

export type PaymentMethod = (typeof PAYMENT_METHODS)[number]
