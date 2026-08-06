# Ibibanza MVP Security Notes

- Public plot APIs must not expose seller phone numbers.
- Admin APIs are protected with `x-admin-api-key`.
- CORS is restricted to `WEB_ORIGIN`.
- Public forms are validated server-side with shared Zod schemas.
- WhatsApp alert drafts require explicit WhatsApp consent.
- Payments, land transfer, notary, and government-service actions are outside this MVP.
