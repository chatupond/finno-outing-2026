---
name: deploy
description: Deploy the finno-outing-2026 website to Google Cloud Run (production). Use when the user asks to deploy, redeploy, release, publish, or put changes live on the website.
---

# Deploy finno-outing-2026 to Cloud Run

The site runs on **Google Cloud Run** and is built from the repo's `Dockerfile` (Next.js `output: "standalone"`, port 8080).

| | |
|---|---|
| GCP project | `chatupond-prod` (project number `75933842996`) |
| Service | `finno-outing-2026` |
| Region | `asia-southeast1` |
| Public URL | https://finno-outing-2026-75933842996.asia-southeast1.run.app (also https://finno-outing-2026-g7sglmivja-as.a.run.app — same service) |
| Image repo | `asia-southeast1-docker.pkg.dev/chatupond-prod/cloud-run-source-deploy/finno-outing-2026` |

Deploying is outward-facing: confirm with the user before running the deploy command unless they explicitly asked to deploy.

## Steps

1. **Check what will ship.** The deploy uploads the *local working directory*, not a git ref, so uncommitted changes go live too.
   ```bash
   git status --short
   ```
   Mention any uncommitted changes to the user (and offer to commit/push afterwards so GitHub `main` matches production).

2. **Make sure it builds.**
   ```bash
   npx tsc --noEmit -p . && npx next build
   ```
   Fix any errors before deploying. (Pre-existing lint warnings in `Navbar.tsx`, `RegistrationModal.tsx`, `TypingText.tsx` are known and don't block the build.)

3. **Deploy** (builds the Dockerfile with Cloud Build, creates a new revision, sends 100% traffic to it — takes ~3–5 minutes):
   ```bash
   gcloud run deploy finno-outing-2026 --source . --region asia-southeast1 --project chatupond-prod --quiet
   ```
   - Uploads are filtered by `.gitignore` (there is no `.gcloudignore`), so `.env*`, `node_modules` and `.next` are **not** uploaded.
   - Environment variables are already configured on the service and are kept across deploys — don't pass `--set-env-vars` unless changing them:
     `AUTH_SECRET`, `AUTH_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_SHEET_ID` (plain) and `GOOGLE_PRIVATE_KEY` (Secret Manager).
   - Run it with a long timeout (≥ 10 min).

4. **Verify** the live site:
   ```bash
   U=https://finno-outing-2026-75933842996.asia-southeast1.run.app
   curl -s -o /dev/null -w "%{http_code}\n" $U/
   curl -s -o /dev/null -w "%{http_code}\n" $U/images/<a-new-image>.jpg
   ```
   Car Arrangements and Bedroom sections only render for signed-in users, so ask the user to check those in the browser.

5. **Report** the new revision name from the deploy output and the previous one (for rollback).

## Rollback

List revisions and send all traffic back to a previous one:
```bash
gcloud run revisions list --service finno-outing-2026 --region asia-southeast1 --project chatupond-prod
gcloud run services update-traffic finno-outing-2026 --to-revisions <REVISION>=100 --region asia-southeast1 --project chatupond-prod
```
Or in the Cloud Run console → service → **Revisions** tab.

## Gotchas

- **Replacing an image in place doesn't show up.** `next/image` caches optimized images per URL (default 4 h) and browsers cache them too. When swapping an image, save it under a **new filename** and update the reference, instead of overwriting the old file.
- After deploying CSS changes, a hard refresh (Cmd+Shift+R) may be needed to see them.
- The README mentions Vercel, but production is Cloud Run — use this skill.
