// Mock data for dashboard charts

// Store Health Distribution Data
export const healthDistributionData = [
  { status: "healthy", stores: 32, fill: "hsl(var(--chart-1))" },
  { status: "warning", stores: 8, fill: "hsl(var(--chart-2))" },
  { status: "critical", stores: 3, fill: "hsl(var(--chart-3))" },
  { status: "maintenance", stores: 2, fill: "hsl(var(--chart-4))" },
]

// Health Trend Data (6 months)
export const healthTrendData = [
  { month: "July", healthy: 28, warning: 12, critical: 5 },
  { month: "August", healthy: 30, warning: 10, critical: 5 },
  { month: "September", healthy: 29, warning: 11, critical: 5 },
  { month: "October", healthy: 31, warning: 9, critical: 5 },
  { month: "November", healthy: 32, warning: 8, critical: 5 },
  { month: "December", healthy: 32, warning: 8, critical: 3 },
]

// Revenue Impact Data
export const revenueImpactData = [
  { status: "healthy", revenue: 2800, fill: "hsl(var(--chart-1))" },
  { status: "warning", revenue: 750, fill: "hsl(var(--chart-2))" },
  { status: "critical", revenue: 320, fill: "hsl(var(--chart-3))" },
]

// Chart configurations
export const healthDistributionConfig = {
  stores: {
    label: "Stores",
  },
  healthy: {
    label: "Healthy",
    color: "hsl(var(--chart-1))",
  },
  warning: {
    label: "Warning",
    color: "hsl(var(--chart-2))",
  },
  critical: {
    label: "Critical", 
    color: "hsl(var(--chart-3))",
  },
  maintenance: {
    label: "Maintenance",
    color: "hsl(var(--chart-4))",
  },
}

export const healthTrendConfig = {
  healthy: {
    label: "Healthy",
    color: "hsl(var(--chart-1))",
  },
  warning: {
    label: "Warning", 
    color: "hsl(var(--chart-2))",
  },
  critical: {
    label: "Critical",
    color: "hsl(var(--chart-3))",
  },
}

export const revenueImpactConfig = {
  revenue: {
    label: "Revenue (K)",
  },
  healthy: {
    label: "Healthy Stores",
    color: "hsl(var(--chart-1))",
  },
  warning: {
    label: "Warning Stores",
    color: "hsl(var(--chart-2))",
  },
  critical: {
    label: "Critical Stores",
    color: "hsl(var(--chart-3))",
  },
} 