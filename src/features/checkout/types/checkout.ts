export type PaymentMethod = 'pix' | 'card'

export type ProductMock = {
	id: number
	name: string
	originalPrice: number
	currentPrice: number
	producer: string
	format: string
	deliveryTime: string
}

export type Product = {
	id: number
	name: string
	originalPriceCents: number
	currentPriceCents: number
	producer: string
	format: string
	deliveryTime: string
}
