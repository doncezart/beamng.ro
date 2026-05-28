import type { BeamMPServer } from './types'

export function filterRoServers(servers: BeamMPServer[]): BeamMPServer[] {
  return servers.filter(s => s.location === 'RO')
}

export function paginateServers(
  servers: BeamMPServer[],
  page: number,
  pageSize: number
): BeamMPServer[] {
  const start = (page - 1) * pageSize
  return servers.slice(start, start + pageSize)
}

export function countryCodeToFlag(code: string): string {
  const upper = code.toUpperCase()
  if (upper.length !== 2) return '🏳'
  return upper.replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)))
}

/** Returns 'green' | 'orange' | 'red' based on player fill percentage. */
export function playerBadgeColor(
  players: string,
  maxplayers: string
): 'green' | 'orange' | 'red' {
  const count = parseInt(players, 10) || 0
  const max = parseInt(maxplayers, 10) || 0
  if (max <= 0) return 'green'
  if (count >= max) return 'red'
  if (count / max >= 0.8) return 'orange'
  return 'green'
}

export function truncateName(name: string, limit: number): string {
  if (name.length <= limit) return name
  return name.slice(0, limit) + '...'
}
