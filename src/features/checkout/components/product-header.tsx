import type { Product } from '../types/checkout'
import { formatBrlFromCents } from '../utils/format-brl-from-cents'

interface ProductHeaderProps {
	product: Product
}

export function ProductHeader({ product }: Readonly<ProductHeaderProps>) {
	const originalPrice = formatBrlFromCents(product.originalPriceCents)
	const currentPrice = formatBrlFromCents(product.currentPriceCents)

	return (
		<header className="flex flex-col gap-3 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
			<div className="flex flex-col gap-3">
				<p className="text-highlighted text-xs font-semibold tracking-[0.16em] uppercase">Checkout Cakto</p>

				<h1 className="text-2xl leading-tight font-semibold text-balance">{product.name}</h1>

				<p className="text-muted text-capitalize text-sm">
					Por {product.producer} · Produto {product.format} · Acesso {product.deliveryTime}
				</p>
			</div>

			<div className="flex items-baseline gap-2 lg:shrink-0 lg:flex-col lg:items-end lg:gap-0.5">
				<span className="text-muted text-base line-through">{originalPrice}</span>

				<strong className="text-highlighted text-3xl font-semibold tracking-tight">{currentPrice}</strong>
			</div>
		</header>
	)
}
