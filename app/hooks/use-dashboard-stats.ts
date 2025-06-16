import { useMemo } from "react"
import type { ClientData, DashboardStats } from "../types/client"

function isOverdue(date: Date): boolean {
  const daysDiff = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff > 7
}

export function useDashboardStats(data: ClientData[]): DashboardStats {
  return useMemo(() => {
    const totalRevenue = data.reduce((sum, client) => sum + client.revenue, 0)
    const totalIssues = data.reduce((sum, client) => sum + client.issues, 0)
    const highRiskClients = data.filter((client) => client.riskLevel === "High").length
    const overdueClients = data.filter((client) => isOverdue(client.lastCallDate)).length
    const avgHealthScore = data.length > 0 ? data.reduce((sum, client) => sum + client.healthScore, 0) / data.length : 0

    return {
      totalClients: data.length,
      totalRevenue,
      totalIssues,
      highRiskClients,
      overdueClients,
      avgHealthScore,
    }
  }, [data])
}
