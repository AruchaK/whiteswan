import { Shield, Heart, Landmark, Smile, Users } from 'lucide-react'

export const PILLARS = [
  { key: 'legal', label: 'Legal', color: '#7A5E3F', bg: '#F0EAE0', banner: '#3F4A5C', icon: Shield },
  { key: 'medical', label: 'Medical', color: '#C67A5C', bg: '#FCEAE4', banner: '#8B3A3A', icon: Heart },
  { key: 'financial', label: 'Financial', color: '#5E8C6A', bg: '#E4F0E8', banner: '#3E5C42', icon: Landmark },
  { key: 'personal', label: 'Personal', color: '#B8944F', bg: '#FDF3E0', banner: '#5B3A66', icon: Smile },
  { key: 'family', label: 'Family', color: '#e73d5b', bg: '#FDF3E0', banner: '#8A6A2E', icon: Users },
]

export const PILLARS_BY_KEY = Object.fromEntries(PILLARS.map((p) => [p.key, p]))
