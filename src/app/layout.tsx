import '@/shared/styles/globals.css'

import type { Metadata } from 'next'
import { Geist } from 'next/font/google'

import { cn } from '@/shared/utils/tailwind-cn'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Checkout | Curso de Marketing Digital 2025',
	description: 'Finalize a compra do Curso de Marketing Digital 2025 na Cakto.',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="pt-BR" className={cn(geistSans.variable, 'h-full antialiased')}>
			<body className="flex min-h-full flex-col">{children}</body>
		</html>
	)
}
