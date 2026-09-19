import { motion } from 'framer-motion'
import { ArrowRight, Navigation, Phone, Star, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { business } from '@/data/business'
import { images, responsive } from '@/data/images'
import { telHref } from '@/lib/format'
import { hoursRange, openStatus } from '@/lib/hours'
import { cn } from '@/lib/utils'

const ease = [0.22, 0.61, 0.36, 1] as const
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease, delay },
})

export function Hero() {
  const status = openStatus()
  const delivery = business.hours.delivery

  return (
    <section className="relative overflow-hidden">
      <div className="glow-brand absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x grid items-center gap-8 py-8 sm:gap-10 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:py-20">
        <div>
          <motion.p {...rise(0)} className="glass-lite inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold text-brand-800 sm:glass sm:text-sm">
            <span className={cn('size-2 rounded-full', status.open ? 'bg-brand-500 shadow-[0_0_0_4px_rgb(31_163_91/0.2)]' : 'bg-ink-400')} aria-hidden="true" />
            {business.category} in Sultanpur, New Delhi
          </motion.p>

          <motion.h1 {...rise(0.08)} className="mt-5 text-[2.6rem] leading-[1.02] font-extrabold text-ink-900 sm:text-5xl lg:text-[2.9rem] xl:text-[3.75rem]">
            <span className="block">Everything you need.</span>
            <span className="block text-brand-700">All in one place.</span>
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-5 max-w-xl text-base leading-relaxed text-ink-600 sm:mt-6 sm:text-lg">
            Shop everyday groceries, household essentials and daily needs at {business.name}, on MG Road at The Gallery on MG,
            300 m from Sultanpur Metro Station.
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <Button size="lg" className="w-full sm:w-auto" asChild>
              <Link to="/shop">
                Shop now <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="glass" className="w-full sm:w-auto" asChild>
              <a href={business.directionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation /> Get directions
              </a>
            </Button>
          </motion.div>

          <motion.div
            {...rise(0.32)}
            className="glass-lite mt-6 flex flex-col gap-2 rounded-2xl px-4 py-3 text-sm sm:glass sm:mt-8 sm:inline-flex sm:flex-row sm:items-center sm:gap-x-5 sm:rounded-full sm:py-2.5"
          >
            <span className="flex items-center gap-2">
              <span className={cn('size-2 shrink-0 rounded-full', status.open ? 'bg-brand-500' : 'bg-ink-400')} aria-hidden="true" />
              <span>
                <span className="font-bold text-ink-900">{status.label}</span>, {status.detail.toLowerCase()}
              </span>
            </span>
            <span className="hidden text-ink-400 sm:inline" aria-hidden="true">
              |
            </span>
            <span className="text-ink-600">{hoursRange(business.hours.store)}, every day</span>
            <span className="hidden text-ink-400 sm:inline" aria-hidden="true">
              |
            </span>
            <a href={telHref(business.phone)} className="inline-flex items-center gap-1.5 font-bold text-brand-700 hover:text-brand-900">
              <Phone className="size-4" /> {business.phoneDisplay}
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="rounded-[2.25rem] bg-white/70 p-2 shadow-lift ring-1 ring-white/80 sm:p-2.5"
          >
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem]">
              <img
                src={images.hero.main}
                srcSet={responsive(images.hero.main, [480, 720, 960, 1400])}
                sizes="(min-width: 1024px) 46vw, (min-width: 640px) 576px, 100vw"
                alt="Fresh fruit and vegetable displays in a supermarket"
                width={1400}
                height={1120}
                fetchPriority="high"
                decoding="async"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/45 via-transparent to-transparent" aria-hidden="true" />
            </div>
          </motion.div>

          {business.rating && (
            <motion.a
              {...rise(0.5)}
              href={business.googleShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="glass absolute top-5 left-5 flex items-center gap-3 rounded-2xl px-3.5 py-2.5 transition-transform hover:-translate-y-0.5 sm:top-7 sm:left-7"
            >
              <span className="shine flex size-10 items-center justify-center rounded-xl bg-mango-500 text-ink-900">
                <Star className="size-5 fill-current" />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-xl font-extrabold tabular">{business.rating.toFixed(1)}</span>
                <span className="block text-xs font-semibold text-ink-600">{business.reviewCount} Google reviews</span>
              </span>
            </motion.a>
          )}

          {delivery && (
            <motion.div {...rise(0.6)} className="glass absolute right-5 bottom-5 flex items-center gap-3 rounded-2xl px-3.5 py-2.5 sm:right-7 sm:bottom-7">
              <span className="shine flex size-10 items-center justify-center rounded-xl bg-brand-700 text-white">
                <Truck className="size-5" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-bold">Free home delivery</span>
                <span className="block text-xs font-semibold text-ink-600">{hoursRange(delivery)}, limited area</span>
              </span>
            </motion.div>
          )}

          <motion.img
            initial={{ opacity: 0, x: -16, rotate: -6 }}
            animate={{ opacity: 1, x: 0, rotate: -4 }}
            transition={{ duration: 0.7, ease, delay: 0.45 }}
            src={images.hero.tile}
            srcSet={responsive(images.hero.tile, [360, 480, 720])}
            sizes="220px"
            alt="A bright supermarket aisle"
            width={720}
            height={520}
            loading="lazy"
            className="absolute -bottom-8 -left-6 hidden w-44 rounded-2xl border-4 border-white object-cover shadow-lift lg:block xl:w-52"
          />
        </div>
      </div>
    </section>
  )
}
