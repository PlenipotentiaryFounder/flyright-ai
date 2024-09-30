export interface AnalyticsData {
  user_growth: { date: string; count: number }[];
  user_activities: { activity_type: string; count: number }[];
  performance_metrics: { metric_type: string; avg_value: number }[];
}