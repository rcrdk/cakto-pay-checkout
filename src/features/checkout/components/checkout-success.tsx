import type { Product } from '../types/checkout'
import { formatBrlFromCents } from '../utils/format-brl-from-cents'

interface CheckoutSuccessProps {
	product: Product
}

export function CheckoutSuccess({ product }: Readonly<CheckoutSuccessProps>) {
	const paidAmount = formatBrlFromCents(product.currentPriceCents)

	return (
		<section className="flex flex-col gap-3 py-8 text-center">
			<p className="text-highlighted text-sm font-semibold tracking-wide uppercase">Pagamento confirmado</p>

			<h1 className="text-2xl font-semibold text-balance">Você já tem acesso ao {product.name}</h1>

			<p className="text-muted text-sm">Cobramos {paidAmount}. O material digital está disponível imediatamente.</p>
		</section>
	)
}
