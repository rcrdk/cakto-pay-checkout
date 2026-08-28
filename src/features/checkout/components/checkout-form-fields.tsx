'use client'

import { useState } from 'react'

import { TextField } from '@/shared/components/ui/text-field'
import { maskCpf } from '../utils/mask-cpf'

export function CheckoutFormFields() {
	const [email, setEmail] = useState('')
	const [cpf, setCpf] = useState('')

	return (
		<div className="flex flex-col gap-4">
			<TextField
				id="email"
				label="E-mail"
				type="email"
				inputMode="email"
				autoComplete="email"
				placeholder="voce@email.com"
				value={email}
				onChange={setEmail}
			/>

			<TextField
				id="cpf"
				label="CPF"
				inputMode="numeric"
				autoComplete="off"
				placeholder="000.000.000-00"
				value={cpf}
				onChange={(value) => setCpf(maskCpf(value))}
			/>
		</div>
	)
}
