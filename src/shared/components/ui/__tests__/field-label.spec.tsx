import { render, screen } from '@testing-library/react'

import { FieldLabel } from '../field-label'

const LABEL = 'E-mail'
const LABELED = `${LABEL}:`

const fieldLabelAs = ['label', 'legend', 'span'] as const

const renderFieldLabel = (as: (typeof fieldLabelAs)[number]) => {
	if (as === 'legend') {
		const view = render(
			<fieldset>
				<FieldLabel as={as}>{LABEL}</FieldLabel>
			</fieldset>,
		)
		return view
	}

	const view = render(<FieldLabel as={as}>{LABEL}</FieldLabel>)
	return view
}

describe('FieldLabel component', () => {
	it.each(fieldLabelAs)('should render "%s" text with a colon', (as) => {
		renderFieldLabel(as)
		expect(screen.getByText(LABELED)).toBeInTheDocument()
	})

	it('should associate the control when "htmlFor" is set', () => {
		render(
			<>
				<FieldLabel htmlFor="email">{LABEL}</FieldLabel>
				<input id="email" />
			</>,
		)

		expect(screen.getByLabelText(LABELED)).toBeInTheDocument()
	})
})
