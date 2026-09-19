import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHero } from '@/components/PageHero'
import { Button } from '@/components/ui/button'
import { usePageMeta } from '@/lib/seo'

export function NotFound() {
  usePageMeta('Page not found')
  return (
    <>
      <PageHero title="That page is not on the shelf" lead="The link may be old or mistyped. The shop and store details are one tap away.">
        <div className="flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/">
              Go home <ArrowRight />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/shop">Browse the shop</Link>
          </Button>
        </div>
      </PageHero>
    </>
  )
}
