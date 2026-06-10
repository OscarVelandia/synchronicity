// Inside-out Fisher-Yates: uniform, pure given its random source, and non-mutating.

export function shuffle<Item>(
  items: readonly Item[],
  random: () => number = Math.random,
): Item[] {
  const shuffled: Item[] = []

  for (const item of items) {
    const index = Math.floor(random() * (shuffled.length + 1))

    shuffled.splice(index, 0, item)
  }

  return shuffled
}
