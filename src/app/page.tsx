import { Checkout } from '@/features/checkout/components/checkout'
import { getCheckoutProduct } from '@/features/checkout/services/get-checkout-product'

export default function Home() {
	const product = getCheckoutProduct()

	return <Checkout product={product} />
}
