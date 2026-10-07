/** Registration deadline has passed — no new sign-ups, but logged-in users can still view trip data */
export const REGISTRATION_CLOSED = true

export const ALLOWED_DOMAINS = ["finnomena.com", "fint.finance"]

export const ALLOWED_EMAILS = ["chatupond.b@gmail.com"]

export function isAllowedEmail(email: string) {
  const lower = email.toLowerCase()
  return (
    ALLOWED_DOMAINS.some((domain) => lower.endsWith(`@${domain}`)) ||
    ALLOWED_EMAILS.includes(lower)
  )
}
