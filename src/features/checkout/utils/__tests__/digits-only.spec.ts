import { digitsOnly } from '../digits-only'

describe('DigitsOnly', () => {
	it.each([
		{ value: '529.982.247-25', expected: '52998224725' },
		{ value: '12a34', expected: '1234' },
		{ value: 'abc', expected: '' },
		{ value: '', expected: '' },
	])('should keep only digits from "$value"', ({ value, expected }) => {
		const digits = digitsOnly(value)
		expect(digits).toBe(expected)
	})
})
