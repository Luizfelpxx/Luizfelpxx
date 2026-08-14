'use client'

import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import { useCart } from '@/components/cart/cart-provider'
import { formatBRL, storeConfig } from '@/lib/store-config'

function buildWhatsAppMessage(
  items: ReturnType<typeof useCart>['items'],
  subtotal: number,
) {
  const lines = items.map(
    (it) =>
      `• ${it.name} | Tam: ${it.size} | Cor: ${it.color} | Qtd: ${it.quantity} | ${formatBRL(
        it.price,
      )}`,
  )
  const message = [
    'Olá! Gostaria de finalizar meu pedido:',
    '',
    ...lines,
    '',
    `Total: ${formatBRL(subtotal)}`,
  ].join('\n')
  return encodeURIComponent(message)
}

export function CartDrawer() {
  const {
    items,
    isOpen,
    subtotal,
    count,
    closeCart,
    removeItem,
    updateQuantity,
  } = useCart()

  // Bloqueia o scroll do body enquanto a sacola está aberta
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen])

  // Fecha com a tecla Escape
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeCart])

  const remaining = Math.max(0, storeConfig.freeShippingThreshold - subtotal)
  const whatsappHref = `https://wa.me/${storeConfig.whatsappNumber}?text=${buildWhatsAppMessage(
    items,
    subtotal,
  )}`

  return (
    <div
      aria-hidden={!isOpen}
      className={`fixed inset-0 z-[60] ${isOpen ? '' : 'pointer-events-none'}`}
    >
      {/* Overlay */}
      <button
        type="button"
        aria-label="Fechar sacola"
        onClick={closeCart}
        className={`absolute inset-0 bg-foreground/40 backdrop-blur-[2px] transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Painel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sua sacola"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="font-serif text-2xl font-light">
            Sacola{' '}
            <span className="text-muted-foreground text-lg">({count})</span>
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar"
            className="flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl font-light">Sua sacola está vazia</p>
            <p className="text-sm text-muted-foreground">
              Explore a coleção e encontre suas próximas peças favoritas.
            </p>
            <button
              type="button"
              onClick={closeCart}
              className="mt-2 border-b border-foreground pb-1 text-xs uppercase tracking-wide-sm transition-opacity hover:opacity-60"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            {/* Barra de frete grátis */}
            <div className="border-b border-border bg-secondary px-6 py-3">
              {remaining > 0 ? (
                <p className="text-center text-xs text-muted-foreground">
                  Faltam <span className="text-foreground">{formatBRL(remaining)}</span>{' '}
                  para o frete grátis
                </p>
              ) : (
                <p className="text-center text-xs text-foreground">
                  Você garantiu o frete grátis
                </p>
              )}
              <div className="mt-2 h-px w-full bg-border">
                <div
                  className="h-px bg-foreground transition-all duration-700"
                  style={{
                    width: `${Math.min(
                      100,
                      (subtotal / storeConfig.freeShippingThreshold) * 100,
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Lista de itens */}
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <Link
                    href={`/produto/${item.slug}`}
                    onClick={closeCart}
                    className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-muted"
                  >
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/produto/${item.slug}`}
                        onClick={closeCart}
                        className="font-serif text-lg leading-tight transition-opacity hover:opacity-60"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remover ${item.name}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <X className="size-4" strokeWidth={1.5} />
                      </button>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-wide-sm text-muted-foreground">
                      Tam {item.size} · {item.color}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Diminuir quantidade"
                          className="flex size-8 items-center justify-center transition-colors hover:bg-muted"
                        >
                          <Minus className="size-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Aumentar quantidade"
                          className="flex size-8 items-center justify-center transition-colors hover:bg-muted"
                        >
                          <Plus className="size-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <span className="text-sm tabular-nums">
                        {formatBRL(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {/* Rodapé / checkout */}
            <footer className="border-t border-border px-6 py-5">
              <div className="flex items-center justify-between pb-1">
                <span className="text-sm uppercase tracking-wide-sm text-muted-foreground">
                  Subtotal
                </span>
                <span className="font-serif text-2xl font-light tabular-nums">
                  {formatBRL(subtotal)}
                </span>
              </div>
              <p className="pb-4 text-xs text-muted-foreground">
                Frete e prazos combinados diretamente no WhatsApp.
              </p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 bg-foreground px-6 py-4 text-xs uppercase tracking-wide-sm text-primary-foreground transition-opacity hover:opacity-90"
              >
                <WhatsAppIcon className="size-4" />
                Finalizar compra pelo WhatsApp
              </a>
              <button
                type="button"
                onClick={closeCart}
                className="mt-3 w-full text-center text-xs uppercase tracking-wide-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Continuar comprando
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
