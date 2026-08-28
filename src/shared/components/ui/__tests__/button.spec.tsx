import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Button } from '../button'

const LABEL = 'Pagar'

type RenderButtonProps = {
	children?: string
	disabled?: boolean
	loading?: boolean
	variant?: 'highlighted' | 'muted'
	onClick?: ReturnType<typeof jest.fn>
}

const renderButton = (props: RenderButtonProps = {}) => {
	const onClick = props.onClick ?? jest.fn()
	const view = render(
		<Button onClick={onClick} disabled={props.disabled} loading={props.loading} variant={props.variant}>
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

	it('should apply the muted background when "variant" is "muted"', () => {
		renderButton({ variant: 'muted' })
		expect(screen.getByRole('button', { name: LABEL })).toHaveClass('bg-muted')
	})

	it('should render as a link when "as" is "a"', () => {
		render(
			<Button as="a" href="/">
				{LABEL}
			</Button>,
		)

		expect(screen.getByRole('link', { name: LABEL })).toHaveAttribute('href', '/')
	})
})
