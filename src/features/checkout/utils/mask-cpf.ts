import { CPF_LENGTH } from '../constants/cpf'
import { digitsOnly } from './digits-only'

export const maskCpf = (value: string) => {
	const digits = digitsOnly(value).slice(0, CPF_LENGTH)
	const part1 = digits.slice(0, 3)
	const part2 = digits.slice(3, 6)
	const part3 = digits.slice(6, 9)
	const part4 = digits.slice(9, 11)

	if (digits.length <= 3) return part1
	if (digits.length <= 6) return `${part1}.${part2}`
	if (digits.length <= 9) return `${part1}.${part2}.${part3}`

	const masked = `${part1}.${part2}.${part3}-${part4}`
	return masked
}
