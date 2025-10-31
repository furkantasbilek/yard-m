import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency: string = 'TRY') {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: currency,
    }).format(amount)
}

export function formatDate(date: string | Date) {
    return new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date))
}

export function generateOrphanNumber(regionCode: string, sequence: number) {
    return `${regionCode}-Y-${sequence.toString().padStart(5, '0')}`
}

export function generateSponsorNumber(sequence: number) {
    return `SP-${sequence.toString().padStart(5, '0')}`
}

export function generateProjectNumber(regionCode: string, sequence: number) {
    return `${regionCode}-PRJ-${sequence.toString().padStart(5, '0')}`
}