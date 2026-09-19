const AI_WHATSAPP = '33666601759'

const DISHES = [
  { name: 'Ndolé aux crevettes', price: '20 €', tags: ['ndole', 'ndolé', 'crevette', 'spécialité', 'cameroun'], blurb: 'Feuilles amères, crevettes et chikwang — le plat signature.' },
  { name: 'Ndolé Royale', price: '25 €', tags: ['ndole', 'royale', 'crevette', 'poisson'], blurb: 'Viande, crevettes, poisson fumé et moru.' },
  { name: 'Poisson braisé tilapia', price: '15 €', tags: ['poisson', 'braisé', 'tilapia', 'grill', 'feu'], blurb: 'Entier au feu de bois, oignons et plantains.' },
  { name: 'Poisson braisé bar capitaine', price: '20 à 30 €', tags: ['poisson', 'bar', 'capitaine'], blurb: 'Selon la taille, cuisson braise.' },
  { name: 'Mbongo', price: '20 €', tags: ['mbongo', 'porc', 'noir', 'épicé'], blurb: 'Sauce noire camerounaise, plantains.' },
  { name: 'Poulet DG', price: '12 €', tags: ['poulet', 'dg', 'volaille'], blurb: 'Le classique DG, généreux et accessible.' },
  { name: 'Poulet Yassa', price: '12 €', tags: ['yassa', 'poulet', 'oignon'], blurb: 'Poulet aux oignons marinés.' },
  { name: '5 brochettes de bœuf', price: '15 €', tags: ['brochette', 'boeuf', 'bœuf', 'grill'], blurb: '180 g, grillades, accompagnement au choix.' },
  { name: 'Mafé', price: '12 €', tags: ['mafé', 'mafe', 'arachide', 'bœuf'], blurb: 'Bœuf, riz, sauce arachide.' },
  { name: 'Eru', price: '15 €', tags: ['eru', 'légume'], blurb: 'Bœuf et peau de bœuf, accompagnement au choix.' },
  { name: 'Taro pilé', price: '20 €', tags: ['taro', 'dimanche'], blurb: 'Uniquement le dimanche.' },
  { name: 'Tieb poulet', price: '15 €', tags: ['tieb', 'thieb', 'riz', 'poulet'], blurb: 'Riz au poulet, tradition ouest-africaine.' },
]

function normalize(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function scoreDish(dish, q) {
  return dish.tags.reduce((n, tag) => n + (q.includes(normalize(tag)) ? 2 : 0), 0) +
    (q.includes(normalize(dish.name)) ? 4 : 0)
}

function pickDishes(q, limit = 2) {
  return [...DISHES]
    .map((d) => ({ d, s: scoreDish(d, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.d)
}

function formatDish(d) {
  return `**${d.name}** (${d.price}) — ${d.blurb}`
}

function localReply(raw) {
  const q = normalize(raw)

  if (/(bonjour|salut|hello|bonsoir|hey)/.test(q) && q.length < 24) {
    return 'Bienvenue au Continent 237 — Chez Fefe. Je suis le concierge IA : carte, conseils de plats, horaires et réservation WhatsApp. Que cherchez-vous ?'
  }

  if (/(horaire|ouvert|ferme|heure)/.test(q)) {
    return 'Nous sommes ouverts **tous les jours**, 12h–00h (déjeuner 12h–13h30, dîner 19h–22h). Adresse : 18 Grande Rue, 91260 Juvisy-sur-Orge.'
  }

  if (/(adresse|ou etes|où êtes|juvisy|plan|venir)/.test(q)) {
    return '18 Grande Rue, 91260 Juvisy-sur-Orge. [Ouvrir Google Maps](https://maps.google.com/?q=48.6896,2.3806)'
  }

  if (/(whatsapp|telephone|téléphone|appeler|numero|numéro)/.test(q)) {
    return 'Réservation WhatsApp : **06 66 60 17 59**. Téléphone fixe : 01 69 38 30 23.'
  }

  if (/(reserv|table|book)/.test(q)) {
    return 'Pour une table, dites-moi le nombre de personnes, le jour et l’heure — ou ouvrez le formulaire. J’envoie aussi la demande sur WhatsApp Chez Fefe.\n\n[Réserver une table](#reservation) · [WhatsApp direct](https://wa.me/' + AI_WHATSAPP + ')'
  }

  if (/(allerg|halal|porc|sans porc)/.test(q)) {
    return 'Précisez l’allergie dans le formulaire ou sur WhatsApp. Accompagnements inclus : manioc, plantain, chikwang, riz, attiéké. Le porc est une catégorie à part (braisé, mbongo) : beaucoup de plats sont au bœuf, poulet ou poisson.'
  }

  if (/(prix|ticket|budget|cher|pas cher|moins de)/.test(q)) {
    return 'Ticket moyen **12–25 €**. Entrée de gamme : poulet DG, yassa, mafé à 12 €. Signature : ndolé mixte 20 €, royale 25 €, poisson selon taille.'
  }

  if (/(accompagn|plantain|attiéké|attieke|chikwang|manioc)/.test(q)) {
    return 'Inclus : bâton de manioc, aloko, chikwang, plantain vapeur, plantain vert à l’huile rouge, plantain tapée, riz parfumé, attiéké. Supplément 3 € : frites, riz, attiéké, couscous…'
  }

  if (/(boisson|bierre|bière|guinness|vin)/.test(q)) {
    return 'Softs 2 €, boissons africaines 60 cl à 7 €, Heineken/1664 5 €, Kadji, Castel, Guinness, vins dès 15 €.'
  }

  const hits = pickDishes(q)
  if (hits.length) {
    return 'Voici ce que je vous conseillerais :\n\n' + hits.map(formatDish).join('\n\n') + '\n\nVous voulez que je prépare une réservation WhatsApp ?'
  }

  if (/(faim|manger|plat|conseil|recommande|suggestion|menu|carte|spécial)/.test(q)) {
    return 'Pour un premier passage : **Ndolé aux crevettes** (20 €) et **poisson braisé tilapia** (15 €), cuisson feu de bois. Grillades et mbongo si vous aimez plus corsé. Dites-moi viande, poisson ou végétarien-adjacent (eru, légumes).'
  }

  return 'Je peux vous parler ndolé, poisson braisé, mbongo, horaires ou une table. Essayez : « un poisson vers 15 € » ou « réserve pour 2 samedi 20h ».'
}

function toHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
    .replace(/\n/g, '<br>')
}

function addMsg(role, html) {
  const log = document.getElementById('aiLog')
  const el = document.createElement('div')
  el.className = 'ai-msg ai-msg-' + role
  el.innerHTML = html
  log.appendChild(el)
  log.scrollTop = log.scrollHeight
}

function openAi() {
  document.getElementById('ai').classList.add('open')
  document.getElementById('aiFab').setAttribute('aria-expanded', 'true')
  document.getElementById('aiInput').focus()
}

function closeAi() {
  document.getElementById('ai').classList.remove('open')
  document.getElementById('aiFab').setAttribute('aria-expanded', 'false')
}

async function sendAi(text) {
  const input = document.getElementById('aiInput')
  const value = (text ?? input.value).trim()
  if (!value) return
  input.value = ''
  addMsg('user', toHtml(value))
  addMsg('bot', '<span class="ai-typing">Le concierge réfléchit…</span>')
  const log = document.getElementById('aiLog')
  await new Promise((r) => setTimeout(r, 420))
  log.lastElementChild.remove()
  addMsg('bot', toHtml(localReply(value)))
}

document.getElementById('aiFab').addEventListener('click', () => {
  const panel = document.getElementById('ai')
  if (panel.classList.contains('open')) closeAi()
  else openAi()
})
document.getElementById('aiClose').addEventListener('click', closeAi)
document.getElementById('aiForm').addEventListener('submit', (e) => {
  e.preventDefault()
  sendAi()
})
document.querySelectorAll('[data-ai-prompt]').forEach((btn) => {
  btn.addEventListener('click', () => sendAi(btn.getAttribute('data-ai-prompt')))
})
document.querySelectorAll('[data-open-ai]').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault()
    openAi()
  })
})
