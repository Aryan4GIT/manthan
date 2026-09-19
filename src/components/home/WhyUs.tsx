import { CircleParking, Gift, Globe, HandHelping, Leaf, Ruler, TrainFront, Truck, type LucideIcon } from 'lucide-react'
import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { business } from '@/data/business'
import { images, responsive } from '@/data/images'
import { hoursRange } from '@/lib/hours'

interface Benefit {
  Icon: LucideIcon
  title: string
  detail: string
}

/* Every claim below comes from the owner's description on Google. */
const benefits: Benefit[] = [
  { Icon: Globe, title: 'Indian and international brands', detail: 'Everyday staples next to imported and gourmet finds, under one roof.' },
  { Icon: Ruler, title: '20,000 sq ft, wide aisles', detail: 'Room to browse across the ground and lower ground floors.' },
  { Icon: Leaf, title: 'Fresh every day', detail: 'Daily fruits and vegetables, fresh chakki atta, meats and frozen foods.' },
  { Icon: HandHelping, title: 'Helpful staff', detail: 'Ask anyone on the floor, they will walk you to the right shelf.' },
  { Icon: TrainFront, title: 'Easy to reach', detail: `${business.landmarks[0]}, ${business.landmarks[1].toLowerCase()}.` },
  { Icon: Gift, title: 'Gift hampers', detail: 'Choose your own assortment and we will pack the basket.' },
]

export function WhyUs() {
  return (
    <section className="container-x cv-auto py-14 sm:py-24">
      <SectionHeading
        title={`Why shop at ${business.name}?`}
        lead="A neighbourhood supermarket with the range of a gourmet store, and the everyday prices and service of a local shop."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift sm:aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[34rem]">
            <img
              src={images.aisle}
              srcSet={responsive(images.aisle, [480, 720, 960, 1200])}
              sizes="(min-width: 1024px) 44vw, 100vw"
              alt="Shelves stocked with fresh produce inside a supermarket"
              loading="lazy"
              decoding="async"
              width={1200}
              height={1500}
              className="size-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-4 bottom-4 grid gap-2.5 sm:inset-x-5 sm:bottom-5">
              <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                <span className="shine flex size-10 items-center justify-center rounded-xl bg-brand-700 text-white">
                  <CircleParking className="size-5" />
                </span>
                <div className="leading-tight">
                  <p className="font-bold">Free vehicle parking</p>
                  <p className="text-xs text-ink-600">Drive in and load up easily</p>
                </div>
              </div>
              {business.hours.delivery && (
                <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3">
                  <span className="shine flex size-10 items-center justify-center rounded-xl bg-mango-500 text-ink-900">
                    <Truck className="size-5" />
                  </span>
                  <div className="leading-tight">
                    <p className="font-bold">Free home delivery</p>
                    <p className="text-xs text-ink-600">{hoursRange(business.hours.delivery)}, limited area</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>

        <ul className="grid content-center gap-x-8 gap-y-7 sm:grid-cols-2">
          {benefits.map(({ Icon, title, detail }, i) => (
            <Reveal key={title} delay={i * 0.05}>
              <li className="flex gap-4">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-100 text-brand-800">
                  <Icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-sans text-lg font-bold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{detail}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
