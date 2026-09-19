# Le Continent 237

Site du restaurant **Le Continent 237 — Chez Fefe**, 18 Grande Rue, 91260 Juvisy-sur-Orge.

WhatsApp : **+33 6 66 60 17 59**. Concierge IA gratuit (modèle gpt-oss). Nom de domaine prévu : **[lecontinent237.fr](https://lecontinent237.fr)**.

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrez [http://127.0.0.1:43141](http://127.0.0.1:43141).

## Mettre en ligne (lecontinent237.fr)

Le nom **lecontinent237.fr** est encore libre (AFNIC). Un `.fr` se réserve chez un bureau d’enregistrement français (OVH, Gandi, IONOS) : il faut une identité (personne en France/UE ou société). Comptez environ 8–15 € / an. Personne ici ne peut l’acheter à votre place.

### 1. Hébergement gratuit (Netlify) — recommandé

1. Créez un compte sur [netlify.com](https://www.netlify.com).
2. **Add new site → Import an existing project** (ce dépôt Git), ou **Deploy manually** après `npm run build` (dossier `dist`).
3. Build : `npm run build` · publish : `dist`.
4. Site settings → **Domain management** → **Add custom domain** : `lecontinent237.fr` et `www.lecontinent237.fr`.
5. Chez OVH (ou le registrar), dans la zone DNS du nom :
   - `www` → CNAME vers `votre-site.netlify.app`
   - apex `lecontinent237.fr` → suivez les enregistrements ALIAS / A que Netlify affiche (souvent `75.2.60.5`)
6. Attendez le certificat HTTPS (quelques minutes). Le site et le concierge IA (`/api/concierge`) fonctionnent ensemble.

### 2. Autre hébergement (VPS / Render)

```bash
npm install
npm run build
npm start
```

Le serveur écoute sur le port `PORT` (défaut 43141) et sert le site + l’IA. Pointez ensuite le DNS du `.fr` vers l’IP ou le hostname fourni.
