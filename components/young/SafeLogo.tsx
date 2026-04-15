'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

type Props = Omit<ImageProps, 'src'> & {
  src: string
  fallbackSrc: string
}

/**
 * Image con fallback: si el src no existe/está corrupto, muestra fallbackSrc.
 * Evita el ícono de imagen rota en producción.
 */
export default function SafeLogo({ src, fallbackSrc, alt, ...props }: Props) {
  const [actualSrc, setActualSrc] = useState(src)

  return (
    <Image
      {...props}
      src={actualSrc}
      alt={alt}
      onError={() => {
        if (actualSrc !== fallbackSrc) setActualSrc(fallbackSrc)
      }}
    />
  )
}

