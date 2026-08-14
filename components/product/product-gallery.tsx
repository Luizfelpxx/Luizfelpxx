'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)
  const gallery = images.length > 0 ? images : ['/placeholder.svg']

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Miniaturas */}
      <div className="flex gap-3 md:flex-col">
        {gallery.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Ver imagem ${i + 1}`}
            className={cn(
              'relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-muted transition-opacity md:w-20',
              active === i ? 'opacity-100 ring-1 ring-foreground' : 'opacity-60 hover:opacity-100',
            )}
          >
            <Image src={src || '/placeholder.svg'} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Imagem principal */}
      <div className="relative aspect-[3/4] flex-1 overflow-hidden bg-muted">
        <Image
          key={gallery[active]}
          src={gallery[active] || '/placeholder.svg'}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="animate-fade-in-up object-cover"
        />
      </div>
    </div>
  )
}
