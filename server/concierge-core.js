export const SYSTEM = `Tu es le concierge du restaurant Le Continent 237 — Chez Fefe, grill camerounais au feu de bois.
Adresse : 18 Grande Rue, 91260 Juvisy-sur-Orge.
Téléphone fixe : 01 69 38 30 23. WhatsApp réservation : 06 66 60 17 59 (lien wa.me/33666601759).
Horaires : tous les jours 12h–00h (déjeuner 12h–13h30, dîner 19h–22h). Ticket moyen 12–25 €.

Règles :
- Réponds uniquement en français, phrases courtes, ton chaleureux.
- Ne propose JAMAIS un plat ou un prix qui n’est pas dans la carte ci-dessous.
- Pour une table, oriente vers le formulaire #reservation ou WhatsApp. Ce n’est pas une confirmation.
- Si on parle d’allergie, demande de le préciser sur WhatsApp.

CARTE
Bœuf : 5 brochettes de bœuf 15 € (180 g) · tendons sautés 12 € · tripes sautées 12 € · mafé 12 €.
Porc : porc braisé 12 € · porc sauté sauce tomate 15 € · mbongo 20 €.
Volaille : ailes 12 € · cuisses braisées 12 € · poulet DG 12 € · poulet yassa 12 €.
Spécialités : couscous gombo 15 € · gombo mixte 20 € · ndolé 15 € · ndolé mixte 20 € · ndolé Royale 25 € · eru 15 € · eru Royale 20 € · taro pilé 20 € (dimanche seulement).
Poissons : tilapia braisé 15 € · bar capitaine 20/25/30 € · maquereau 15/20/25 € · pépé soupe 20 €.
Traditionnels : tieb poulet 15 € · tieb poisson 15 €.
Boissons : softs 2 € · Red Bull 3 € · boissons africaines 60 cl 7 € · Heineken/1664 5 € (formule 12 €) · Leffe/Desperados/Kadji/Castel/Isenbeck/Mutzig/Ice/Booster 8 € · petite Guinness 5 € (formule 13 €) · grande Guinness 10 € · vins dès 15 € · whiskies dès 7 € · apéritifs 7 €.
Accompagnements inclus : manioc, aloko, chikwang, plantain vapeur, plantain vert à l’huile rouge, plantain tapée, riz parfumé, attiéké. Supplément 3 € : frites, chikwang, riz, attiéké, plantain tapée, couscous.`

const PROVIDERS = [
  {
    name: 'pollinations',
    url: 'https://text.pollinations.ai/openai',
    body: (messages) => ({ model: 'openai', messages, temperature: 0.4 }),
    headers: { 'Content-Type': 'application/json' },
  },
  {
    name: 'ovh',
    url: 'https://oai.endpoints.kepler.ai.cloud.ovh.net/v1/chat/completions',
    body: (messages) => ({
      model: 'gpt-oss-20b',
      messages,
      temperature: 0.4,
      max_tokens: 400,
    }),
    headers: { 'Content-Type': 'application/json' },
  },
]

async function complete(messages) {
  let lastError = 'Aucun modèle n’a répondu.'
  for (const provider of PROVIDERS) {
    try {
      const res = await fetch(provider.url, {
        method: 'POST',
        headers: provider.headers,
        body: JSON.stringify(provider.body(messages)),
        signal: AbortSignal.timeout(25000),
      })
      const raw = await res.text()
      if (!res.ok) {
        lastError = `${provider.name}: ${res.status}`
        continue
      }
      const data = JSON.parse(raw)
      const text = data.choices?.[0]?.message?.content?.trim()
      if (text) return { text, provider: provider.name }
      lastError = `${provider.name}: réponse vide`
    } catch (err) {
      lastError = `${provider.name}: ${err instanceof Error ? err.message : 'erreur'}`
    }
  }
  throw new Error(lastError)
}

export async function answerConcierge(body) {
  const incoming = Array.isArray(body?.messages) ? body.messages : []
  const history = incoming
    .filter((m) => (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-8)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }))
  if (!history.length || history[history.length - 1].role !== 'user') {
    return { status: 400, error: 'Message manquant' }
  }
  try {
    const { text, provider } = await complete([{ role: 'system', content: SYSTEM }, ...history])
    return { status: 200, reply: text, provider }
  } catch (err) {
    return {
      status: 502,
      error:
        'Le concierge IA est saturé pour le moment. Réessayez, ou réservez sur WhatsApp au 06 66 60 17 59.',
      detail: err instanceof Error ? err.message : '',
    }
  }
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (c) => {
      chunks.push(c)
      if (chunks.reduce((n, b) => n + b.length, 0) > 20_000) {
        reject(new Error('payload trop grand'))
      }
    })
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'))
      } catch {
        reject(new Error('JSON invalide'))
      }
    })
    req.on('error', reject)
  })
}

export async function handleConciergeHttp(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'POST uniquement' }))
    return
  }
  try {
    const result = await answerConcierge(await readJson(req))
    res.statusCode = result.status
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(result.status === 200 ? { reply: result.reply, provider: result.provider } : result))
  } catch {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify({ error: 'JSON invalide' }))
  }
}
