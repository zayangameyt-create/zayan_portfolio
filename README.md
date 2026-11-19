# Sanjeev portfolio

A responsive React portfolio and a small Express API for contact submissions. The frontend uses React Router, Tailwind CSS, Framer Motion, Lucide React, Sonner, and Zod. Contact messages are validated on both sides, stored in MongoDB, and sent to the configured inbox with Resend or SMTP. A small guided chat assistant answers common questions about the portfolio, services, projects, skills, and contact options.

## Local setup

Requirements: Node.js 20.19 or newer and MongoDB. Contact mail can use Resend with a verified sender domain or SMTP with a supported mailbox.

1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` and `SUPPORT_EMAIL` (the inbox that should receive contact messages). Keep mail credentials in the server environment only.
2. Choose one mail provider with `EMAIL_PROVIDER`. For Resend, set `RESEND_API_KEY` and `EMAIL_FROM` to a sender on a verified domain. If you do not own a domain, use SMTP instead: set `EMAIL_PROVIDER=smtp`, `SMTP_USER`, and `SMTP_PASS` to a Gmail address and Google App Password, with the provided Gmail host and port settings. The sender defaults to `SMTP_USER` unless `SMTP_FROM` is set.
3. In `server/`, run `npm ci`, then `npm run dev`. The API listens on `http://localhost:5000` by default.
4. In `client/`, run `npm ci`, then `npm run dev`. Vite serves the site at `http://localhost:5173` and proxies `/api` requests to the local server.

For a deployed frontend and API on separate origins, set `VITE_API_URL` in the frontend build environment to the API origin (without a trailing slash), and set `FRONTEND_ORIGIN` on the API to the exact frontend origin. For a same-origin deployment, route `/api` to the API and leave `VITE_API_URL` empty.

## Configuration

`server/.env.example` documents the server settings:

- `MONGODB_URI`: MongoDB connection URI.
- `FRONTEND_ORIGIN`: the one allowed browser origin for CORS.
- `EMAIL_PROVIDER`: `resend` (default) or `smtp`.
- `RESEND_API_KEY`: private Resend API key, required when `EMAIL_PROVIDER=resend`.
- `EMAIL_FROM`: sender address. For normal delivery, use an address from a domain verified in Resend, such as `Portfolio <no-reply@your-domain.com>`.
- `SUPPORT_EMAIL`: recipient inbox (or comma-separated inboxes) for contact form submissions. Display-name addresses such as `Support <inbox@example.com>` are accepted.
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`: SMTP settings, required when `EMAIL_PROVIDER=smtp`. For Gmail, use `smtp.gmail.com:465` with TLS and a Google App Password; the account must allow app passwords.
- `PORT` and `NODE_ENV`: API runtime settings.

The API validates configuration at startup and exits if required values are missing or invalid. The contact endpoint persists a message before sending email. Resend requires a verified sender domain for regular production sending; if you do not have a domain, configure SMTP with a mailbox you control. Resend's shared `onboarding@resend.dev` sender remains a testing option. If delivery fails after storage, the API returns `notificationSent: false` and the frontend tells the visitor to follow up by email. See [Resend's Node.js guide](https://resend.com/nodejs/), [Resend domain verification guidance](https://resend.com/changelog/domain-verification-events), [Google App Password setup](https://support.google.com/accounts/answer/185833), and [Nodemailer's Gmail guide](https://nodemailer.com/guides/using-gmail).

## API

- `GET /api/health` reports API and MongoDB readiness without exposing connection details.
- `POST /api/contact` accepts `{ "name": "...", "email": "...", "message": "..." }`. Invalid fields receive a `400`; successful storage and email receive `201`; a saved message whose email notification failed receives `202`.

Requests are size-limited, rate-limited, CORS-restricted, and protected with Helmet security headers. There are no account, protected-content, or file-upload features in the existing portfolio, so the API does not expose unused authentication or upload endpoints.

## Commands

Run frontend commands from `client/`:

- `npm run dev` starts Vite.
- `npm run build` creates the production bundle.
- `npm run lint` runs ESLint.
- `npm run preview` serves the built frontend locally.

Run API commands from `server/`:

- `npm run dev` starts the API with Nodemon.
- `npm start` starts the API in production mode.
