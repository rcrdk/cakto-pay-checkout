import type { SVGProps } from 'react'

import { cn } from '@/shared/utils/tailwind-cn'

export function ChevronDownIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox="0 0 16 16" fill="none" className={cn('size-4 shrink-0', className)} {...props}>
			<path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	)
}
