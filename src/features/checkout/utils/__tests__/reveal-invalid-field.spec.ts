import { revealInvalidField } from '../reveal-invalid-field'

const FIELD_ID = 'email'

const mockMatchMedia = (matches: boolean) => {
	window.matchMedia = jest.fn().mockReturnValue({ matches })
}

describe('RevealInvalidField', () => {
	beforeEach(() => {
		document.body.innerHTML = `<input id="${FIELD_ID}" />`
	})

	afterEach(() => {
		document.body.innerHTML = ''
	})

	it('should do nothing when the field is missing', () => {
		mockMatchMedia(true)

		expect(() => revealInvalidField('missing')).not.toThrow()
	})

	it('should scroll the invalid field into view', () => {
		const field = document.getElementById(FIELD_ID)
		const scrollIntoView = jest.fn()

		if (!field) throw new Error('expected field in the document')

		field.scrollIntoView = scrollIntoView
		mockMatchMedia(false)

		revealInvalidField(FIELD_ID)

		expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'center' })
	})

	it('should focus the field when the pointer can hover', () => {
		const field = document.getElementById(FIELD_ID)
		const focus = jest.fn()

		if (!field) throw new Error('expected field in the document')

		field.scrollIntoView = jest.fn()
		field.focus = focus
		mockMatchMedia(true)

		revealInvalidField(FIELD_ID)

		expect(focus).toHaveBeenCalledWith({ preventScroll: true })
	})

	it('should not focus the field on touch devices', () => {
		const field = document.getElementById(FIELD_ID)
		const focus = jest.fn()

		if (!field) throw new Error('expected field in the document')

		field.scrollIntoView = jest.fn()
		field.focus = focus
		mockMatchMedia(false)

		revealInvalidField(FIELD_ID)

		expect(focus).not.toHaveBeenCalled()
	})
})
