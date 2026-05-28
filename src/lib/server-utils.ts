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

/** Strip BeamMP color/style codes (^X sequences) from server names. */
export function stripBeamMPCodes(name: string): string {
  return name.replace(/\^./g, '').trim()
}

/** Servers with RO location OR "Romania"/"România" in the name. */
export function filterRomanianServers(servers: BeamMPServer[]): BeamMPServer[] {
  return servers.filter(
    s => s.location === 'RO' || /romani[ae]/i.test(s.sname)
  )
}

export interface NameSegment {
  text: string
  color?: string
  bold?: boolean
}

const BEAMMP_COLORS: Record<string, string> = {
  '0': '#000000', '1': '#0000AA', '2': '#00AA00', '3': '#00AAAA',
  '4': '#AA0000', '5': '#AA00AA', '6': '#FFAA00', '7': '#AAAAAA',
  '8': '#555555', '9': '#5555FF', 'a': '#55FF55', 'b': '#55FFFF',
  'c': '#FF5555', 'd': '#FF55FF', 'e': '#FFFF55', 'f': '#FFFFFF',
}

/** Parse BeamMP ^X color/style codes into renderable segments. */
export function parseBeamMPName(name: string): NameSegment[] {
  const segments: NameSegment[] = []
  let color: string | undefined
  let bold = false
  let current = ''

  for (let i = 0; i < name.length; i++) {
    if (name[i] === '^' && i + 1 < name.length) {
      const code = name[i + 1].toLowerCase()
      if (current) {
        segments.push({ text: current, color, bold })
        current = ''
      }
      if (code in BEAMMP_COLORS) {
        color = BEAMMP_COLORS[code]
        bold = false
      } else if (code === 'l') {
        bold = true
      } else if (code === 'r' || code === 'n') {
        color = undefined
        bold = false
      }
      i++ // skip the code character
    } else {
      current += name[i]
    }
  }
  if (current) segments.push({ text: current, color, bold })
  return segments.filter(s => s.text.length > 0)
}

/** Extract the map folder name from a BeamMP map path.
 *  e.g. "/levels/gridmap_v2/info.json" → "gridmap_v2" */
export function getMapName(map: string): string {
  const parts = map.split('/')
  // If it ends with info.json, the map name is the parent folder
  if (parts[parts.length - 1] === 'info.json' && parts.length >= 2) {
    return parts[parts.length - 2]
  }
  return parts[parts.length - 1].replace(/\.json$/, '') || map
}

/**
 * Returns the color if it has enough contrast against a white background
 * (contrast ratio ≥ 3:1, WCAG AA for large/bold text).
 * Very light colors like #FFFFFF, #FFFF55, #55FF55 return undefined so they
 * inherit the surrounding dark text color instead.
 */
export function readableColor(hex: string | undefined): string | undefined {
  if (!hex || hex.length !== 7) return hex
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
  // Contrast ratio against white: 1.05 / (L + 0.05)
  return 1.05 / (L + 0.05) >= 3 ? hex : undefined
}
