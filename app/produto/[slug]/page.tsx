import { ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductGallery } from '@/components/product/product-gallery'
import { ProductPurchase } from '@/components/product/product-purchase'
import { RelatedProducts } from '@/components/product/related-products'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { getProductBySlug, products } from '@/lib/products'

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Produto não encontrado — NOIR Studio' }
  return {
    title: `${product.name} — NOIR Studio`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  return (
    <>
      <SiteHeader />
      <main className="pt-24 md:pt-28">
        {/* Breadcrumb */}
        <nav
          aria-label="Navegação estrutural"
          className="mx-auto flex max-w-[1400px] items-center gap-1.5 px-5 py-4 text-[0.7rem] uppercase tracking-wide-sm text-muted-foreground md:px-10"
        >
          <Link href="/" className="transition-colors hover:text-foreground">
            Início
          </Link>
          <ChevronRight className="size-3" strokeWidth={1.5} />
          <Link href="/#colecao" className="transition-colors hover:text-foreground">
            {product.category}
          </Link>
          <ChevronRight className="size-3" strokeWidth={1.5} />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="mx-auto grid max-w-[1400px] gap-10 px-5 pb-20 md:grid-cols-2 md:gap-16 md:px-10 md:pb-28">
          <ProductGallery images={product.images} name={product.name} />
          <div className="md:sticky md:top-28 md:self-start">
            <ProductPurchase product={product} />
          </div>
        </div>

        <RelatedProducts slug={product.slug} />
      </main>
      <SiteFooter />
    </>
  )
}
