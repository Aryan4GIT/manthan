import { Check } from 'lucide-react'
import { GoogleReviews } from '@/components/home/GoogleReviews'
import { LocationSection } from '@/components/home/LocationSection'
import { StorePhotos } from '@/components/home/StorePhotos'
import { PageHero } from '@/components/PageHero'
import { Reveal } from '@/components/Reveal'
import { business } from '@/data/business'
import { usePageMeta } from '@/lib/seo'

export function About() {
  usePageMeta('About', `${business.name} is a gourmet grocery store on MG Road, Sultanpur, New Delhi: 20,000 sq ft of Indian and international groceries, fresh produce, personal care and household essentials, with free parking and free home delivery in a limited area.`)
  return (
    <>
      <PageHero title={`About ${business.name}`} lead={business.shortDescription} />

      <section className="container-x pb-8">
        <StorePhotos />
        <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl font-bold">A gourmet grocery store on MG Road</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-700">{business.description}</p>
            <p className="mt-4 text-sm text-ink-400">Description as published by the store on its Google listing.</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="grid gap-3">
              {business.highlights.map((h) => (
                <li key={h.title} className="flex gap-3 rounded-2xl bg-white p-4 shadow-card">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-800">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  <div>
                    <p className="font-bold">{h.title}</p>
                    <p className="mt-0.5 text-sm text-ink-600">{h.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <GoogleReviews />
      <LocationSection />
    </>
  )
}
