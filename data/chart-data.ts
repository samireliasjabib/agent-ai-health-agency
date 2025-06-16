import type {
  SatisfactionTrendData,
  HealthDistributionData,
  PMPerformanceData,
  RevenueVsSatisfactionData,
} from "../types/charts"

export const satisfactionTrendData: SatisfactionTrendData[] = [
  { month: "Jan", satisfaction: 7.2, healthScore: 6.8, issues: 12 },
  { month: "Feb", satisfaction: 7.5, healthScore: 7.1, issues: 8 },
  { month: "Mar", satisfaction: 6.9, healthScore: 6.5, issues: 15 },
  { month: "Apr", satisfaction: 7.8, healthScore: 7.4, issues: 6 },
  { month: "May", satisfaction: 8.1, healthScore: 7.7, issues: 4 },
  { month: "Jun", satisfaction: 7.6, healthScore: 7.2, issues: 9 },
]

export const healthDistributionData: HealthDistributionData[] = [
  { range: "9-10 (Excellent)", count: 1, percentage: 14.3 },
  { range: "7-8.9 (Good)", count: 1, percentage: 14.3 },
  { range: "5-6.9 (Average)", count: 1, percentage: 14.3 },
  { range: "3-4.9 (Poor)", count: 2, percentage: 28.6 },
  { range: "0-2.9 (Critical)", count: 2, percentage: 28.6 },
]

export const pmPerformanceData: PMPerformanceData[] = [
  { pm: "Sarah Chen", avgHealth: 4.5, clientCount: 3, totalRevenue: 225000, satisfaction: 6.2 },
  { pm: "Mike Rodriguez", avgHealth: 4.8, clientCount: 2, totalRevenue: 60000, satisfaction: 6.5 },
  { pm: "Alex Thompson", avgHealth: 6.5, clientCount: 2, totalRevenue: 87000, satisfaction: 7.8 },
]

export const revenueVsSatisfactionData: RevenueVsSatisfactionData[] = [
  { clientName: "TechStart Store", revenue: 25000, satisfaction: 8.2, riskLevel: "Low" },
  { clientName: "Fashion Forward", revenue: 45000, satisfaction: 5.1, riskLevel: "Medium" },
  { clientName: "Gadget Galaxy", revenue: 80000, satisfaction: 3.2, riskLevel: "High" },
  { clientName: "Home Essentials", revenue: 32000, satisfaction: 9.1, riskLevel: "Low" },
  { clientName: "Sport Zone", revenue: 15000, satisfaction: 4.5, riskLevel: "High" },
  { clientName: "Digital Solutions Co", revenue: 120000, satisfaction: 2.8, riskLevel: "High" },
  { clientName: "Creative Agency Plus", revenue: 55000, satisfaction: 3.9, riskLevel: "High" },
]
