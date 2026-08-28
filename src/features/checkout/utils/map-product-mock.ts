import type { Product, ProductMock } from '../types/checkout'
import { toCents } from './to-cents'

export const mapProductMockToProduct = ({ originalPrice, currentPrice, ...rest }: ProductMock): Product => ({
	...rest,
	originalPriceCents: toCents(originalPrice),
	currentPriceCents: toCents(currentPrice),
})
