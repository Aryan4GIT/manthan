import { Check, Copy, MessageCircle, Phone } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { FieldError, Input, Label, Textarea } from '@/components/ui/input'
import { business } from '@/data/business'
import { buildEnquiryMessage, normalisePhone, telHref, waHref } from '@/lib/format'

type Errors = Partial<Record<'name' | 'phone' | 'message', string>>

/**
 * There is no email address on the listing, so the enquiry opens WhatsApp
 * with the message ready to send. Without a WhatsApp number it falls back
 * to "copy the message and call".
 */
export function ContactForm() {
  const [values, setValues] = useState({ name: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [copied, setCopied] = useState(false)

  const set = (k: keyof typeof values) => (e: { target: { value: string } }) => setValues((v) => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const next: Errors = {}
    if (values.name.trim().length < 2) next.name = 'Please enter your name.'
    if (!normalisePhone(values.phone)) next.phone = 'Enter a 10-digit Indian mobile number.'
    if (values.message.trim().length < 5) next.message = 'Tell us what you need, in a sentence or two.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const compose = () =>
    buildEnquiryMessage({ name: values.name.trim(), phone: normalisePhone(values.phone) ?? values.phone, message: values.message.trim() })

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const href = waHref(compose())
    if (href) window.open(href, '_blank', 'noopener,noreferrer')
  }

  const copy = async () => {
    if (!validate()) return
    try {
      await navigator.clipboard.writeText(compose())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked: the message is still visible in the form */
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
      <h3 className="text-2xl font-bold">Send an enquiry</h3>
      <p className="mt-1 text-sm text-ink-600">
        {business.whatsapp ? 'Opens WhatsApp with your message ready to send.' : 'Copy your message and call us, we will help right away.'}
      </p>
      <div className="mt-6 grid gap-4">
        <div>
          <Label htmlFor="enq-name">Name</Label>
          <Input id="enq-name" name="name" autoComplete="name" value={values.name} onChange={set('name')} aria-invalid={Boolean(errors.name)} placeholder="Your name" />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="enq-phone">Phone</Label>
          <Input id="enq-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={set('phone')} aria-invalid={Boolean(errors.phone)} placeholder="10-digit mobile number" />
          <FieldError>{errors.phone}</FieldError>
        </div>
        <div>
          <Label htmlFor="enq-message">Message</Label>
          <Textarea id="enq-message" name="message" value={values.message} onChange={set('message')} aria-invalid={Boolean(errors.message)} placeholder="What would you like to order or ask about?" />
          <FieldError>{errors.message}</FieldError>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {business.whatsapp ? (
          <Button type="submit" variant="whatsapp" size="lg">
            <MessageCircle /> Send enquiry
          </Button>
        ) : (
          <Button type="button" size="lg" onClick={copy}>
            {copied ? <Check /> : <Copy />} {copied ? 'Copied' : 'Copy message'}
          </Button>
        )}
        <Button type="button" variant="outline" size="lg" asChild>
          <a href={telHref(business.phone)}>
            <Phone /> Call {business.phoneDisplay}
          </a>
        </Button>
      </div>
    </form>
  )
}
