'use client'

import { Menu, ShoppingBag, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@/components/cart/cart-provider'
import { storeConfig } from '@/lib/store-config'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Feminino', href: '/#colecao' },
  { label: 'Masculino', href: '/#colecao' },
  { label: 'Novidades', href: '/#colecao' },
  { label: 'Coleções', href: '/#campanha' },
  { label: 'Sale', href: '/#colecao' },
]

export function SiteHeader() {
  const { count, openCart } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-border bg-background/90 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      {/* Faixa superior */}
      <div className="hidden bg-foreground py-2 text-center text-[0.65rem] uppercase tracking-luxe text-primary-foreground md:block">
        Frete grátis acima de {storeConfig.freeShippingThreshold.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} · Finalize pelo WhatsApp
      </div>

      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        {/* Esquerda: nav desktop + menu mobile */}
        <div className="flex flex-1 items-center">
          <button
            type="button"
            className="md:hidden"
            aria-label="Abrir menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" strokeWidth={1.5} />
          </button>
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[0.7rem] uppercase tracking-wide-sm text-foreground/80 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Centro: logo */}
        <Link
          href="/"
          className="flex-1 text-center font-serif text-2xl font-light tracking-[0.2em] md:text-3xl"
        >
          {storeConfig.name.split(' ')[0]}
          <span className="text-muted-foreground"> Studio</span>
        </Link>

        {/* Direita: sacola */}
        <div className="flex flex-1 items-center justify-end">
          <button
            type="button"
            onClick={openCart}
            className="relative flex items-center gap-2"
            aria-label={`Abrir sacola com ${count} itens`}
          >
            <ShoppingBag className="size-5" strokeWidth={1.5} />
            <span
              className={cn(
                'flex size-4.5 min-w-4.5 items-center justify-center rounded-full bg-foreground px-1 text-[0.6rem] tabular-nums text-primary-foreground transition-transform',
                count === 0 && 'scale-0',
              )}
            >
              {count}
            </span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={cn(
          'fixed inset-0 z-50 bg-background transition-transform duration-500 md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-serif text-2xl font-light tracking-[0.2em]">Menu</span>
          <button type="button" aria-label="Fechar menu" onClick={() => setMobileOpen(false)}>
            <X className="size-5" strokeWidth={1.5} />
          </button>
        </div>
        <nav className="flex flex-col px-5 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="border-b border-border py-5 font-serif text-3xl font-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
