'use client'
import Image from 'next/image'

interface YULogoProps { size?: number; className?: string }

/** Contenedor fijo + object-contain para centrar el escudo aunque el PNG traiga márgenes. */
export default function YULogo({ size = 48, className = '' }: YULogoProps) {
  const h = Math.round(size * 1.12)
  return (
    <span
      className={`relative inline-block shrink-0 overflow-visible ${className}`}
      style={{ width: size, height: h }}
    >
      <Image
        src="/escudo.png"
        alt="Young Universitario"
        fill
        className="object-contain object-[50%_48%]"
        sizes={`${size}px`}
        priority={size >= 80}
      />
    </span>
  )
}
