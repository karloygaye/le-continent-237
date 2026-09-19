import { handleConciergeHttp } from './concierge-core.js'

export function conciergePlugin() {
  return {
    name: 'continent-concierge',
    configureServer(server) {
      server.middlewares.use('/api/concierge', handleConciergeHttp)
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/concierge', handleConciergeHttp)
    },
  }
}
