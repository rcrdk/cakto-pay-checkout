import type { Product } from '../types/checkout'

interface CheckoutProps {
	product: Product
}

export function Checkout({ product }: Readonly<CheckoutProps>) {
	return (
		<main className="mx-auto flex w-full max-w-md flex-col px-4 py-8 lg:max-w-4xl">
			<div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-x-12 lg:gap-y-12">
				<header className="flex flex-col gap-3 lg:col-span-2 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
					{product.name}
				</header>

				<div className="flex flex-col gap-6">{product.name}</div>

				<div className="flex flex-col gap-6">{product.name}</div>
			</div>
		</main>
	)
}
