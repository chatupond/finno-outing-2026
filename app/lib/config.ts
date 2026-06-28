export const ALLOWED_DOMAINS = ["finnomena.com", "gmail.com"]

export function isAllowedEmail(email: string) {
  const lower = email.toLowerCase()
  return ALLOWED_DOMAINS.some((domain) => lower.endsWith(`@${domain}`))
}
