import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { productById, type Product } from '@/data/products'

const STORAGE_KEY = 'mantan-cart-v1'
const MAX_QTY = 20

type CartState = Record<string, number>

export interface CartLine {
  product: Product
  qty: number
}

interface CartApi {
  lines: CartLine[]
  count: number
  subtotal: number
  qtyOf: (id: string) => number
  add: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  remove: (id: string) => void
  clear: () => void
}

const CartContext = createContext<CartApi | null>(null)

/** Only keep ids that still exist in the catalogue with sane quantities. */
function sanitise(raw: unknown): CartState {
  if (!raw || typeof raw !== 'object') return {}
  const out: CartState = {}
  for (const [id, qty] of Object.entries(raw as Record<string, unknown>)) {
    if (productById[id] && Number.isInteger(qty) && (qty as number) > 0) out[id] = Math.min(qty as number, MAX_QTY)
  }
  return out
}

function load(): CartState {
  try {
    return sanitise(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}'))
  } catch {
    return {}
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CartState>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* storage unavailable (private mode): cart still works for the session */
    }
  }, [state])

  const api = useMemo<CartApi>(() => {
    const lines = Object.entries(state)
      .map(([id, qty]) => ({ product: productById[id], qty }))
      .filter((l): l is CartLine => Boolean(l.product))
    const setQty = (id: string, qty: number) =>
      setState((s) => {
        if (!productById[id]) return s
        const next = { ...s }
        if (qty <= 0) delete next[id]
        else next[id] = Math.min(Math.floor(qty), MAX_QTY)
        return next
      })
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotal: lines.reduce((n, l) => n + l.qty * l.product.price, 0),
      qtyOf: (id) => state[id] ?? 0,
      add: (id, qty = 1) => setQty(id, (state[id] ?? 0) + qty),
      setQty,
      remove: (id) => setQty(id, 0),
      clear: () => setState({}),
    }
  }, [state])

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
