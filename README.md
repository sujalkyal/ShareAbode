
# Share Abode

>A modern home-sharing platform built with Next.js, Prisma, and PostgreSQL.

## Features

- Browse, add, and book homes
- User authentication (sign up, sign in) via NextAuth.js
- Profile management
- City and state selection (JSON data)
- Secure file uploads via EdgeStore
- Responsive UI with TailwindCSS

## Tech Stack

- **Frontend**: Next.js (App Router), React 19, TailwindCSS, Framer Motion, Lucide Icons, React Datepicker, React Toastify
- **Backend**: Next.js API routes, Prisma ORM, PostgreSQL (Neon)
- **Authentication**: NextAuth.js
- **File Storage**: EdgeStore

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env.local` and `.env`:
   - `DATABASE_URL` (PostgreSQL connection string)
   - `EDGE_STORE_ACCESS_KEY`, `EDGE_STORE_SECRET_KEY`
   - `NEXTAUTH_SECRET`, `NEXTAUTH_URL`
   - `NEXT_PUBLIC_BACKEND_URL`
4. Run database migrations and seed data:
   ```bash
   npx prisma migrate dev
   npm run seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure

- `app/` - Main app pages and layouts
- `components/` - Reusable React components
- `lib/` - Utility libraries (auth, db, edgestore)
- `data/` - Static data (states and cities)
- `prisma/` - Prisma schema, migrations, and seed script
- `public/` - Static assets

## Prisma & Database

- Database schema is managed via Prisma (`prisma/schema.prisma`)
- Migrations are stored in `prisma/migrations/`
- Seed script: `prisma/seed.js`

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js. Ensure environment variables are set in your deployment environment.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)

---

© 2025 Share Abode. All rights reserved.
