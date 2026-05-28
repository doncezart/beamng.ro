export type RoadmapStatus = 'Planificat' | 'În lucru' | 'Finalizat'

export interface RoadmapItem {
  title: string
  description: string
  status: RoadmapStatus
}

export const roadmapItems: RoadmapItem[] = [
  {
    title: 'Site BeamNG România',
    description: 'Lansarea site-ului oficial al comunității cu informații despre servere, creatori și roadmap.',
    status: 'Finalizat',
  },
  {
    title: 'Server Discord activ',
    description: 'Crearea serverului Discord cu canale dedicate showcase, evenimente și offtopic.',
    status: 'În lucru',
  },
  {
    title: 'Server propriu BeamNG',
    description: 'Lansarea primului server BeamMP românesc administrat de comunitate.',
    status: 'Planificat',
  },
  {
    title: 'Parteneriate cu creatori',
    description: 'Colaborări cu creatori de conținut BeamNG din România.',
    status: 'Planificat',
  },
]
