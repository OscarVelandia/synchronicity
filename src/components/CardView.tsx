import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import type { DrawnCard, ObliqueStrategyCard, TarotCard } from '@domain/cards'

const texts = {
  hideDescription: 'Hide description',
  showDescription: 'Show description',
  majorArcana: 'Major Arcana',
  minorArcana: 'Minor Arcana',
  minorArcanaWithSuitPrefix: 'Minor Arcana · ',
  obliqueEyebrow: 'Oblique Strategies',
  obliqueCredit: 'Brian Eno · Peter Schmidt',
  enlargePrefix: 'Enlarge ',
  closeImage: 'Close image',
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
  const [isImageOpen, setIsImageOpen] = useState(false)

  return (
    <article className="flex max-h-full min-h-0 w-[min(320px,86vw)] animate-card-enter flex-col gap-4 rounded-[18px] border border-gold-soft bg-white/5 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
      <button
        type="button"
        onClick={() => setIsImageOpen(true)}
        aria-label={`${texts.enlargePrefix}${card.name}`}
        className="group block aspect-600/1024 min-h-0 w-full flex-auto cursor-zoom-in overflow-hidden rounded-xl border border-[rgba(217,177,94,0.45)] bg-[#0c0a18] focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:outline-offset-2"
      >
        <img
          className="block h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
          src={card.imageUrl}
          alt={card.name}
        />
      </button>

      <div className="flex shrink-0 flex-col gap-2">
        <CardEyebrow>{formatTarotLabel(card)}</CardEyebrow>
        <h2 className="font-serif text-2xl font-semibold text-ink">{card.name}</h2>
        <button
          type="button"
          className="w-fit cursor-pointer self-center rounded-full border border-gold-soft bg-white/8 px-3 py-1.75 text-[0.86rem] font-semibold tracking-[0.2px] text-ink transition hover:-translate-y-px hover:border-gold hover:bg-white/[0.14] active:translate-y-0 focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:outline-offset-2"
          onClick={() => setIsDescriptionVisible((isVisible) => !isVisible)}
          aria-expanded={isDescriptionVisible}
        >
          {isDescriptionVisible ? texts.hideDescription : texts.showDescription}
        </button>
        {isDescriptionVisible ? (
          <p className="text-[0.82rem] leading-normal text-muted">
            {card.uprightMeaning}
          </p>
        ) : null}
      </div>

      {isImageOpen ? (
        <CardImageModal
          imageUrl={card.imageUrl}
          name={card.name}
          onClose={() => setIsImageOpen(false)}
        />
      ) : null}
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

function CardImageModal({
  imageUrl,
  name,
  onClose,
}: {
  readonly imageUrl: string
  readonly name: string
  readonly onClose: () => void
}) {
  useEffect(function lockScrollAndCloseOnEscape() {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${texts.enlargePrefix}${name}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
    >
      <img
        src={imageUrl}
        alt={name}
        onClick={(event) => event.stopPropagation()}
        className="max-h-[85svh] w-auto max-w-full animate-card-enter rounded-2xl border border-gold-soft shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label={texts.closeImage}
        className="absolute top-4 right-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-gold-soft bg-white/10 text-ink transition hover:border-gold hover:bg-white/20 focus-visible:[outline:2px_solid_var(--color-gold)] focus-visible:outline-offset-2"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden="true"
          className="h-4.5 w-4.5"
        >
          <path d="M6 6 L18 18 M18 6 L6 18" />
        </svg>
      </button>
    </div>,
    document.body,
  )
}

function ObliqueCardView({ card }: { readonly card: ObliqueStrategyCard }) {
  return (
    <article className="flex aspect-5/7 max-h-full w-[min(360px,88vw)] animate-card-enter flex-col items-center justify-between rounded-[14px] bg-[linear-gradient(160deg,#fbf7ec,var(--color-parchment))] px-6.5 py-7 text-parchment-ink shadow-[0_24px_60px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(0,0,0,0.06)]">
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
