import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'
import { handleConciergeHttp } from './concierge-core.js'

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist')
const PORT = Number(process.env.PORT || 43141)
const HOST = process.env.HOST || '0.0.0.0'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
}

async function sendFile(res, filePath) {
  const data = await readFile(filePath)
  res.statusCode = 200
  res.setHeader('Content-Type', MIME[extname(filePath).toLowerCase()] || 'application/octet-stream')
  res.setHeader('Cache-Control', extname(filePath) === '.html' ? 'no-cache' : 'public, max-age=86400')
  res.end(data)
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  if (url.pathname === '/api/concierge') {
    await handleConciergeHttp(req, res)
    return
  }
  try {
    let rel = decodeURIComponent(url.pathname)
    if (rel === '/') rel = '/index.html'
    const filePath = join(ROOT, normalize(rel).replace(/^(\.\.[/\\])+/, ''))
    if (!filePath.startsWith(ROOT)) {
      res.statusCode = 403
      res.end()
      return
    }
    const info = await stat(filePath)
    if (info.isDirectory()) {
      await sendFile(res, join(filePath, 'index.html'))
      return
    }
    await sendFile(res, filePath)
  } catch {
    try {
      await sendFile(res, join(ROOT, 'index.html'))
    } catch {
      res.statusCode = 404
      res.end('Not found')
    }
  }
})

server.listen(PORT, HOST, () => {
  console.log(`Le Continent 237 — http://${HOST}:${PORT}  (domaine cible : lecontinent237.fr)`)
})
