import { render, screen } from '@testing-library/react'

import { Badge } from '../badge'

const LABEL = 'Recomendado'

describe('Badge component', () => {
	it.each([
		['undefined', undefined],
		['empty string', ''],
	] as const)('should not render when "children" is %s', (_label, children) => {
		const { container } = render(<Badge>{children}</Badge>)
		expect(container).toBeEmptyDOMElement()
	})

	it('should render the given text', () => {
		render(<Badge>{LABEL}</Badge>)
		expect(screen.getByText(LABEL)).toBeInTheDocument()
	})
})
