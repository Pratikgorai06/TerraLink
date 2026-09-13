# BhoomiSetu — Next.js MVP

A hackathon-ready UI implementation of the BhoomiSetu architecture shown in the supplied concept: role-based command center, acquisition workflow, SLA/risk alerts, GIS parcel dashboard, MIS table, and Firebase-ready persistence.

## Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The demo token is loaded from `.env`:

```env
NEXT_PUBLIC_DEMO_TOKEN=bhoomisetu-demo-token-2026
```

## Firebase

The app is wired for Firestore in `lib/firebase/client.ts` and `lib/firebase/projects.ts`. Fill the `NEXT_PUBLIC_FIREBASE_*` variables in `.env` with your Firebase Web App config. With the placeholder config, the UI uses deterministic demo data so the frontend still runs immediately.

Recommended Firestore collection:

- `projects/{projectId}` — same fields as `types/index.ts`
- `auditEvents/{eventId}` — workflow/audit events

For production, replace the demo token with Firebase Auth / OAuth2 and enforce RBAC in Firebase Security Rules and/or a trusted backend.

## Architecture mapping

- Next.js App Router → role-scoped frontend
- Firebase Firestore → structured project/workflow data
- Firebase Storage → document repository can be added next
- Demo token in `.env` → temporary auth placeholder
- GIS component → PostGIS/ULPIN-ready visual layer; current map is intentionally dependency-free for the MVP
- Workflow component → Proposal → District Scrutiny → State Approval → Central Concurrence → Notification → Award → Compensation → Payment → Possession → R&R → Completed
- Alerts → SLA + predictive-risk presentation layer
