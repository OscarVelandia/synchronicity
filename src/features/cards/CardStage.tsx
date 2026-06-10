import { CardView } from '@features/cards/CardView'
import { selectCardView } from '@features/cards/cardSelectors'
import { languageSelectors } from '@features/language/languageSlice'
import { useAppSelector } from '@store/hooks'
import { isNil } from '@utils/isNil'

export function CardStage() {
  const text = useAppSelector(languageSelectors.uiText)
  const cardView = useAppSelector(selectCardView)

  return (
    <section className="flex min-h-0 w-full grow items-start justify-center pt-2">
      {isNil(cardView) ? (
        <p className="text-[1.05rem] text-muted italic">{text.placeholder}</p>
      ) : (
        <CardView
          key={`${cardView.card.kind}-${cardView.card.id}`}
          card={cardView.card}
          eyebrow={cardView.eyebrow}
        />
      )}
    </section>
  )
}
