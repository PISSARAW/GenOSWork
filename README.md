# GenOS V3 — Runtime d'Orchestration Biologique

> Site public GenOS : runtime d'orchestration d'agents autonomes, inspiré des systèmes biologiques et du versionnement déterministe.

Ce dépôt contient le site public de GenOS V3, construit avec [Next.js](https://nextjs.org/) et [Tailwind CSS v4](https://tailwindcss.com/).

- **Landing** : `/` — présentation, 8 modes d'orchestration, architecture
- **Docs** : `/docs` — concepts, modes détaillés, architecture, roadmap
- **Features** : `/features` — caractéristiques par catégorie, comparaison
- **Pricing** : `/pricing` — communauté gratuite + enterprise

## Démarrage rapide

```bash
npm install
npm run dev
# → http://localhost:3000
```

```bash
npm run build
npm run start
# → build production + serveur statique
```

```bash
npm run lint
# → vérification ESLint
```

## Structure du site

```
GenoSWork/
├── app/
│   ├── layout.tsx          # Root layout (head, nav, footer)
│   ├── page.tsx            # Landing page
│   ├── docs.tsx            # Documentation page
│   ├── features.tsx        # Caractéristiques
│   ├── pricing.tsx         # Tarifs + FAQ
│   ├── globals.css         # Tailwind v4 + variables
│   └── favicon.ico
├── public/
│   ├── genos-logo.png      # Logo GenOS
│   ├── favicon.ico
│   └── ... (assets de base)
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

## Construit avec

- **Next.js 16.3.4** — framework React, SSR/SSG
- **React 19.2.8** — UI components
- **Tailwind CSS 4.x** — utility-first CSS
- **TypeScript 5.x** — typage strict
- **ESLint 9** — linting moderne avec `eslint-config-next`

## Gradients et palette

- Primaire : `#5b4fcf` → `#3d33a0`
- Secondaire : `#3b82f6` → `#1d4ed8`
- Succès : `#10b981` → `#047857`
- Alerte : `#ef4444` → `#b91c1c`
- Accent : `#f59e0b` → `#d97706`
- Violet : `#8b5cf6` → `#6d28d9`
- Rose : `#ec4899` → `#db2777`
- Teal : `#14b8a6` → `#0f766e`

## Liens

- **Site public** : https://genoswork.vercel.app
- **Repo GenOS (backend + code)** : https://github.com/PISSARAW/GenOS
- **Documentation officielle** : https://github.com/PISSARAW/GenOS/tree/main/docs
- **Démo** : `examples/safe-debugging-demo` (zéro token)

## Contribuer

1. Forkez ce dépôt
2. Créez votre branche (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'feat: add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Licence

Projet open-source sous licence [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Voir le fichier LICENSE dans le dépôt principal GenOS.

---

*GenOS — parce que l'agentic computation mérite un runtime qui croit aux snapshots plus qu'au succès.*
