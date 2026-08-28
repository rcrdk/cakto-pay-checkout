import { getFirstInvalidFieldId } from '../get-first-invalid-field-id'

describe('GetFirstInvalidFieldId', () => {
	it('should return "email" when both fields are invalid', () => {
		const fieldId = getFirstInvalidFieldId({ email: { message: 'invalid' }, cpf: { message: 'invalid' } })
		expect(fieldId).toBe('email')
	})

	it('should return "cpf" when "email" is valid', () => {
		const fieldId = getFirstInvalidFieldId({ cpf: { message: 'invalid' } })
		expect(fieldId).toBe('cpf')
	})

	it('should return undefined when there are no field errors', () => {
		const fieldId = getFirstInvalidFieldId({})
		expect(fieldId).toBeUndefined()
	})
})
