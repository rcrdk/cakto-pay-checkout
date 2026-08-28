import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { SelectField } from '../select-field'

const defaultProps = {
	id: 'installments',
	label: 'Parcelas',
}

const LABELED = `${defaultProps.label}:`
const FIRST_OPTION = { value: '1', label: '1x' }
const SECOND_OPTION = { value: '2', label: '2x' }

const defaultOptions = (
	<>
		<option value={FIRST_OPTION.value}>{FIRST_OPTION.label}</option>
		<option value={SECOND_OPTION.value}>{SECOND_OPTION.label}</option>
	</>
)

const renderSelectField = (props: Partial<Parameters<typeof SelectField>[0]> = {}) => {
	const onChange = props.onChange ?? jest.fn()
	const view = render(
		<SelectField {...defaultProps} onChange={onChange} {...props}>
			{props.children ?? defaultOptions}
		</SelectField>,
	)

	return { ...view, onChange }
}

describe('SelectField component', () => {
	it('should render a labeled combobox', () => {
		renderSelectField()
		expect(screen.getByRole('combobox', { name: LABELED })).toBeInTheDocument()
	})

	it('should call "onChange" with the selected value', async () => {
		const user = userEvent.setup()
		const { onChange } = renderSelectField()

		await user.selectOptions(screen.getByRole('combobox', { name: LABELED }), SECOND_OPTION.value)

		expect(onChange).toHaveBeenCalledWith(SECOND_OPTION.value)
	})

	it('should mark the select invalid and announce the alert when "error" is set', () => {
		renderSelectField({ error: 'Informe o número de parcelas.' })

		expect(screen.getByRole('combobox', { name: LABELED })).toBeInvalid()
		expect(screen.getByRole('alert')).toHaveTextContent('Informe o número de parcelas.')
	})

	it('should not announce an alert when "error" is omitted', () => {
		renderSelectField()
		expect(screen.queryByRole('alert')).not.toBeInTheDocument()
	})
})
