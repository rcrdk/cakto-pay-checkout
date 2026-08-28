import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TextField } from '../text-field'

const defaultProps = {
	id: 'email',
	label: 'E-mail',
}

const LABELED = `${defaultProps.label}:`
const ERROR_MESSAGE = 'Informe um e-mail válido.'

const renderTextField = (props: Partial<Parameters<typeof TextField>[0]> = {}) => {
	const onChange = props.onChange ?? jest.fn()
	const view = render(<TextField {...defaultProps} onChange={onChange} {...props} />)

	return { ...view, onChange }
}

describe('TextField component', () => {
	it('should render a labeled text input', () => {
		renderTextField()
		expect(screen.getByRole('textbox', { name: LABELED })).toBeInTheDocument()
	})

	it('should call "onChange" with the typed value', async () => {
		const user = userEvent.setup()
		const { onChange } = renderTextField()

		await user.type(screen.getByRole('textbox', { name: LABELED }), 'a')

		expect(onChange).toHaveBeenCalledWith('a')
	})

	it('should mark the input invalid and announce the alert when "error" is set', () => {
		renderTextField({ error: ERROR_MESSAGE })

		expect(screen.getByRole('textbox', { name: LABELED })).toBeInvalid()
		expect(screen.getByRole('alert')).toHaveTextContent(ERROR_MESSAGE)
	})

	it('should not announce an alert when "error" is omitted', () => {
		renderTextField()
		expect(screen.queryByRole('alert')).not.toBeInTheDocument()
	})
})
