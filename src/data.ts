export const works = [
  {
    id: 'nuit',
    title: 'Nuit du Match',
    category: 'Flyer sport',
    format: 'A5 · recto',
    poster: 'match' as const,
  },
  {
    id: 'soiree',
    title: 'After Paris',
    category: 'Soirée club',
    format: 'Story · 9:16',
    poster: 'night' as const,
  },
  {
    id: 'resto',
    title: 'Table Ouverte',
    category: 'Restaurant',
    format: 'A4 · menu',
    poster: 'table' as const,
  },
  {
    id: 'concert',
    title: 'Live au Loft',
    category: 'Concert',
    format: 'A3 · affiche',
    poster: 'live' as const,
  },
  {
    id: 'mode',
    title: 'Atelier 19',
    category: 'Pop-up mode',
    format: 'Carré · feed',
    poster: 'atelier' as const,
  },
  {
    id: 'fete',
    title: 'Fête du Quartier',
    category: 'Événement public',
    format: 'A5 · verso',
    poster: 'fete' as const,
  },
]

export const offers = [
  {
    name: 'Flyer unique',
    price: 'à partir de 80 €',
    detail: 'Un visuel fort, format print ou story, livré en 48 h.',
    items: ['1 concept', '2 allers-retours', 'Fichiers print + web'],
  },
  {
    name: 'Série événement',
    price: 'à partir de 180 €',
    detail: 'Affiche, flyer et story alignés sur la même direction.',
    items: ['3 déclinaisons', 'Palette + typo', 'Mockups de présentation'],
  },
  {
    name: 'Identité de soirée',
    price: 'sur devis',
    detail: 'Un univers graphique pour une résidence, un club ou une marque.',
    items: ['Direction artistique', 'Pack réseaux', 'Suivi sur 1 mois'],
  },
]
