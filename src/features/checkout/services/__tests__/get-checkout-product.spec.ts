import { getCheckoutProduct } from '../get-checkout-product'

describe('GetCheckoutProduct', () => {
	it('should return the catalog product with prices in cents', () => {
		const product = getCheckoutProduct()

		expect(product).toEqual({
			id: 1,
			name: 'Curso de Marketing Digital 2025',
			originalPriceCents: 49700,
			currentPriceCents: 29700,
			producer: 'João Silva',
			format: 'digital',
			deliveryTime: 'imediato',
		})
	})
})
