export function scrollToId(id: string): void {
  const el = document.getElementById(id.replace('#', ''))
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
