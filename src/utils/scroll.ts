export function scrollToId(id: string): void {
  const el = document.getElementById(id.replace('#', ''))
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Scroll to section on home, or navigate to `/#section` from other pages. */
export function goToSection(href: string): void {
  const hash = href.startsWith('#') ? href : `#${href}`
  if (window.location.pathname === '/') {
    scrollToId(hash)
    return
  }
  window.location.assign(`/${hash}`)
}

export function goHome(): void {
  if (window.location.pathname === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  window.location.assign('/')
}
