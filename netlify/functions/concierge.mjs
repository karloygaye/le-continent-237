import { answerConcierge } from '../../server/concierge-core.js'

export const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, body: '' }
  }
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'POST uniquement' }),
    }
  }
  try {
    const result = await answerConcierge(JSON.parse(event.body || '{}'))
    const payload =
      result.status === 200
        ? { reply: result.reply, provider: result.provider }
        : { error: result.error, detail: result.detail }
    return {
      statusCode: result.status,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    }
  } catch {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'JSON invalide' }),
    }
  }
}
