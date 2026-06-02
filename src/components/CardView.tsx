import { useState, type ReactNode } from 'react'
import type { DrawnCard, ObliqueStrategyCard, TarotCard } from '@domain/cards'

const texts = {
  hideDescription: 'Hide description',
  showDescription: 'Show description',
  majorArcana: 'Major Arcana',
  minorArcana: 'Minor Arcana',
  minorArcanaWithSuitPrefix: 'Minor Arcana · ',
  obliqueEyebrow: 'Oblique Strategies',
  obliqueCredit: 'Brian Eno · Peter Schmidt',
} as const

export function CardView({ card }: { readonly card: DrawnCard }) {
  return card.kind === 'tarot' ? (
    <TarotCardView card={card} />
  ) : (
    <ObliqueCardView card={card} />
  )
}

function TarotCardView({ card }: { readonly card: TarotCard }) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)

  return (
    <article className="flex w-[min(320px,86vw)] animate-card-enter flex-col gap-4 rounded-[18px] border border-gold-soft bg-white/[0.05] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="aspect-[600/1024] overflow-hidden rounded-xl border border-[rgba(217,177,94,0.45)] bg-[#0c0a18]">
        <img
          className="block h-full w-full object-cover"
          src={card.imageUrl}
          alt={card.name}
        />
      </div>

      <div className="flex flex-col gap-2">
        <CardEyebrow>{formatTarotLabel(card)}</CardEyebrow>
        <h2 className="font-serif text-2xl font-semibold text-ink">{card.name}</h2>
        <button
          type="button"
          className="w-fit cursor-pointer self-center rounded-full border border-gold-soft bg-white/[0.08] px-3 py-[7px] text-[0.86rem] font-semibold tracking-[0.2px] text-ink transition hover:-translate-y-px hover:border-gold hover:bg-white/[0.14] active:translate-y-0 focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:outline-offset-2"
          onClick={() => setIsDescriptionVisible((isVisible) => !isVisible)}
          aria-expanded={isDescriptionVisible}
        >
          {isDescriptionVisible ? texts.hideDescription : texts.showDescription}
        </button>
        {isDescriptionVisible ? (
          <p className="text-[0.95rem] leading-[1.5] text-muted">
            {card.uprightMeaning}
          </p>
        ) : null}
      </div>
    </article>
  )
}

function formatTarotLabel(card: TarotCard): string {
  switch (card.arcana) {
    case 'major':
      return texts.majorArcana
    case 'minor': {
      const suitLabel =
        card.suit === undefined
          ? null
          : `${card.suit.charAt(0).toUpperCase()}${card.suit.slice(1)}`

      return suitLabel === null
        ? texts.minorArcana
        : `${texts.minorArcanaWithSuitPrefix}${suitLabel}`
    }
  }
}

function CardEyebrow({
  className,
  children,
}: {
  readonly className?: string
  readonly children: ReactNode
}) {
  return (
    <p
      className={`text-[0.72rem] font-semibold uppercase tracking-[2.5px] ${className ?? 'text-gold'}`}
    >
      {children}
    </p>
  )
}

function ObliqueCardView({ card }: { readonly card: ObliqueStrategyCard }) {
  return (
    <article className="flex aspect-[5/7] w-[min(360px,88vw)] animate-card-enter flex-col items-center justify-between rounded-[14px] bg-[linear-gradient(160deg,#fbf7ec,var(--color-parchment))] px-[26px] py-7 text-parchment-ink shadow-[0_24px_60px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(0,0,0,0.06)]">
      <CardEyebrow className="text-[#9a7a32]">{texts.obliqueEyebrow}</CardEyebrow>
      <p className="flex grow items-center font-serif text-[clamp(1.3rem,4.5vw,1.7rem)] leading-[1.4] text-parchment-ink">
        {card.text}
      </p>
      <p className="text-[0.74rem] uppercase tracking-[1px] text-parchment-ink/55">
        {texts.obliqueCredit}
      </p>
    </article>
  )
}
