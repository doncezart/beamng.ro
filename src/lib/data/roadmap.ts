export type RoadmapStatus = 'Planificat' | 'În lucru' | 'Finalizat'

export interface RoadmapItem {
  title: string
  description: string
  status: RoadmapStatus
}

export const roadmapItems: RoadmapItem[] = [
  {
    title: 'Server propriu BeamNG',
    description: 'Lansarea primului server BeamMP românesc administrat de comunitate.',
    status: 'Planificat',
  },
  {
    title: 'Server Discord activ',
    description: 'Crearea serverului Discord cu canale dedicate showcase, evenimente și offtopic.',
    status: 'În lucru',
  },
  {
    title: 'Turneu inaugural',
    description: 'Primul turneu competitiv pentru membrii comunității.',
    status: 'Planificat',
  },
  {
    title: 'Parteneriate cu creatori',
    description: 'Colaborări cu creatori de conținut BeamNG din România.',
    status: 'Planificat',
  },
]
