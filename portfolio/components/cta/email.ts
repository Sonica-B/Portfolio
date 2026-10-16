/** The address split at the "@" so the joined string never appears in server-rendered HTML. */
export type EmailParts = readonly [string, string]

/** "mailto:name@host" -> ["name", "@host"]. Plain module so server components can call it. */
export function splitEmail(mailto: string): EmailParts {
  const address = mailto.replace(/^mailto:/i, '').trim()
  const at = address.indexOf('@')
  return at < 0 ? [address, ''] : [address.slice(0, at), address.slice(at)]
}
