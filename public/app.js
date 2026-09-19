const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50)
})

const burger = document.getElementById('navBurger')
const navLinks = document.getElementById('navLinks')
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open')
  burger.setAttribute('aria-expanded', String(open))
  burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu')
})

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open')
    burger.setAttribute('aria-expanded', 'false')
    burger.setAttribute('aria-label', 'Ouvrir le menu')
  })
})

const tabs = document.querySelectorAll('.menu-tab')
const categories = document.querySelectorAll('.menu-category')

function activateTab(target) {
  if (!target) return
  tabs.forEach((t) => t.classList.remove('active'))
  categories.forEach((c) => c.classList.remove('active'))
  const tab = document.querySelector(`.menu-tab[data-tab="${target}"]`)
  const panel = document.getElementById(target)
  tab?.classList.add('active')
  panel?.classList.add('active')
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => activateTab(tab.dataset.tab))
})

document.querySelectorAll('[data-open-tab]').forEach((link) => {
  link.addEventListener('click', () => activateTab(link.getAttribute('data-open-tab')))
})

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('visible')
    })
  },
  { threshold: 0.1 },
)

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

const form = document.getElementById('reservationForm')
const messageDiv = document.getElementById('formMessage')
const dateInput = document.getElementById('date')

const today = new Date().toISOString().split('T')[0]
dateInput.setAttribute('min', today)
const maxDate = new Date()
maxDate.setMonth(maxDate.getMonth() + 3)
dateInput.setAttribute('max', maxDate.toISOString().split('T')[0])

const WHATSAPP_NUMBER = '33767877538'

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (form.website.value) {
    showMessage('error', 'Erreur détectée. Veuillez réessayer.')
    return
  }

  const nom = form.nom.value.trim()
  const email = form.email.value.trim()
  const telephone = form.telephone.value.replace(/\s+/g, '')
  const personnes = form.personnes.value
  const date = form.date.value
  const heure = form.heure.value
  const demandes = form.demandes.value.trim()
  const consentement = form.consentement.checked

  if (!nom || !email || !telephone || !personnes || !date || !heure) {
    showMessage('error', 'Merci de remplir tous les champs obligatoires.')
    return
  }

  if (!/^[0-9]{10}$/.test(telephone)) {
    showMessage('error', 'Indiquez un numéro français à 10 chiffres, sans espaces.')
    return
  }

  if (!consentement) {
    showMessage('error', 'Veuillez accepter la politique de confidentialité.')
    return
  }

  const selectedDate = new Date(date)
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)

  if (selectedDate < todayDate) {
    showMessage('error', 'La date de réservation ne peut pas être dans le passé.')
    return
  }

  const reference = 'LC237-' + Date.now().toString(36).toUpperCase().slice(-6)
  const dateFr = selectedDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  const couverts = personnes === 'plus' ? 'Plus de 6 personnes' : `${personnes} personne(s)`

  const message = [
    'Bonjour Chez Fefe,',
    '',
    `Nouvelle demande de table — ${reference}`,
    `Nom : ${nom}`,
    `Téléphone : ${telephone}`,
    `Email : ${email}`,
    `Date : ${dateFr}`,
    `Heure : ${heure.replace(':', 'h')}`,
    `Couverts : ${couverts}`,
    demandes ? `Demandes : ${demandes}` : 'Demandes : —',
    '',
    'Merci de confirmer la table.',
  ].join('\n')

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  const popup = window.open(url, '_blank', 'noopener,noreferrer')

  showMessage(
    'success',
    `<strong>WhatsApp prêt — ${reference}</strong>
     <p>La conversation s’ouvre avec Chez Fefe (07 67 87 75 38).</p>
     <p style="margin-top:0.6rem"><a href="${url}" target="_blank" rel="noopener noreferrer">Ouvrir WhatsApp si rien ne s’affiche</a></p>`,
  )

  if (!popup) {
    window.location.href = url
  }
})

function showMessage(type, html) {
  messageDiv.className = 'form-message ' + type
  messageDiv.innerHTML = html
  messageDiv.style.display = 'block'
  messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

document.getElementById('newsletterForm').addEventListener('submit', function (e) {
  e.preventDefault()
  alert('Merci pour votre inscription ! Vous recevrez nos actualités prochainement.')
  this.reset()
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href')
    if (href === '#') return
    const target = document.querySelector(href)
    if (target) {
      e.preventDefault()
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
})

const lightbox = document.getElementById('lightbox')
const lightboxImage = document.getElementById('lightboxImage')
const lightboxCaption = document.getElementById('lightboxCaption')

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => {
    lightboxImage.src = item.dataset.full
    lightboxImage.alt = item.querySelector('img')?.alt || ''
    lightboxCaption.textContent = item.dataset.caption || ''
    lightbox.classList.add('open')
  })
})

function closeLightbox() {
  lightbox.classList.remove('open')
  lightboxImage.src = ''
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox)
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox()
})
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox()
})
