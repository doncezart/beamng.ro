// Field names are confirmed in Task 10 Step 2 against the live API.
// If the API returns "playercount" instead of "players", update this interface
// and all usages in server-utils.ts, server-utils.test.ts, and ServerCard.svelte.
export interface BeamMPServer {
  ip: string
  port: number
  name: string
  players: string      // may be "playercount" — verify in Task 10
  maxplayers: number
  map: string
  desc: string
  location: string     // 2-letter country code: "RO", "DE", "US", etc.
  private: boolean
  official: boolean
  modded: boolean
}
