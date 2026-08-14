'use client'

import { Check, Heart, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useCart } from '@/components/cart/cart-provider'
import type { Product } from '@/lib/products'
import { formatBRL } from '@/lib/store-config'
import { cn } from '@/lib/utils'

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product
  priority?: boolean
}) {
  const { addItem } = useCart()
  const [favorited, setFavorited] = useState(false)
  const [added, setAdded] = useState(false)

  const defaultSize = product.sizes[Math.min(1, product.sizes.length - 1)]
  const defaultColor = product.colors[0]

  function handleQuickAdd() {
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: defaultSize,
      color: defaultColor.name,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1600)
  }

  return (
    <article className="group relative">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <Link href={`/produto/${product.slug}`} className="absolute inset-0 z-10">
          <span className="sr-only">Ver {product.name}</span>
          <Image
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            priority={priority}
            className="object-cover transition-opacity duration-700 ease-out group-hover:opacity-0"
          />
          <Image
            src={product.images[1] || product.images[0] || '/placeholder.svg'}
            alt=""
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover opacity-0 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
          />
        </Link>

        {/* Etiquetas */}
        <div className="pointer-events-none absolute left-3 top-3 z-20 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-foreground px-2.5 py-1 text-[0.6rem] uppercase tracking-wide-sm text-primary-foreground">
              Novo
            </span>
          )}
          {product.onSale && (
            <span className="bg-background px-2.5 py-1 text-[0.6rem] uppercase tracking-wide-sm text-foreground">
              Sale
            </span>
          )}
        </div>

        {/* Favoritar */}
        <button
          type="button"
          onClick={() => setFavorited((v) => !v)}
          aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={favorited}
          className="absolute right-3 top-3 z-20 flex size-9 items-center justify-center rounded-full bg-background/70 backdrop-blur-sm transition-all hover:bg-background"
        >
          <Heart
            className={cn('size-4 transition-colors', favorited && 'fill-foreground')}
            strokeWidth={1.5}
          />
        </button>

        {/* Adicionar rápido (desktop, aparece no hover) */}
        <button
          type="button"
          onClick={handleQuickAdd}
          className="absolute inset-x-3 bottom-3 z-20 translate-y-3 bg-background/95 py-3 text-[0.65rem] uppercase tracking-wide-sm opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:hidden"
        >
          <span className="flex items-center justify-center gap-2">
            {added ? (
              <>
                <Check className="size-3.5" strokeWidth={1.5} /> Adicionado
              </>
            ) : (
              <>
                <Plus className="size-3.5" strokeWidth={1.5} /> Adicionar à sacola
              </>
            )}
          </span>
        </button>
      </div>

      {/* Info */}
      <div className="flex items-start justify-between gap-3 pt-4">
        <div className="min-w-0">
          <p className="text-[0.65rem] uppercase tracking-wide-sm text-muted-foreground">
            {product.category}
          </p>
          <h3 className="mt-1 truncate font-serif text-lg font-normal leading-tight">
            <Link href={`/produto/${product.slug}`} className="transition-opacity hover:opacity-60">
              {product.name}
            </Link>
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm tabular-nums">{formatBRL(product.price)}</p>
          {product.oldPrice && (
            <p className="text-xs tabular-nums text-muted-foreground line-through">
              {formatBRL(product.oldPrice)}
            </p>
          )}
        </div>
      </div>

      {/* Botão mobile de adicionar */}
      <button
        type="button"
        onClick={handleQuickAdd}
        className="mt-3 flex w-full items-center justify-center gap-2 border border-border py-2.5 text-[0.65rem] uppercase tracking-wide-sm transition-colors hover:bg-foreground hover:text-primary-foreground md:hidden"
      >
        {added ? (
          <>
            <Check className="size-3.5" strokeWidth={1.5} /> Adicionado
          </>
        ) : (
          <>
            <Plus className="size-3.5" strokeWidth={1.5} /> Adicionar
          </>
        )}
      </button>
    </article>
  )
}
