const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50)
})

const burger = document.getElementById('navBurger')
const navLinks = document.getElementById('navLinks')
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open')
})

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'))
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

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (form.website.value) {
    showMessage('error', 'Erreur détectée. Veuillez réessayer.')
    return
  }

  const formData = {
    nom: form.nom.value.trim(),
    email: form.email.value.trim(),
    telephone: form.telephone.value.trim(),
    personnes: form.personnes.value,
    date: form.date.value,
    heure: form.heure.value,
    demandes: form.demandes.value.trim(),
    consentement: form.consentement.checked,
  }

  if (!formData.consentement) {
    showMessage('error', 'Veuillez accepter la politique de confidentialité.')
    return
  }

  if (formData.personnes === 'plus') {
    showMessage(
      'error',
      'Pour les groupes de plus de 6 personnes, merci de nous appeler directement au <a href="tel:0169383023">01 69 38 30 23</a>.',
    )
    return
  }

  const selectedDate = new Date(formData.date)
  const todayDate = new Date()
  todayDate.setHours(0, 0, 0, 0)

  if (selectedDate < todayDate) {
    showMessage('error', 'La date de réservation ne peut pas être dans le passé.')
    return
  }

  const reference = 'LC237-' + Date.now().toString(36).toUpperCase().slice(-6)

  showMessage(
    'success',
    `<strong>Demande envoyée — Référence ${reference}</strong>
     <p>Le restaurant vous rappellera au <strong>${formData.telephone}</strong> sous 24h pour confirmer votre table.</p>
     <p style="margin-top: 0.5rem;">Si vous ne recevez pas d'appel, appelez-nous au <a href="tel:0169383023">01 69 38 30 23</a>.</p>`,
  )

  form.reset()
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
