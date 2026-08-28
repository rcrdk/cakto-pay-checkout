import { isValidEmail } from '../is-valid-email'

describe('IsValidEmail', () => {
	it.each(['voce@email.com', 'a@b.co'])('should accept "%s" as a valid email', (email) => {
		const isValid = isValidEmail(email)
		expect(isValid).toBe(true)
	})

	it.each(['', 'voce', 'voce@', '@email.com'])('should reject "%s" as an invalid email', (email) => {
		const isValid = isValidEmail(email)
		expect(isValid).toBe(false)
	})
})
