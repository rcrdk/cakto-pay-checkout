import { mapProductMockToProduct } from '../map-product-mock'

const productMock = {
	id: 1,
	name: 'Curso',
	originalPrice: 10.99,
	currentPrice: 0.1,
	producer: 'João Silva',
	format: 'digital',
	deliveryTime: 'imediato',
}

describe('MapProductMockToProduct', () => {
	it('should convert reais prices to cents and keep the other fields', () => {
		const product = mapProductMockToProduct(productMock)

		expect(product).toEqual({
			id: 1,
			name: 'Curso',
			originalPriceCents: 1099,
			currentPriceCents: 10,
			producer: 'João Silva',
			format: 'digital',
			deliveryTime: 'imediato',
		})
	})
})
