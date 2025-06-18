"use client"

import { TrendingUp, Activity } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart"
import { ActivityLog } from "./activity-log"

const chartData = [
  { status: "healthy", count: 32, fill: "#22c55e" },
  { status: "warning", count: 8, fill: "#f59e0b" }, 
  { status: "critical", count: 3, fill: "#ef4444" },
  { status: "maintenance", count: 2, fill: "#6366f1" },
]

const chartConfig = {
  count: {
    label: "Stores",
  },
  healthy: {
    label: "Healthy",
    color: "#22c55e",
  },
  warning: {
    label: "Warning", 
    color: "#f59e0b",
  },
  critical: {
    label: "Critical",
    color: "#ef4444",
  },
  maintenance: {
    label: "Maintenance",
    color: "#6366f1",
  },
} satisfies ChartConfig

export function HealthDistributionChart() {
  const totalStores = chartData.reduce((acc, curr) => acc + curr.count, 0)
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-6">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Activity className="h-6 w-6 text-primary" />
          Store Health Overview
        </CardTitle>
        <CardDescription>Current health status and recent activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Health Distribution Chart */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Health Distribution</h3>
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square w-full max-w-[280px] relative"
              >
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent nameKey="count" hideLabel />}
                  />
                  <Pie 
                    data={chartData} 
                    dataKey="count"
                    nameKey="status"
                    innerRadius={80}
                    outerRadius={120}
                    strokeWidth={2}
                  />
                </PieChart>
                
                {/* Center text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-foreground">{totalStores}</div>
                    <div className="text-sm text-muted-foreground">Total Stores</div>
                  </div>
                </div>
              </ChartContainer>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="text-sm">
                  <div className="font-medium">Healthy</div>
                  <div className="text-muted-foreground">{chartData[0].count} stores</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="text-sm">
                  <div className="font-medium">Warning</div>
                  <div className="text-muted-foreground">{chartData[1].count} stores</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="text-sm">
                  <div className="font-medium">Critical</div>
                  <div className="text-muted-foreground">{chartData[2].count} stores</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                <div className="text-sm">
                  <div className="font-medium">Maintenance</div>
                  <div className="text-muted-foreground">{chartData[3].count} stores</div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Log Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <ActivityLog />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm text-center pt-6 border-t">
        <div className="flex items-center gap-2 font-medium justify-center">
          71.1% stores operating optimally <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground">
          Monitoring {totalStores} stores across all clients
        </div>
      </CardFooter>
    </Card>
  )
}