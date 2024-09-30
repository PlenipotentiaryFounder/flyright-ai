export interface Gouge {
  id: number;
  examiner_name: string;
  date: string;
  outcome: 'pass' | 'fail';
  text: string;
  stage: 'Private Pilot' | 'Instrument' | 'Commercial' | 'ATP';
  aircraft_type?: string;
  location?: string;
}

export interface GougeFilters {
  searchTerm: string;
  stage: string;
  examiner?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
}