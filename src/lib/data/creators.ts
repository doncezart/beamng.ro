export interface Creator {
  videoId: string        // YouTube video ID (the ?v= value)
  title: string          // video title
  creatorName: string    // display name of the creator
  channelUrl: string     // full YouTube channel URL
  duration?: string      // e.g. "21:21"
}

export const creators: Creator[] = [
  {
    videoId: 'RmkdZN1rgeI',
    title: 'Dacia VS BMW pe BeamNG.drive! Test de DURABILITATE',
    creatorName: 'IHATEPINK',
    channelUrl: 'https://www.youtube.com/@IHATEPINKTF',
    duration: '21:21',
  },
  {
    videoId: 'p3-ODQgODnY',
    title: 'PROVOCARE: Te lovesti = scoti o piesa de pe Masina pe BeamNG.Drive',
    creatorName: 'TREX',
    channelUrl: 'https://www.youtube.com/@mariantrex',
    duration: '39:42',
  },
  {
    videoId: '0TMHku16hyM',
    title: 'FUNNY MOMENTS BEAMNG ROMANIA 🇷🇴',
    creatorName: 'Mateowow',
    channelUrl: 'https://www.youtube.com/@mateowow8521',
    duration: '3:10',
  },
]
