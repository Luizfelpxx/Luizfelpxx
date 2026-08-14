'use client'

import { Check } from 'lucide-react'
import { useState } from 'react'
import { Reveal } from '@/components/site/reveal'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubmitted(true)
  }

  return (
    <section className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="mx-auto max-w-xl text-center">
          <p className="text-[0.7rem] uppercase tracking-luxe text-primary-foreground/70">
            Clube NOIR
          </p>
          <h2 className="mt-4 text-balance font-serif text-4xl font-light leading-tight md:text-5xl">
            10% OFF na primeira compra
          </h2>
          <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-primary-foreground/70">
            Assine a newsletter e receba acesso antecipado a coleções, editoriais
            e condições exclusivas.
          </p>

          {submitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-primary-foreground">
              <Check className="size-4" strokeWidth={1.5} />
              Inscrição confirmada. Seu cupom chegará por e-mail.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Seu e-mail
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="flex-1 border border-primary-foreground/30 bg-transparent px-5 py-4 text-sm text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="bg-background px-8 py-4 text-[0.7rem] uppercase tracking-wide-sm text-foreground transition-opacity hover:opacity-90"
              >
                Assinar
              </button>
            </form>
          )}
          <p className="mt-4 text-[0.65rem] text-primary-foreground/50">
            Ao assinar, você concorda em receber comunicações da NOIR Studio.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
