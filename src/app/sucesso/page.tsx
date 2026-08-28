import Link from 'next/link'

import { getCheckoutProduct } from '@/features/checkout/services/get-checkout-product'
import { formatBrlFromCents } from '@/features/checkout/utils/format-brl-from-cents'
import { Button } from '@/shared/components/ui/button'

const CHECKOUT_PATH = '/'

export default function SuccessPage() {
	const product = getCheckoutProduct()
	const paidAmount = formatBrlFromCents(product.currentPriceCents)

	return (
		<main className="mx-auto flex w-full max-w-md flex-col px-4 py-8">
			<section className="flex flex-col gap-6 py-8 text-center">
				<div className="flex flex-col gap-3">
					<p className="text-highlighted text-sm font-semibold tracking-wide uppercase">Pagamento confirmado</p>

					<h1 className="text-2xl font-semibold text-balance">Você já tem acesso ao {product.name}</h1>

					<p className="text-muted text-sm">Cobramos {paidAmount}. O material digital está disponível imediatamente.</p>
				</div>

				<Button as={Link} href={CHECKOUT_PATH} variant="muted">
					Voltar ao checkout
				</Button>
			</section>
		</main>
	)
}
