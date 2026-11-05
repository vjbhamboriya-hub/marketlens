# MarketLens

Independent Amazon product-research workspace. This repository is a fresh, open-source starter. It runs locally in demo mode without API keys or paid AI services.

## Included now
- Responsive product research dashboard
- Marketplace switcher (US, UK, CA, IN)
- Search and category filtering
- Demo product catalogue with explicit demo provenance
- Profit, margin, ROI, break-even ACOS and monthly profit calculator
- Heuristic keyword expansion (not live Amazon search volume)
- Manual competitor watchlist
- Saved products in browser local storage
- CSV exports
- Supabase client wiring and initial RLS schema

## Run locally
Requirements: Node.js 20+ and npm.

```bash
npm install
npm run dev
```
Open the local URL printed by Vite. The app works in demo mode without a Supabase project.

## Connect Supabase (free tier)
1. Create a Supabase project at https://supabase.com.
2. Open SQL Editor and run `supabase/schema.sql`.
3. Copy `.env.example` to `.env`.
4. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from Project Settings → API.
5. Restart the dev server.

Never put the Supabase service-role key or marketplace provider secrets in any `VITE_` variable. Those are public browser values.

## Admin bootstrap
The UI intentionally does not create a default admin or shared password. Create your owner user through Supabase Auth, then promote only that exact account from the Supabase SQL Editor using:
```sql
update public.profiles set role='admin' where email='YOUR_OWNER_EMAIL';
```
Run this only as the project owner in the trusted Supabase SQL editor. Do not expose profile role updates to normal users. A production admin panel/server authorization layer still needs to be implemented before opening admin features to other users.

## Deploy online without a paid AI builder
1. Push this folder to a private GitHub repository.
2. Create a Cloudflare Pages project and connect the repository.
3. Build command: `npm run build`
4. Build output directory: `dist`
5. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as Pages environment variables.
6. Add your custom domain in Cloudflare when ready.

Free plans have usage limits and terms that can change. Check current provider pricing before relying on a free tier for production.

## Data provenance
DEMO product metrics are illustrative and are not actual Amazon sales, revenue or rank. Keyword ideas are simple heuristic expansions and are not live search-volume data. Competitor records are manual. For real marketplace intelligence, integrate a licensed provider or Amazon's authorized APIs from a server-side function. Provider credentials must remain server-side.

## Roadmap / production gaps
- Persist saved products, keywords and competitors to Supabase (the SQL tables are provided; demo UI currently uses browser storage).
- Add server-verified admin routes and admin-only user management.
- Add a licensed data provider adapter with server-side secret storage.
- Add import CSV validation, tests, monitoring, rate limits and production security review.
- Add password reset and email-confirmation UX.
