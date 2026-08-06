# Ibibanza API

Base URL: `/api/v1`

Admin endpoints require `x-admin-api-key`.

## Public

- `GET /health` - service health.
- `GET /plots` - published/reserved plots; seller phone is never returned.
- `GET /plots/:slug` - public plot detail; seller phone is never returned.
- `POST /seller-submissions` - seller submits land for review.
- `POST /buyers/alert-opt-in` - buyer opts into segmented WhatsApp alerts.
- `POST /plots/:plotId/interests` - buyer requests a visit/call for one plot.
- `POST /notifications/subscribe` - stores browser notification subscription.

## Admin

- `GET /admin/plots`
- `POST /admin/plots`
- `PATCH /admin/plots/:id/status`
- `GET /admin/leads`
- `PATCH /admin/leads/:id/status`
- `GET /admin/alerts`
- `POST /admin/alerts/draft-for-plot/:plotId`
- `GET /admin/alerts/:id`
- `POST /admin/alerts/:id/mark-sent`

## WhatsApp Alerts

WhatsApp is manual in MVP. The API creates alert drafts, matches only buyers with `consentWhatsapp = true`, and returns copyable phone/message data for the liaison.
