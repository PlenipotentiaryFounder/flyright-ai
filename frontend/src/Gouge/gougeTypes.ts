export interface Gouge {
  id: number;
  examiner_name: string;
  date: string;
  outcome: 'pass' | 'fail';
  text: string;
}