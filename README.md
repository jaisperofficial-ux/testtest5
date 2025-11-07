# AgentHub Mock (Next.js + Tailwind)

A ready-to-deploy mock of your AI workforce marketplace for SMBs.

## ✨ What’s inside
- Next.js 14 (App Router) + TypeScript
- TailwindCSS pre-configured
- Single-page mock UI at `/app/page.tsx`:
  - Marketplace, Team, Chat, Competitors, Trends, Calendar, Library

## 🚀 Run locally
```bash
npm i
npm run dev
# visit http://localhost:3000
```

## 🧭 Create GitHub repo (CLI)
```bash
# 1) init and commit
git init
git add .
git commit -m "feat: agenthub mock ui"

# 2) create a new repo on GitHub (replace ORG/REPO)
# If you use GitHub CLI:
gh repo create jaisperofficial-ux/agenthub-mock --public --source=. --remote=origin --push

# Or manually:
# - Create a new empty repo at https://github.com/new
# - Then add the remote and push:
# git remote add origin https://github.com/jaisperofficial-ux/agenthub-mock.git
# git branch -M main
# git push -u origin main
```

## ☁️ Deploy to Vercel
### Option A: GUI (recommended)
1. Go to https://vercel.com/new
2. Import **agenthub-mock** from GitHub
3. Framework preset: **Next.js**
4. Root directory: `/` (default)
5. No env vars needed
6. Click **Deploy**

### Option B: CLI
```bash
npm i -g vercel
vercel login
vercel link   # select this folder
vercel        # first deploy (preview)
vercel --prod # production
```

## 🧩 Customising
- Update the UI in `app/page.tsx`.
- Tailwind styles in `styles/globals.css` and `tailwind.config.ts`.
- Add pages/components under `app/`.

---
Made for Jaisper by ChatGPT.

## 🧯 If Vercel fails with `eslint` ERESOLVE
- Edit `package.json` and set:
  ```json
  "devDependencies": {
    "eslint": "8.57.0",
    "eslint-config-next": "14.2.5"
  }
  ```
- Commit and redeploy.
- Also make sure `vercel.json` does **not** contain a `builds` section.
