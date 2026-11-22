# Sanjeev portfolio

A responsive React portfolio and Express contact API. The frontend uses React Router, Tailwind CSS, Framer Motion, Lucide React, Sonner, and Zod. Contact messages are validated on both sides, stored in MongoDB, and emailed through Resend (or optional SMTP). A small guided chat assistant answers common questions about the portfolio, services, projects, skills, and contact options.

## Local setup

Requirements: Node.js 20.19 or newer and MongoDB.

1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
2. Add your private Resend key to `RESEND_API_KEY` in `server/.env`. Keep it on the server; never add it to `client/.env` or frontend code.
3. The supplied `EMAIL_FROM` uses Resend's shared `onboarding@resend.dev` sender for testing. Resend limits this sender to the email address verified on your Resend account, so set `CONTACT_TO_EMAIL` to that verified address. To deliver to other addresses, verify a domain in Resend and use a sender from that domain.
4. In `server/`, run `npm ci`, then `npm run dev`. The API listens on `http://localhost:5000` by default.
5. In `client/`, run `npm ci`, then `npm run dev`. Vite serves the site at `http://localhost:5173` and proxies `/api` requests to the local server.

For a deployed frontend and API on separate origins, set `VITE_API_URL` in the frontend build environment to the API origin (without a trailing slash), and set `FRONTEND_ORIGIN` on the API to the exact frontend origin. For a same-origin deployment, route `/api` to the API and leave `VITE_API_URL` empty.

For the Zayan IT Hub deployment, use:

- Frontend: `https://zayanithub.site`
- API: `https://zayan-portfolio-0e4g.onrender.com`
- Vercel `VITE_API_URL`: `https://zayan-portfolio-0e4g.onrender.com`
- Render `FRONTEND_ORIGIN`: `https://zayanithub.site,https://www.zayanithub.site`

## Configuration

`server/.env.example` documents the server settings:

- `MONGODB_URI`: MongoDB connection URI.
- `FRONTEND_ORIGIN`: the one allowed browser origin for CORS.
- `EMAIL_PROVIDER`: `resend` (default) or `smtp`.
- `RESEND_API_KEY`: private Resend API key, required when `EMAIL_PROVIDER=resend`.
- `EMAIL_FROM`: Resend sender, either the shared onboarding sender for testing or an address on a verified domain.
- `CONTACT_TO_EMAIL`: preferred contact form recipient (or comma-separated inboxes).
- `SUPPORT_EMAIL`: fallback recipient when `CONTACT_TO_EMAIL` is omitted. Display-name addresses such as `Support <inbox@example.com>` are accepted.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: optional SMTP settings. For Gmail, use `smtp.gmail.com:465` with TLS and a Google App Password.
- `PORT` and `NODE_ENV`: API runtime settings.

The API validates configuration at startup and exits if required values are missing or invalid. The contact endpoint persists a message before sending email. If the email notification fails after storage, the API returns `notificationSent: false` and the frontend asks the visitor to follow up by email. See [Resend's Node.js guide](https://resend.com/nodejs/), [Resend domain verification guidance](https://resend.com/changelog/domain-verification-events), [Google App Password setup](https://support.google.com/accounts/answer/185833), and [Nodemailer's Gmail guide](https://nodemailer.com/guides/using-gmail).

## API

- `GET /api/health` reports API and MongoDB readiness without exposing connection details.
- `POST /api/contact` accepts `{ "name": "...", "email": "...", "message": "..." }`. Invalid fields receive a `400`; successful storage and email receive `201`; a saved message whose email notification failed receives `202`.

Requests are size-limited, rate-limited, CORS-restricted, and protected with Helmet security headers. There are no account, protected-content, or file-upload features in this portfolio, so the API does not expose unused authentication or upload endpoints.

## Commands

Run frontend commands from `client/`:

- `npm run dev` starts Vite.
- `npm run build` creates the production bundle.
- `npm run lint` runs ESLint.
- `npm run preview` serves the built frontend locally.

Run API commands from `server/`:

- `npm run dev` starts the API with Nodemon.
- `npm start` starts the API in production mode.
