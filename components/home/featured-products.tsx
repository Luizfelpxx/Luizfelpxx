import { ProductCard } from '@/components/site/product-card'
import { Reveal } from '@/components/site/reveal'
import { products } from '@/lib/products'

export function FeaturedProducts() {
  return (
    <section id="colecao" className="mx-auto max-w-[1400px] scroll-mt-24 px-5 pb-20 md:px-10 md:pb-28">
      <Reveal className="mb-10 text-center md:mb-14">
        <p className="text-[0.7rem] uppercase tracking-luxe text-muted-foreground">
          Seleção NOIR
        </p>
        <h2 className="mt-3 font-serif text-4xl font-light md:text-5xl">
          Mais desejados
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          As peças que definem a estação, escolhidas a dedo pelo nosso atelier.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
        {products.map((product, i) => (
          <Reveal key={product.slug} as="div" delay={(i % 4) * 100}>
            <ProductCard product={product} priority={i < 4} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
