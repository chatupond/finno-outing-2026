# Finnomena Tech Outing 2026

Landing page for the Finnomena Tech team outing event — 16–17 October 2026 at Heaven Kwai Resort, Kanchanaburi.

## Tech Stack

- **Next.js 16** (App Router, Server Components)
- **TypeScript**
- **Tailwind CSS v4**
- **NextAuth.js v5** (Auth.js) — Google OAuth
- **Google Sheets API** — attendee registration & display

## Project Structure

```
app/
├── layout.tsx              # Root layout with metadata & SessionProvider
├── page.tsx                # Main page (assembles all sections)
├── globals.css             # Tailwind imports & custom theme
├── favicon.ico
├── _components/
│   ├── Navbar.tsx          # Sticky navigation (Client Component)
│   ├── HeroSection.tsx     # Hero with CTA buttons
│   ├── AccommodationSection.tsx  # Resort overview
│   ├── ActivitiesSection.tsx     # Activity gallery
│   ├── RoomsSection.tsx          # Room image grid
│   ├── RegistrationSection.tsx   # Google OAuth + team form (Client)
│   ├── AttendeesSection.tsx      # Live attendee list (Server async)
│   └── SessionProvider.tsx       # Client wrapper for NextAuth
├── api/auth/[...nextauth]/
│   └── route.ts            # NextAuth route handler
├── actions/
│   └── register.ts         # Server Action: register attendee
└── lib/
    ├── sheets.ts            # Google Sheets read/write
auth.ts                     # NextAuth configuration
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in the values:

```env
# Google OAuth — from Google Cloud Console > APIs & Services > Credentials
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# NextAuth secret — generate with: openssl rand -base64 32
AUTH_SECRET=your_random_secret

# Google Sheets service account (for reading/writing registrations)
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"

# Google Sheet ID (from the sheet URL)
GOOGLE_SHEET_ID=1M4ILdv340WuB3BnIRXxSpB8jBx-IvFjyGvrTmOJIJR0
```

### 3. Google Cloud Setup

#### Google OAuth (for user sign-in)

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create or select a project
3. Enable the **Google People API**
4. Go to **APIs & Services > Credentials**
5. Create an **OAuth 2.0 Client ID** (Web application)
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (development)
   - `https://yourdomain.com/api/auth/callback/google` (production)
7. Copy **Client ID** and **Client Secret** to `.env.local`

#### Google Sheets (for attendee data)

1. In the same project, enable the **Google Sheets API**
2. Go to **IAM & Admin > Service Accounts**
3. Create a new service account
4. Download the JSON key file
5. From the JSON, copy:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY` (keep the `\n` newlines as-is)
6. Share your Google Sheet with the service account email (Editor access)
7. Make sure the sheet has a tab named **Attendees**

The Attendees tab columns (auto-populated):
| A: Timestamp | B: Name | C: Email | D: Team | E: Profile Image URL |

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel

Connect your GitHub repository to Vercel and add all environment variables in the Vercel dashboard under **Settings > Environment Variables**.

For `GOOGLE_PRIVATE_KEY`, paste the full key including `-----BEGIN...-----END-----` with literal `\n` newlines (not actual newlines).

## Features

| Section | Description |
|---------|-------------|
| **Hero** | Full-screen event intro with CTAs |
| **Accommodation** | Heaven Kwai Resort overview & images |
| **Activities** | Water, adventure, outdoor, relaxation & group |
| **Rooms** | Responsive image gallery |
| **Registration** | Google sign-in + team selection form |
| **Attendees** | Live list grouped by team (SSR + revalidation) |

## Color Design System

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#f2f93c` | Accent, buttons, highlights |
| `secondary` | `#01172b` | Dark backgrounds, text |
| Text (light bg) | `#333333` | Body copy on white sections |
| Text (dark bg) | `#ffffff` | Text on dark sections |
