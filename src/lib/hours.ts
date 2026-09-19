import { business, type StoreHours } from '@/data/business'
import { hourLabel } from './format'

const istParts = new Intl.DateTimeFormat('en-GB', {
  timeZone: business.timeZone,
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
})

/** Minutes since midnight in the store's time zone. */
function minutesNowInStoreTz(now: Date) {
  const parts = istParts.formatToParts(now)
  const hour = Number(parts.find((p) => p.type === 'hour')?.value ?? 0) % 24
  const minute = Number(parts.find((p) => p.type === 'minute')?.value ?? 0)
  return hour * 60 + minute
}

export function openStatus(h: StoreHours = business.hours.store, now = new Date()) {
  const m = minutesNowInStoreTz(now)
  const open = m >= h.open * 60 && m < h.close * 60
  return open
    ? { open: true, label: 'Open now', detail: `Closes ${hourLabel(h.close)}` }
    : { open: false, label: 'Closed now', detail: `Opens ${hourLabel(h.open)}` }
}

export const hoursRange = (h: StoreHours) => `${hourLabel(h.open)} to ${hourLabel(h.close)}`
