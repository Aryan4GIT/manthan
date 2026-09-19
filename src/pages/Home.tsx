import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DealsGrid } from '@/components/home/DealsSection'
import { GoogleReviews } from '@/components/home/GoogleReviews'
import { Hero } from '@/components/home/Hero'
import { LocationSection } from '@/components/home/LocationSection'
import { StorePhotos } from '@/components/home/StorePhotos'
import { TrustBar } from '@/components/home/TrustBar'
import { WhyUs } from '@/components/home/WhyUs'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { CategoryGrid } from '@/components/shop/CategoryGrid'
import { ProductGrid } from '@/components/shop/ProductGrid'
import { Button } from '@/components/ui/button'
import { business } from '@/data/business'
import { categories } from '@/data/categories'
import { offers } from '@/data/offers'
import { catalogue, popularProducts } from '@/data/products'
import { usePageMeta } from '@/lib/seo'

export function Home() {
  usePageMeta('Mantan Supermart')

  return (
    <>
      <Hero />
      <TrustBar />

      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          title="Shop by category"
          lead="From fresh produce and daily staples to imported pantry finds and gift hampers."
          action={{ to: '/categories', label: 'All categories' }}
        />
        <div className="mt-8">
          <CategoryGrid categories={categories.slice(0, 7)} />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <SectionHeading
            title="Everyday picks"
            lead={catalogue.isDemo ? catalogue.notice : 'Staples, snacks and fresh food that go into most baskets.'}
            action={{ to: '/shop', label: 'Browse the shop' }}
          />
          <div className="mt-8">
            <ProductGrid products={popularProducts} />
          </div>
        </div>
      </section>

      <section className="container-x py-16 sm:py-24">
        <SectionHeading
          title="Deals and offers"
          lead="Announcements from the store, plus the ranges worth checking on every visit."
          action={{ to: '/offers', label: 'All offers' }}
        />
        <div className="mt-8">
          <DealsGrid items={offers.slice(0, 4)} />
        </div>
      </section>

      <WhyUs />

      <section className="bg-white py-16 sm:py-24">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
            <Reveal>
              <h2 className="text-3xl font-bold sm:text-4xl">Inside the store</h2>
              <p className="mt-4 leading-relaxed text-ink-600">{business.shortDescription}</p>
              <p className="mt-3 leading-relaxed text-ink-600">
                Two floors of groceries at The Gallery on MG, with a Fresh section, an Exotic Foods aisle and a gifting corner where you can
                build your own hamper.
              </p>
              <Button variant="outline" className="mt-6" asChild>
                <Link to="/about">
                  About {business.name} <ArrowRight />
                </Link>
              </Button>
            </Reveal>
            <StorePhotos />
          </div>
        </div>
      </section>

      <GoogleReviews />
      <LocationSection />
    </>
  )
}
