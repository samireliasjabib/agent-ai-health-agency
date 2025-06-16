export interface ClientData {
  id: string
  clientName: string
  tier: "Premium" | "Standard"
  pm: string
  healthScore: number
  healthTrend: "up" | "down" | "stable"
  healthChange: number
  sentiment: "positive" | "neutral" | "negative"
  riskLevel: "Low" | "Medium" | "High"
  revenue: number
  issues: number
  issueDetails: string[]
  lastCall: string
  lastCallDate: Date
  nextCall: string
  status: "healthy" | "monitoring" | "critical" | "inactive"
}

export type SortField = keyof ClientData
export type SortDirection = "asc" | "desc" | null

export interface DashboardFilters {
  searchTerm: string
  pmFilter: string
  riskFilter: string
  quickFilter: string
}

export interface DashboardStats {
  totalClients: number
  totalRevenue: number
  totalIssues: number
  highRiskClients: number
  overdueClients: number
  avgHealthScore: number
}
