import { describe, it, expect } from 'vitest'
import {
  filterRoServers,
  paginateServers,
  countryCodeToFlag,
  playerBadgeColor,
  truncateName,
} from './server-utils'
import type { BeamMPServer } from './types'

const makeServer = (overrides: Partial<BeamMPServer> = {}): BeamMPServer => ({
  ip: '1.2.3.4',
  port: 30814,
  name: 'Test Server',
  players: '5',
  maxplayers: 20,
  map: 'gridmap_v2',
  desc: '',
  location: 'DE',
  private: false,
  official: false,
  modded: false,
  ...overrides,
})

describe('filterRoServers', () => {
  it('returns only servers with location "RO"', () => {
    const servers = [
      makeServer({ location: 'RO', name: 'Romanian 1' }),
      makeServer({ location: 'DE', name: 'German' }),
      makeServer({ location: 'RO', name: 'Romanian 2' }),
    ]
    const result = filterRoServers(servers)
    expect(result).toHaveLength(2)
    expect(result.every(s => s.location === 'RO')).toBe(true)
  })

  it('returns empty array when no RO servers exist', () => {
    const servers = [makeServer({ location: 'US' }), makeServer({ location: 'DE' })]
    expect(filterRoServers(servers)).toHaveLength(0)
  })
})

describe('paginateServers', () => {
  it('returns correct slice for page 1', () => {
    const servers = Array.from({ length: 45 }, (_, i) => makeServer({ name: `Server ${i}` }))
    const result = paginateServers(servers, 1, 20)
    expect(result).toHaveLength(20)
    expect(result[0].name).toBe('Server 0')
    expect(result[19].name).toBe('Server 19')
  })

  it('returns partial slice for last page', () => {
    const servers = Array.from({ length: 45 }, (_, i) => makeServer({ name: `Server ${i}` }))
    const result = paginateServers(servers, 3, 20)
    expect(result).toHaveLength(5)
    expect(result[0].name).toBe('Server 40')
  })

  it('returns empty array when page exceeds total', () => {
    const servers = Array.from({ length: 10 }, (_, i) => makeServer({ name: `Server ${i}` }))
    expect(paginateServers(servers, 2, 20)).toHaveLength(0)
  })
})

describe('countryCodeToFlag', () => {
  it('converts "RO" to Romanian flag emoji', () => {
    expect(countryCodeToFlag('RO')).toBe('🇷🇴')
  })

  it('converts "DE" to German flag emoji', () => {
    expect(countryCodeToFlag('DE')).toBe('🇩🇪')
  })

  it('converts "US" to US flag emoji', () => {
    expect(countryCodeToFlag('US')).toBe('🇺🇸')
  })

  it('handles lowercase input', () => {
    expect(countryCodeToFlag('ro')).toBe('🇷🇴')
  })
})

describe('playerBadgeColor', () => {
  it('returns "green" when under 80% full', () => {
    expect(playerBadgeColor('3', 20)).toBe('green')
  })

  it('returns "orange" at exactly 80% full', () => {
    expect(playerBadgeColor('16', 20)).toBe('orange')
  })

  it('returns "red" when full', () => {
    expect(playerBadgeColor('20', 20)).toBe('red')
  })

  it('returns "green" for empty server', () => {
    expect(playerBadgeColor('0', 20)).toBe('green')
  })
})

describe('truncateName', () => {
  it('returns name unchanged when within limit', () => {
    expect(truncateName('Short Name', 60)).toBe('Short Name')
  })

  it('truncates at limit and appends ellipsis', () => {
    const longName = 'A'.repeat(65)
    const result = truncateName(longName, 60)
    expect(result).toBe('A'.repeat(60) + '...')
  })
})
