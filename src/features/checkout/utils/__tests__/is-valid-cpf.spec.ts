import { isValidCpf } from '../is-valid-cpf'

describe('IsValidCpf', () => {
	it.each(['529.982.247-25', '52998224725', '390.533.447-05'])('should accept "%s" as a valid "CPF"', (cpf) => {
		const isValid = isValidCpf(cpf)
		expect(isValid).toBe(true)
	})

	it.each(['111.111.111-11', '123.456.789-00', '529.982.247-26', '123', ''])(
		'should reject "%s" as an invalid "CPF"',
		(cpf) => {
			const isValid = isValidCpf(cpf)
			expect(isValid).toBe(false)
		},
	)
})
