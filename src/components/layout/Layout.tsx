import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { BackToTop } from './BackToTop'

// Shared shell for every route: header and footer stay, the page swaps in <Outlet />.
export function Layout() {
  const { pathname } = useLocation()

  // Start each new page at the top instead of keeping the previous scroll position.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
