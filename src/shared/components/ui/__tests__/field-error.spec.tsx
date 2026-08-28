import { render, screen } from '@testing-library/react'

import { FieldError } from '../field-error'

const ERROR_ID = 'email-error'
const ERROR_MESSAGE = 'Informe um e-mail válido.'

describe('FieldError component', () => {
	it.each([
		['undefined', undefined],
		['null', null],
		['empty string', ''],
	] as const)('should not render when "message" is %s', (_label, message) => {
		render(<FieldError id={ERROR_ID} message={message} />)
		expect(screen.queryByRole('alert')).not.toBeInTheDocument()
	})

	it('should announce the message as an alert', () => {
		render(<FieldError id={ERROR_ID} message={ERROR_MESSAGE} />)
		expect(screen.getByRole('alert')).toHaveTextContent(ERROR_MESSAGE)
	})
})
