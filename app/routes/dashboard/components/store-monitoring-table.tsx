"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { MoreHorizontal, TrendingUp, TrendingDown, Minus } from "lucide-react"

// Mock data for store monitoring
const storeData = [
  {
    store: "TechGear Store",
    storeId: "TG-001",
    healthStatus: "Healthy 95%",
    trend: "up",
    priority: "High Priority",
    revenue: "$125K",
    revenueMonthly: "$15M/Yr",
    aiAgents: 3,
    lastSync: "2024-01-15",
  },
  {
    store: "Fashion Forward",
    storeId: "FF-002", 
    healthStatus: "Healthy 92%",
    trend: "up",
    priority: "High Priority",
    revenue: "$98K",
    revenueMonthly: "$12M/Yr",
    aiAgents: 4,
    lastSync: "2024-01-14",
  },
  {
    store: "Global Finance Shop",
    storeId: "GFS-003",
    healthStatus: "Warning 78%",
    trend: "down",
    priority: "Medium",
    revenue: "$87K",
    revenueMonthly: "$10M/Yr",
    aiAgents: 2,
    lastSync: "2024-01-12",
  },
  {
    store: "EduTech Store",
    storeId: "ET-004",
    healthStatus: "Healthy 88%",
    trend: "stable",
    priority: "Medium",
    revenue: "$45K",
    revenueMonthly: "$0.5M/Yr",
    aiAgents: 2,
    lastSync: "2024-01-13",
  },
  {
    store: "RetailMax Shop",
    storeId: "RM-005",
    healthStatus: "Critical 65%",
    trend: "down",
    priority: "Low",
    revenue: "$23K",
    revenueMonthly: "$0.3M/Yr",
    aiAgents: 1,
    lastSync: "2024-01-08",
  },
]

function getHealthBadgeVariant(status: string) {
  if (status.includes("Healthy")) return "default"
  if (status.includes("Warning")) return "secondary"
  if (status.includes("Critical")) return "destructive"
  return "default"
}

function getPriorityBadgeVariant(priority: string) {
  if (priority === "High Priority") return "default"
  if (priority === "Medium") return "secondary"
  return "outline"
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-3 w-3 text-green-500" />
    case "down":
      return <TrendingDown className="h-3 w-3 text-red-500" />
    default:
      return <Minus className="h-3 w-3 text-muted-foreground" />
  }
}

export function StoreMonitoringTable() {
  return (
    <Card className="bg-card-texture">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <div className="h-5 w-5 bg-primary rounded flex items-center justify-center">
            <span className="text-primary-foreground text-xs">📊</span>
          </div>
          Store Health Monitoring
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time health monitoring and risk assessment for all Shopify stores
        </p>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-border/50">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="text-muted-foreground font-medium">Store</TableHead>
                <TableHead className="text-muted-foreground font-medium">Health Status</TableHead>
                <TableHead className="text-muted-foreground font-medium">Trend</TableHead>
                <TableHead className="text-muted-foreground font-medium">Priority</TableHead>
                <TableHead className="text-muted-foreground font-medium">Revenue/Mo</TableHead>
                <TableHead className="text-muted-foreground font-medium">AI Agents</TableHead>
                <TableHead className="text-muted-foreground font-medium">Last Sync</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {storeData.map((store) => (
                <TableRow key={store.storeId} className="border-border/50 hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold text-foreground">{store.store}</div>
                      <div className="text-xs text-muted-foreground">{store.storeId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getHealthBadgeVariant(store.healthStatus)}>
                      {store.healthStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(store.trend)}
                      <span className="text-xs text-muted-foreground capitalize">
                        {store.trend}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(store.priority)}>
                      {store.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold text-foreground">{store.revenue}</div>
                      <div className="text-xs text-muted-foreground">{store.revenueMonthly}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-semibold text-foreground">{store.aiAgents}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-muted-foreground">{store.lastSync}</span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
} 