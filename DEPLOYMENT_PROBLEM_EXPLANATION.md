# GitHub Pages Deployment Problem - Detailed Explanation

## Current Error
```
GET https://yashkumarsahu789.github.io/src/main.tsx net::ERR_ABORTED 404 (Not Found)
```

The website loads a blank page with only `<div id="root"></div>` and fails to load the JavaScript.

---

## Root Cause Analysis

### The Problem
GitHub Pages is serving the **ROOT `index.html`** file instead of the **BUILT `dist/index.html`** file.

### File Comparison

**Root index.html (WRONG - currently being served):**
```html
<script type="module" src="/src/main.tsx"></script>
```
- This points to the SOURCE FILE `src/main.tsx` which doesn't exist on the deployed site
- This file is meant for development, NOT production deployment

**dist/index.html (CORRECT - should be served):**
```html
<script type="module" crossorigin src="/subscription-tracker/assets/index-BG46orYS.js"></script>
<link rel="stylesheet" crossorigin href="/subscription-tracker/assets/index-DehIu4Hj.css">
```
- This points to the BUNDLED, BUILT JavaScript and CSS files
- All assets are properly prefixed with `/subscription-tracker/` base path
- This is the production-ready file created by Vite build process

---

## Why This Happens

**GitHub Pages Configuration Issue:**
- GitHub Pages is currently set to deploy from: **"Deploy from a branch" → main branch root**
- This means it serves files directly from the repository root
- The repository root contains the SOURCE `index.html` with `/src/main.tsx` reference
- The BUILT files in the `dist/` folder are being IGNORED

**What Should Happen:**
- GitHub Pages should use **"GitHub Actions"** as the source
- The workflow `.github/workflows/deploy.yml` builds the project (`npm run build`)
- It uploads ONLY the `dist/` folder contents to GitHub Pages
- GitHub Pages serves the built `dist/index.html` with proper asset paths

---

## Project Structure
```
subscription-tracker-web-app/
├── index.html                          ← SOURCE file (for dev) - WRONG for production
├── src/
│   └── main.tsx                        ← Source TypeScript (doesn't exist after build)
├── dist/                               ← BUILT files (production-ready)
│   ├── index.html                      ← Built HTML with bundled JS/CSS references
│   └── assets/
│       ├── index-BG46orYS.js          ← Bundled JavaScript
│       └── index-DehIu4Hj.css         ← Bundled CSS
└── .github/workflows/
    └── deploy.yml                      ← GitHub Actions workflow to deploy dist/
```

---

## Current Configuration

### Vite Config (vite.config.ts) - CORRECT ✓
```typescript
export default defineConfig({
  base: '/subscription-tracker/',  // Correct base path for GitHub Pages subdirectory
  plugins: [react(), tailwindcss()],
  ...
});
```

### GitHub Actions Workflow (.github/workflows/deploy.yml) - CORRECT ✓
```yaml
- name: Build project
  run: npm run build                    # Builds to dist/

- name: Upload artifact to GitHub Pages
  uses: actions/upload-pages-artifact@v3
  with:
    path: './dist'                      # Uploads ONLY dist/ folder ✓

- name: Deploy to GitHub Pages
  uses: actions/deploy-pages@v4
```

### GitHub Pages Settings - INCORRECT ✗
**Current:** Deploy from a branch → main → / (root)
**Should be:** GitHub Actions

---

## The Solution

### Step 1: Change GitHub Pages Source (CRITICAL)
1. Go to: https://github.com/yashkumarsahu789/subscription-tracker/settings/pages
2. Under **"Build and deployment"** section
3. Change **"Source"** from **"Deploy from a branch"** to **"GitHub Actions"**
4. Save the change

### Step 2: Trigger Deployment
The workflow will automatically run on next push, OR manually trigger it:
1. Go to: https://github.com/yashkumarsahu789/subscription-tracker/actions
2. Click on "Build and Deploy to GitHub Pages" workflow
3. Click "Run workflow" → Run workflow

### Step 3: Verify
After workflow completes (1-2 minutes):
- Visit: https://yashkumarsahu789.github.io/subscription-tracker/
- Open browser DevTools → Network tab
- Verify these load successfully:
  - `/subscription-tracker/assets/index-BG46orYS.js` (200 OK)
  - `/subscription-tracker/assets/index-DehIu4Hj.css` (200 OK)
- NO MORE 404 for `/src/main.tsx`

---

## Why This Wasn't Working Before

**Multiple failed attempts to fix:**
1. ✗ Updated root `index.html` asset paths → Still serving wrong file
2. ✗ Rebuilt project multiple times → Build was correct, deployment source was wrong
3. ✗ Fixed Vite base path → Already correct, not the issue
4. ✗ Pushed all files → Pushed to correct place, but GitHub Pages was reading from wrong location

**The ONE thing that was never changed:**
- GitHub Pages **Source** setting was ALWAYS set to "Deploy from a branch"
- This meant GitHub Pages IGNORED the workflow and IGNORED the dist/ folder
- It kept serving the root index.html with the broken `/src/main.tsx` reference

---

## Alternative Solution (If GitHub Actions Source Doesn't Work)

If you cannot change to GitHub Actions source, manually deploy the dist/ folder to a separate branch:

```bash
# Build the project
npm run build

# Create and deploy to gh-pages branch
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to gh-pages"
git push -f origin gh-pages
```

Then set GitHub Pages to deploy from `gh-pages` branch → / (root).

---

## Verification Checklist

After fixing, verify:
- [ ] No 404 error for `/src/main.tsx`
- [ ] JavaScript bundle loads: `/subscription-tracker/assets/index-*.js`
- [ ] CSS loads: `/subscription-tracker/assets/index-*.css`
- [ ] UI renders (not blank page)
- [ ] Logo and favicon load from `/subscription-tracker/logo.svg`
- [ ] React app initializes and displays content

---

## Technical Details

**Build Process:**
1. Vite reads `src/main.tsx` and all React components
2. Bundles, minifies, and optimizes all code
3. Outputs bundled JS/CSS to `dist/assets/`
4. Generates `dist/index.html` with references to bundled assets
5. All asset paths use the base `/subscription-tracker/` prefix

**Deployment Process (Should be):**
1. GitHub Actions workflow runs on push to main
2. Installs dependencies (`npm ci`)
3. Builds project (`npm run build`)
4. Uploads `dist/` folder to GitHub Pages
5. GitHub Pages serves ONLY the `dist/` folder contents

**Current Broken Process:**
1. GitHub Pages ignores the workflow
2. Serves files directly from main branch root
3. Serves root `index.html` (not `dist/index.html`)
4. Browser tries to load `/src/main.tsx` → 404
5. Blank page with no JavaScript

---

## Summary for LLM

**Problem:** GitHub Pages serves root `index.html` (references `/src/main.tsx`) instead of `dist/index.html` (references bundled JS).

**Root Cause:** GitHub Pages "Source" is set to "Deploy from a branch" instead of "GitHub Actions".

**Fix:** Change GitHub Pages Settings → Build and deployment → Source → Select "GitHub Actions".

**Repository:** https://github.com/yashkumarsahu789/subscription-tracker
