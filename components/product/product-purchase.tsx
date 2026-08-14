'use client'

import { Check, ChevronDown, Heart, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/components/cart/cart-provider'
import type { Product } from '@/lib/products'
import { formatBRL } from '@/lib/store-config'
import { cn } from '@/lib/utils'

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [size, setSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null,
  )
  const [color, setColor] = useState(product.colors[0].name)
  const [quantity, setQuantity] = useState(1)
  const [favorited, setFavorited] = useState(false)
  const [error, setError] = useState(false)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (!size) {
      setError(true)
      return
    }
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size,
      color,
      quantity,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="flex flex-col">
      <p className="text-[0.7rem] uppercase tracking-luxe text-muted-foreground">
        {product.category} · {product.gender}
      </p>
      <h1 className="mt-3 text-balance font-serif text-4xl font-light leading-tight md:text-5xl">
        {product.name}
      </h1>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-2xl font-light tabular-nums">{formatBRL(product.price)}</span>
        {product.oldPrice && (
          <span className="text-base tabular-nums text-muted-foreground line-through">
            {formatBRL(product.oldPrice)}
          </span>
        )}
      </div>

      <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground">
        {product.shortDescription}
      </p>

      {/* Cores */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] uppercase tracking-wide-sm">Cor</span>
          <span className="text-[0.7rem] text-muted-foreground">{color}</span>
        </div>
        <div className="mt-3 flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c.name)}
              aria-label={c.name}
              aria-pressed={color === c.name}
              className={cn(
                'flex size-9 items-center justify-center rounded-full ring-1 transition-all',
                color === c.name ? 'ring-foreground ring-offset-2 ring-offset-background' : 'ring-border',
              )}
            >
              <span
                className="size-6 rounded-full border border-black/10"
                style={{ backgroundColor: c.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Tamanhos */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <span className="text-[0.7rem] uppercase tracking-wide-sm">Tamanho</span>
          <button type="button" className="text-[0.7rem] text-muted-foreground underline underline-offset-4">
            Guia de medidas
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setSize(s)
                setError(false)
              }}
              aria-pressed={size === s}
              className={cn(
                'min-w-14 border px-4 py-3 text-sm transition-colors',
                size === s
                  ? 'border-foreground bg-foreground text-primary-foreground'
                  : 'border-border hover:border-foreground',
              )}
            >
              {s}
            </button>
          ))}
        </div>
        {error && (
          <p className="mt-2 text-xs text-destructive">Selecione um tamanho para continuar.</p>
        )}
      </div>

      {/* Quantidade + adicionar */}
      <div className="mt-8 flex items-stretch gap-3">
        <div className="flex items-center border border-border">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Diminuir quantidade"
            className="flex size-12 items-center justify-center transition-colors hover:bg-muted"
          >
            <Minus className="size-4" strokeWidth={1.5} />
          </button>
          <span className="w-10 text-center text-sm tabular-nums">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Aumentar quantidade"
            className="flex size-12 items-center justify-center transition-colors hover:bg-muted"
          >
            <Plus className="size-4" strokeWidth={1.5} />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="flex flex-1 items-center justify-center gap-2 bg-foreground px-6 text-[0.7rem] uppercase tracking-wide-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          {added ? (
            <>
              <Check className="size-4" strokeWidth={1.5} /> Adicionado à sacola
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" strokeWidth={1.5} /> Adicionar à sacola
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => setFavorited((v) => !v)}
          aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          aria-pressed={favorited}
          className="flex size-12 items-center justify-center border border-border transition-colors hover:border-foreground"
        >
          <Heart className={cn('size-4', favorited && 'fill-foreground')} strokeWidth={1.5} />
        </button>
      </div>

      {/* Detalhes expansíveis */}
      <div className="mt-10 border-t border-border">
        <Accordion title="Descrição" defaultOpen>
          <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        </Accordion>
        <Accordion title="Tabela de medidas">
          <ul className="flex flex-col gap-2">
            {product.measurements.map((m) => (
              <li key={m.label} className="flex justify-between gap-4 text-sm">
                <span className="font-medium">{m.label}</span>
                <span className="text-muted-foreground">{m.value}</span>
              </li>
            ))}
          </ul>
        </Accordion>
        <Accordion title="Cuidados com a peça">
          <ul className="flex flex-col gap-2">
            {product.care.map((c) => (
              <li key={c} className="text-sm text-muted-foreground">
                {c}
              </li>
            ))}
          </ul>
        </Accordion>
      </div>
    </div>
  )
}

function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-[0.7rem] uppercase tracking-wide-sm">{title}</span>
        <ChevronDown
          className={cn('size-4 transition-transform duration-300', open && 'rotate-180')}
          strokeWidth={1.5}
        />
      </button>
      <div
        className={cn(
          'grid transition-all duration-300 ease-out',
          open ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  )
}
