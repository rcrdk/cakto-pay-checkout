import { maskCpf } from '../mask-cpf'

describe('MaskCpf', () => {
	it('should format digits as "000.000.000-00"', () => {
		const masked = maskCpf('52998224725')
		expect(masked).toBe('529.982.247-25')
	})

	it('should keep partial masks while typing', () => {
		const partial = maskCpf('52998')
		expect(partial).toBe('529.98')
	})
})
