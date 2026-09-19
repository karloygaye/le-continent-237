type PosterKind = 'match' | 'night' | 'table' | 'live' | 'atelier' | 'fete'

const labels: Record<PosterKind, { kicker: string; title: string; place: string }> = {
  match: { kicker: 'SAMEDI 21 H', title: 'HOMME\nDU MATCH', place: 'Paris 18e' },
  night: { kicker: 'AFTER HOURS', title: 'PARIS\nNOIR', place: 'Rue de l’Ourcq' },
  table: { kicker: 'MENU DU SOIR', title: 'TABLE\nOUVERTE', place: 'Belleville' },
  live: { kicker: 'LIVE SET', title: 'LOFT\nSESSION', place: 'Porte de la Villette' },
  atelier: { kicker: 'POP-UP', title: 'ATELIER\n19', place: 'Le Marais' },
  fete: { kicker: 'GRATUIT', title: 'QUARTIER\nEN FÊTE', place: 'Place des Fêtes' },
}

export function Poster({ kind }: { kind: PosterKind }) {
  const copy = labels[kind]
  return (
    <div
      className={`relative aspect-[3/4] overflow-hidden rounded-sm p-5 text-cream shadow-[0_24px_60px_rgba(0,0,0,0.45)] ${surface(kind)}`}
    >
      <div className="absolute inset-0 opacity-40" style={grain(kind)} />
      <div className="relative flex h-full flex-col justify-between">
        <p className="text-[10px] tracking-[0.32em] uppercase text-gold">{copy.kicker}</p>
        <h3 className="font-display text-4xl leading-[0.9] whitespace-pre-line sm:text-5xl">
          {copy.title}
        </h3>
        <div className="flex items-end justify-between text-[11px] tracking-widest uppercase">
          <span>{copy.place}</span>
          <span className="text-gold">LK</span>
        </div>
      </div>
    </div>
  )
}

function surface(kind: PosterKind) {
  switch (kind) {
    case 'match':
      return 'bg-linear-to-br from-[#3b0d12] via-[#1a0a0c] to-[#d4af4a]'
    case 'night':
      return 'bg-linear-to-b from-[#141018] via-[#2a1038] to-[#08060c]'
    case 'table':
      return 'bg-linear-to-tr from-[#2a2118] via-[#5c3a22] to-[#c9a66b]'
    case 'live':
      return 'bg-linear-to-bl from-[#08201c] via-[#0b3d36] to-[#e2c56a]'
    case 'atelier':
      return 'bg-linear-to-b from-[#f4ead8] to-[#c9b08a] text-ink'
    case 'fete':
      return 'bg-linear-to-br from-[#12243a] via-[#1c4f6e] to-[#e8c36a]'
  }
}

function grain(kind: PosterKind) {
  const hue = kind === 'atelier' ? '30,20,8' : '244,234,216'
  return {
    backgroundImage: `radial-gradient(circle at 20% 20%, rgba(${hue},0.18), transparent 40%), radial-gradient(circle at 80% 80%, rgba(212,175,74,0.2), transparent 45%)`,
  }
}
