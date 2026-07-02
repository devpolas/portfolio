export default function scrollToSection(href: string) {
  if (!href.startsWith("/#")) return

  const id = href.replace("/#", "")
  const el = document.getElementById(id)
  if (!el) return

  const offset = 80

  window.history.pushState(null, "", `#${id}`)

  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - offset,
    behavior: "smooth",
  })
}
