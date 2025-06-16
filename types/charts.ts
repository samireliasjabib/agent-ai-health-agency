export interface SatisfactionTrendData {
  month: string
  satisfaction: number
  healthScore: number
  issues: number
}

export interface HealthDistributionData {
  range: string
  count: number
  percentage: number
}

export interface PMPerformanceData {
  pm: string
  avgHealth: number
  clientCount: number
  totalRevenue: number
  satisfaction: number
}

export interface RevenueVsSatisfactionData {
  clientName: string
  revenue: number
  satisfaction: number
  riskLevel: string
}
