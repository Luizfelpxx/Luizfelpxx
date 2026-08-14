import { ProductCard } from '@/components/site/product-card'
import { Reveal } from '@/components/site/reveal'
import { getRelatedProducts } from '@/lib/products'

export function RelatedProducts({ slug }: { slug: string }) {
  const related = getRelatedProducts(slug, 4)

  return (
    <section className="mx-auto max-w-[1400px] px-5 pb-24 md:px-10">
      <Reveal className="mb-10 text-center">
        <p className="text-[0.7rem] uppercase tracking-luxe text-muted-foreground">
          Combina com
        </p>
        <h2 className="mt-3 font-serif text-3xl font-light md:text-4xl">Você também pode gostar</h2>
      </Reveal>
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
        {related.map((product, i) => (
          <Reveal key={product.slug} delay={(i % 4) * 100}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
