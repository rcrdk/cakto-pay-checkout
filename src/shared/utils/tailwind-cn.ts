import { twMerge } from 'tailwind-merge'

export const cn = (...classes: Array<string | false | null | undefined>) => twMerge(classes)
