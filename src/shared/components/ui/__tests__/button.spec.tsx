import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../button'

const LABEL = 'Pagar'

const renderButton = (props: Partial<Parameters<typeof Button>[0]> = {}) => {
	const onClick = props.onClick ?? jest.fn()
	const view = render(
		<Button onClick={onClick} {...props}>
			{props.children ?? LABEL}
		</Button>,
	)

	return { ...view, onClick }
}

describe('Button component', () => {
	it('should render a button named "Pagar"', () => {
		renderButton()
		expect(screen.getByRole('button', { name: LABEL })).toBeInTheDocument()
	})

	it('should call "onClick" when clicked', async () => {
		const user = userEvent.setup()
		const { onClick } = renderButton()

		await user.click(screen.getByRole('button', { name: LABEL }))

		expect(onClick).toHaveBeenCalledTimes(1)
	})

	it.each([
		['disabled', { disabled: true }],
		['loading', { loading: true }],
	] as const)('should not call "onClick" when "%s" is true', async (_label, props) => {
		const user = userEvent.setup()
		const { onClick } = renderButton({ ...props })

		await user.click(screen.getByRole('button', { name: LABEL }))

		expect(screen.getByRole('button', { name: LABEL })).toBeDisabled()
		expect(onClick).not.toHaveBeenCalled()
	})

	it('should set "aria-busy" when "loading" is true', () => {
		renderButton({ loading: true })
		expect(screen.getByRole('button', { name: LABEL })).toHaveAttribute('aria-busy', 'true')
	})

	it('should apply the wait cursor when "loading" is true', () => {
		renderButton({ loading: true })
		expect(screen.getByRole('button', { name: LABEL })).toHaveClass('cursor-wait')
	})
})
