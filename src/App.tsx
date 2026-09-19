import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Button } from './components/ui/button'
import { Poster } from './components/Poster'
import { offers, works } from './data'

const nav = [
  { href: '#travaux', label: 'Travaux' },
  { href: '#offre', label: 'Offre' },
  { href: '#contact', label: 'Contact' },
]

export default function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-ink text-cream">
      <header className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#accueil" className="font-display text-xl tracking-tight">
            Leprince Karloy
          </a>
          <nav className="hidden items-center gap-8 text-sm text-cream/70 md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-gold">
                {item.label}
              </a>
            ))}
            <Button size="sm" onClick={() => scrollToId('contact')}>
              Demander un flyer
            </Button>
          </nav>
          <button
            className="md:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open ? (
          <div className="border-t border-line px-5 py-4 md:hidden">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-3 text-cream/80"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : null}
      </header>

      <main>
        <section id="accueil" className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs uppercase tracking-[0.28em] text-gold">Paris · flyers sur mesure</p>
            <h1 className="font-display text-5xl leading-[0.95] sm:text-7xl">
              Un visuel
              <br />
              qui arrête
              <br />
              le regard.
            </h1>
            <p className="mt-6 max-w-md text-lg text-cream/70">
              Je crée des flyers, affiches et stories adaptés à votre soirée, votre table ou votre
              club — pas un modèle générique, une pièce pour votre besoin.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => scrollToId('travaux')}>Voir les travaux</Button>
              <Button variant="outline" onClick={() => scrollToId('contact')}>
                Parler d’un projet
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-sm rotate-2">
            <Poster kind="match" />
            <p className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-cream/40">
              Extrait · Nuit du Match
            </p>
          </div>
        </section>

        <section id="travaux" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-gold">Sélection</p>
                <h2 className="mt-2 font-display text-4xl">Travaux récents</h2>
              </div>
              <p className="hidden max-w-xs text-right text-sm text-cream/50 md:block">
                Six directions, six ambiances. Chaque pièce est conçue pour un format précis.
              </p>
            </div>
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {works.map((work) => (
                <li key={work.id} className="group">
                  <Poster kind={work.poster} />
                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg">{work.title}</h3>
                      <p className="text-sm text-cream/50">
                        {work.category} · {work.format}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-1 size-4 text-gold opacity-0 transition group-hover:opacity-100" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="offre" className="border-t border-line bg-panel">
          <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
            <p className="text-xs uppercase tracking-[0.28em] text-gold">L’offre</p>
            <h2 className="mt-2 max-w-xl font-display text-4xl">
              Un flyer pour votre besoin, pas un catalogue.
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {offers.map((offer) => (
                <article key={offer.name} className="border border-line bg-ink p-6">
                  <h3 className="font-display text-2xl">{offer.name}</h3>
                  <p className="mt-1 text-gold">{offer.price}</p>
                  <p className="mt-4 text-sm text-cream/65">{offer.detail}</p>
                  <ul className="mt-6 space-y-2 text-sm text-cream/80">
                    {offer.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-gold">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="border-t border-line px-5 py-8 text-center text-xs uppercase tracking-[0.18em] text-cream/40">
        Leprince Karloy · Paris · flyers sur mesure
      </footer>
    </div>
  )
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function Contact() {
  const [status, setStatus] = useState<'idle' | 'error' | 'sent'>('idle')
  const [name, setName] = useState('')
  const [brief, setBrief] = useState('')

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!name.trim() || brief.trim().length < 12) {
      setStatus('error')
      return
    }
    setStatus('sent')
  }

  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Contact</p>
          <h2 className="mt-2 font-display text-4xl">Décrivez la soirée, je m’occupe du visuel.</h2>
          <p className="mt-4 max-w-md text-cream/65">
            Date, lieu, public, ton (luxe, street, humoristique…). Un message suffit pour lancer un
            premier concept.
          </p>
        </div>

        {status === 'sent' ? (
          <div className="border border-gold/40 bg-panel p-8">
            <p className="font-display text-2xl">Message prêt.</p>
            <p className="mt-3 text-cream/70">
              Merci {name}. Votre brief est noté. Réponse sous 24 h ouvré, avec une première
              direction et un délai.
            </p>
            <Button className="mt-6" variant="outline" onClick={() => setStatus('idle')}>
              Envoyer un autre brief
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4" noValidate>
            <label className="block text-sm">
              Nom
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 h-11 w-full rounded-none border border-line bg-panel px-3 outline-none focus:border-gold"
                placeholder="Votre nom"
              />
            </label>
            <label className="block text-sm">
              Brief
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                rows={5}
                className="mt-2 w-full rounded-none border border-line bg-panel px-3 py-3 outline-none focus:border-gold"
                placeholder="Date, lieu, style, format souhaité…"
              />
            </label>
            {status === 'error' ? (
              <p className="text-sm text-red-300" role="alert">
                Indiquez un nom et un brief d’au moins quelques mots pour envoyer.
              </p>
            ) : null}
            <Button type="submit">Envoyer le brief</Button>
          </form>
        )}
      </div>
    </section>
  )
}
