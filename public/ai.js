const history = []

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
  return el
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
  history.push({ role: 'user', content: value })
  addMsg('user', toHtml(value))
  const thinking = addMsg('bot', '<span class="ai-typing">Le concierge IA rédige…</span>')
  try {
    const res = await fetch('/api/concierge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    })
    const data = await res.json()
    thinking.remove()
    if (!res.ok || !data.reply) {
      throw new Error(data.error || 'Réponse vide')
    }
    history.push({ role: 'assistant', content: data.reply })
    addMsg('bot', toHtml(data.reply))
  } catch (err) {
    thinking.remove()
    history.pop()
    addMsg(
      'bot',
      toHtml(
        (err instanceof Error ? err.message : 'Erreur') +
          '\n\n[Réserver sur WhatsApp](https://wa.me/33666601759) · [Formulaire](#reservation)',
      ),
    )
  }
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
