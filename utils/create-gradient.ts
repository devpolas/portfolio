export function createGradient(base: string) {
  return `
    radial-gradient(
      circle at top left,
      ${base}AA 0%,
      ${base}44 40%,
      ${base}10 70%,
      transparent 100%
    )
  `
}
