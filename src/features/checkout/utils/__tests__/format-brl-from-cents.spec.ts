import { formatBrlFromCents } from '../format-brl-from-cents'

const normalizeSpaces = (value: string) => value.replace(/\s/g, ' ')

describe('FormatBrlFromCents', () => {
	it.each([
		{ cents: 29700, expected: 'R$ 297,00' },
		{ cents: 1099, expected: 'R$ 10,99' },
		{ cents: 0, expected: 'R$ 0,00' },
	])('should format $cents cents as "$expected"', ({ cents, expected }) => {
		const formatted = formatBrlFromCents(cents)
		const normalized = normalizeSpaces(formatted)

		expect(normalized).toBe(expected)
	})
})
