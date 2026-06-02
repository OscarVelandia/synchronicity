// Random draw that avoids immediately repeating the previous card.
// Generic over any deck whose entries carry a stable id.

export function drawCard<Item extends { readonly id: string }>(
  deck: readonly Item[],
  previousId: string | null,
): Item {
  const candidates =
    previousId === null ? deck : deck.filter((card) => card.id !== previousId)
  // Fall back to the full deck if filtering left nothing (e.g. a single-card deck).
  const pool = candidates.length > 0 ? candidates : deck
  const index = Math.floor(Math.random() * pool.length)
  const chosen = pool[index]

  if (chosen === undefined) {
    throw new Error('Cannot draw a card from an empty deck')
  }

  return chosen
}
