import Image from 'next/image'
import Link from 'next/link'
import { Reveal } from '@/components/site/reveal'

const categories = [
  { label: 'Camisetas', image: '/editorial/category-camisetas.png', href: '/#colecao' },
  { label: 'Calças', image: '/editorial/category-calcas.png', href: '/#colecao' },
  { label: 'Acessórios', image: '/editorial/category-acessorios.png', href: '/#colecao' },
]

export function Categories() {
  return (
    <section className="mx-auto max-w-[1400px] px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-10 flex items-end justify-between md:mb-14">
        <div>
          <p className="text-[0.7rem] uppercase tracking-luxe text-muted-foreground">
            Explore
          </p>
          <h2 className="mt-3 font-serif text-4xl font-light md:text-5xl">Categorias</h2>
        </div>
        <Link
          href="/#colecao"
          className="hidden border-b border-foreground pb-1 text-[0.7rem] uppercase tracking-wide-sm transition-opacity hover:opacity-60 md:inline-block"
        >
          Ver tudo
        </Link>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat.label} delay={i * 120}>
            <Link href={cat.href} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <Image
                  src={cat.image || '/placeholder.svg'}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-foreground/10 transition-colors duration-500 group-hover:bg-foreground/25" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
                  <h3 className="font-serif text-2xl font-light text-background md:text-3xl">
                    {cat.label}
                  </h3>
                  <span className="text-[0.7rem] uppercase tracking-wide-sm text-background/90">
                    Comprar
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
