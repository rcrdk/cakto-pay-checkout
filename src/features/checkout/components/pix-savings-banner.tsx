import { PixIcon } from '@/shared/components/icons/pix-icon'

interface PixSavingsBannerProps {
	savings: string
	show?: boolean
}

export function PixSavingsBanner({ savings, show = true }: Readonly<PixSavingsBannerProps>) {
	if (!show) return null

	return (
		<p className="bg-highlighted/10 text-highlighted-dark flex items-center gap-2 rounded-xl px-3 py-2 text-sm leading-snug font-medium text-balance">
			<PixIcon className="mt-0.5 size-3" aria-hidden />
			<span>No PIX o produtor economiza {savings} em taxas.</span>
		</p>
	)
}
