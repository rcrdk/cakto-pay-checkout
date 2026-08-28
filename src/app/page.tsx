'use client'

import { useState } from 'react'

import { Badge } from '@/shared/components/ui/badge'
import { FieldError } from '@/shared/components/ui/field-error'
import { FieldLabel } from '@/shared/components/ui/field-label'
import { TextField } from '@/shared/components/ui/text-field'

export default function Home() {
	const [email, setEmail] = useState('')
	const [cpf, setCpf] = useState('')

	return (
		<main className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 p-6">
			<Badge>Recomendado</Badge>
			<FieldLabel as="span">Rótulo avulso</FieldLabel>
			<FieldError id="preview-error" message="Informe um CPF válido." />
			<TextField id="email" label="E-mail" value={email} onChange={setEmail} placeholder="voce@email.com" />
			<TextField
				id="cpf"
				label="CPF"
				value={cpf}
				onChange={setCpf}
				inputMode="numeric"
				placeholder="000.000.000-00"
				error="Informe um CPF válido."
			/>
		</main>
	)
}
