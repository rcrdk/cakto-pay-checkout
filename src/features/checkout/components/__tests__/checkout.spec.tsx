import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { getCheckoutProduct } from '@/features/checkout/services/get-checkout-product'
import { Checkout } from '../checkout'

const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
	useRouter: () => ({
		push: mockPush,
	}),
}))

const defaultProps = {
	product: getCheckoutProduct(),
}

const VALID_EMAIL = 'eu@eu.com'
const VALID_CPF_DIGITS = '52998224725'

describe('Checkout component', () => {
	beforeEach(() => {
		mockPush.mockReset()
		window.matchMedia = jest.fn().mockReturnValue({ matches: false })
		Element.prototype.scrollIntoView = jest.fn()
	})

	it('should start on "PIX" without installments or "PIX" savings', () => {
		render(<Checkout {...defaultProps} />)

		expect(screen.getByRole('heading', { name: defaultProps.product.name, level: 1 })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /PIX/ })).toHaveAttribute('aria-pressed', 'true')
		expect(screen.queryByRole('combobox', { name: 'Parcelas:' })).not.toBeInTheDocument()
		expect(screen.queryByText(/No PIX o produtor economiza/)).not.toBeInTheDocument()
		expect(screen.getByText(/0,00/)).toBeInTheDocument()
	})

	it('should show installments and "PIX" savings when card is selected', async () => {
		const user = userEvent.setup()
		render(<Checkout {...defaultProps} />)

		await user.click(screen.getByRole('button', { name: /Cartão de crédito/ }))

		expect(screen.getByRole('combobox', { name: 'Parcelas:' })).toBeInTheDocument()
		expect(screen.getByText(/No PIX o produtor economiza/)).toBeInTheDocument()
	})

	it('should update the producer fee when card installments change', async () => {
		const user = userEvent.setup()
		render(<Checkout {...defaultProps} />)

		await user.click(screen.getByRole('button', { name: /Cartão de crédito/ }))
		await user.selectOptions(screen.getByRole('combobox', { name: 'Parcelas:' }), '2')

		expect(screen.getByRole('combobox', { name: 'Parcelas:' })).toHaveValue('2')
		expect(screen.getAllByText(/20,76/).length).toBeGreaterThan(0)
	})

	it('should reset installments to 1x after switching to "PIX" and back to card', async () => {
		const user = userEvent.setup()
		render(<Checkout {...defaultProps} />)

		await user.click(screen.getByRole('button', { name: /Cartão de crédito/ }))
		await user.selectOptions(screen.getByRole('combobox', { name: 'Parcelas:' }), '2')
		await user.click(screen.getByRole('button', { name: /PIX/ }))
		await user.click(screen.getByRole('button', { name: /Cartão de crédito/ }))

		expect(screen.getByRole('combobox', { name: 'Parcelas:' })).toHaveValue('1')
	})

	it('should announce field errors when submitted empty', async () => {
		const user = userEvent.setup()
		render(<Checkout {...defaultProps} />)

		await user.click(screen.getByRole('button', { name: 'Finalizar compra' }))

		expect(screen.getByText('Informe um e-mail válido.')).toBeInTheDocument()
		expect(screen.getByText('Informe um CPF válido.')).toBeInTheDocument()
		expect(mockPush).not.toHaveBeenCalled()
	})

	it('should navigate to "/sucesso" after a valid purchase', async () => {
		const user = userEvent.setup()
		render(<Checkout {...defaultProps} />)

		await user.type(screen.getByRole('textbox', { name: 'E-mail:' }), VALID_EMAIL)
		await user.type(screen.getByRole('textbox', { name: 'CPF:' }), VALID_CPF_DIGITS)
		await user.click(screen.getByRole('button', { name: 'Finalizar compra' }))

		expect(screen.getByRole('button', { name: 'Finalizando compra...' })).toBeDisabled()

		await waitFor(
			() => {
				expect(mockPush).toHaveBeenCalledWith('/sucesso')
			},
			{ timeout: 2000 },
		)
	})
})
