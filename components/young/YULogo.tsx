'use client'
interface YULogoProps { size?: number; className?: string }
export default function YULogo({ size = 48, className = '' }: YULogoProps) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Young Universitario Logo">
      <path d="M8 8 H192 V165 Q192 235 100 235 Q8 235 8 165 Z" fill="#CC0000" />
      <path d="M16 16 H184 V163 Q184 225 100 225 Q16 225 16 163 Z" fill="#0a0a0a" />
      <path d="M24 24 H176 V161 Q176 215 100 215 Q24 215 24 161 Z" fill="none" stroke="#CC0000" strokeWidth="3" />
      <path d="M38 30 L100 105" stroke="white" strokeWidth="22" strokeLinecap="round" />
      <path d="M162 30 L100 105" stroke="white" strokeWidth="22" strokeLinecap="round" />
      <path d="M100 105 L100 145" stroke="white" strokeWidth="22" strokeLinecap="round" />
      <path d="M68 38 L100 85 L132 38 Z" fill="#CC0000" />
      <path d="M46 125 L46 178 Q46 210 100 210 Q154 210 154 178 L154 125" fill="none" stroke="white" strokeWidth="20" strokeLinecap="round" />
    </svg>
  )
}
