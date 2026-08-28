import { toCents } from '../to-cents'

describe('ToCents', () => {
	it.each([
		{ value: 297, expected: 29700 },
		{ value: 497.0, expected: 49700 },
		{ value: 10.99, expected: 1099 },
		{ value: 0.1, expected: 10 },
	])('should convert "$value" to "$expected" cents', ({ value, expected }) => {
		const cents = toCents(value)
		expect(cents).toBe(expected)
	})
})
