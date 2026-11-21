import { pageHeaders, paths } from '../data/content'
import { PageHeader } from '../components/layout/PageHeader'
import { Button } from '../components/ui/Button'

export function NotFound() {
  return (
    <>
      <PageHeader {...pageHeaders.notFound} />
      <section className="section">
        <div className="container">
          <Button href={paths.home}>Back to home</Button>
        </div>
      </section>
    </>
  )
}
