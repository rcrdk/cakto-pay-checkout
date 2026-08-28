import { render, screen } from '@testing-library/react'

import { getCheckoutProduct } from '@/features/checkout/services/get-checkout-product'
import { ProductHeader } from '../product-header'

const defaultProps = {
	product: getCheckoutProduct(),
}

describe('ProductHeader component', () => {
	it('should render the product name, producer and prices', () => {
		render(<ProductHeader {...defaultProps} />)

		const { name, producer } = defaultProps.product

		expect(screen.getByRole('heading', { name, level: 1 })).toBeInTheDocument()
		expect(screen.getByText(new RegExp(producer))).toBeInTheDocument()
		expect(screen.getByText(/497,00/)).toBeInTheDocument()
		expect(screen.getByText(/297,00/)).toBeInTheDocument()
	})
})
