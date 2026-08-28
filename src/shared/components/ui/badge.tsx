interface BadgeProps {
	children?: string
}

export function Badge({ children }: Readonly<BadgeProps>) {
	if (!children) return null

	return <span className="bg-highlighted rounded-full px-2 py-0.5 text-xs font-semibold text-white">{children}</span>
}
