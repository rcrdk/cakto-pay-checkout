import { PRODUCT_MOCK } from '../constants/product-mock'
import { mapProductMockToProduct } from '../utils/map-product-mock'

export const getCheckoutProduct = () => {
	const product = mapProductMockToProduct(PRODUCT_MOCK)
	return product
}
