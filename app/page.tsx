import { CampaignBanner } from '@/components/home/campaign-banner'
import { Categories } from '@/components/home/categories'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Hero } from '@/components/home/hero'
import { Lifestyle } from '@/components/home/lifestyle'
import { Newsletter } from '@/components/home/newsletter'
import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <CampaignBanner />
        <Lifestyle />
        <Newsletter />
      </main>
      <SiteFooter />
    </>
  )
}
