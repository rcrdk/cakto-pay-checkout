import { CPF_LENGTH } from '../constants/cpf'
import { digitsOnly } from './digits-only'

const FIRST_CHECK_DIGIT_BASE = 9
const SECOND_CHECK_DIGIT_BASE = 10
const CHECK_DIGIT_MULTIPLIER = 10
const CHECK_DIGIT_MODULUS = 11
const OVERFLOW_REMAINDER = 10
const REPEATED_CPF_DIGITS_PATTERN = /^(\d)\1{10}$/

const getCpfCheckDigit = (digits: string, baseLength: number) => {
	const weightedSum = digits
		.slice(0, baseLength)
		.split('')
		.reduce((sum, digit, index) => {
			const weight = baseLength + 1 - index
			const nextSum = sum + Number(digit) * weight

			return nextSum
		}, 0)

	const remainder = (weightedSum * CHECK_DIGIT_MULTIPLIER) % CHECK_DIGIT_MODULUS
	const isOverflowRemainder = remainder === OVERFLOW_REMAINDER
	const checkDigit = isOverflowRemainder ? 0 : remainder

	return checkDigit
}

export const isValidCpf = (value: string) => {
	const digits = digitsOnly(value)
	const hasExpectedLength = digits.length === CPF_LENGTH

	if (!hasExpectedLength) return false

	const hasRepeatedDigits = REPEATED_CPF_DIGITS_PATTERN.test(digits)

	if (hasRepeatedDigits) return false

	const firstCheckDigit = getCpfCheckDigit(digits, FIRST_CHECK_DIGIT_BASE)
	const secondCheckDigit = getCpfCheckDigit(digits, SECOND_CHECK_DIGIT_BASE)

	const firstDigitMatches = firstCheckDigit === Number(digits.at(9))
	const secondDigitMatches = secondCheckDigit === Number(digits.at(10))

	const isValid = firstDigitMatches && secondDigitMatches

	return isValid
}
