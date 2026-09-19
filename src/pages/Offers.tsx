import { MessageCircle } from 'lucide-react'
import { InstagramIcon } from '@/components/icons'
import { DealsGrid } from '@/components/home/DealsSection'
import { PageHero } from '@/components/PageHero'
import { Button } from '@/components/ui/button'
import { business } from '@/data/business'
import { waHref } from '@/lib/format'
import { usePageMeta } from '@/lib/seo'

export function Offers() {
  usePageMeta('Offers', 'Current deals and offers at Mantan Supermart, Sultanpur, New Delhi: weekend savings on fresh fruits and vegetables, free home delivery and more.')
  const wa = waHref(`Hello ${business.name}, what offers are running this week?`)
  return (
    <>
      <PageHero
        title="Deals and offers"
        lead="Offers announced by the store, and the ranges worth checking on every visit. The store confirms current prices when you order."
      />
      <section className="container-x pb-8">
        <DealsGrid />
        <div className="mt-10 flex flex-col items-start gap-4 rounded-[2rem] bg-brand-900 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <h2 className="text-2xl font-bold">Ask about this week’s offers</h2>
            <p className="mt-1 text-white/75">New deals are posted on the store’s social pages. Message us to check what is running today.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {wa && (
              <Button variant="whatsapp" size="lg" asChild>
                <a href={wa} target="_blank" rel="noopener noreferrer">
                  <MessageCircle /> Ask on WhatsApp
                </a>
              </Button>
            )}
            {business.social?.instagram && (
              <Button variant="glass" size="lg" asChild>
                <a href={business.social.instagram} target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className="size-5" /> Instagram
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
