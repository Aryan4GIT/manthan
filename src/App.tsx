import { MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Home } from '@/pages/Home'
import { CartProvider } from '@/store/cart'

const Shop = lazy(() => import('@/pages/Shop').then((m) => ({ default: m.Shop })))
const Categories = lazy(() => import('@/pages/Categories').then((m) => ({ default: m.Categories })))
const Offers = lazy(() => import('@/pages/Offers').then((m) => ({ default: m.Offers })))
const About = lazy(() => import('@/pages/About').then((m) => ({ default: m.About })))
const Contact = lazy(() => import('@/pages/Contact').then((m) => ({ default: m.Contact })))
const Cart = lazy(() => import('@/pages/Cart').then((m) => ({ default: m.Cart })))
const Checkout = lazy(() => import('@/pages/Checkout').then((m) => ({ default: m.Checkout })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))

const fallback = <div className="container-x py-24 text-center text-ink-400" aria-busy="true">Loading…</div>

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <BrowserRouter>
          <Suspense fallback={fallback}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="shop" element={<Shop />} />
                <Route path="categories" element={<Categories />} />
                <Route path="offers" element={<Offers />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="cart" element={<Cart />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CartProvider>
    </MotionConfig>
  )
}
