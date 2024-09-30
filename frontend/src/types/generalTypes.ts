import { LucideIcon } from 'lucide-react';

export interface Reference {
  id: string;
  title: string;
  content: string;
  icon: LucideIcon;
  type: 'critical' | 'common' | 'additional';
}
