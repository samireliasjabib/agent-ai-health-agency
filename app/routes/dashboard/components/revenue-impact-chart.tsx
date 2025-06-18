"use client"

import { TrendingUp, DollarSign } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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

const chartData = [
  { status: "healthy", revenue: 2800, fill: "#10b981" },
  { status: "warning", revenue: 750, fill: "#f59e0b" },
  { status: "critical", revenue: 320, fill: "#ef4444" },
]

const chartConfig = {
  revenue: {
    label: "Revenue (K)",
  },
  healthy: {
    label: "Healthy",
    color: "#10b981",
  },
  warning: {
    label: "Warning",
    color: "#f59e0b",
  },
  critical: {
    label: "Critical",
    color: "#ef4444",
  },
} satisfies ChartConfig

export function RevenueImpactChart() {
  const totalRevenue = chartData.reduce((acc, curr) => acc + curr.revenue, 0)
  const healthyRevenue = chartData[0].revenue
  const healthyPercentage = ((healthyRevenue / totalRevenue) * 100).toFixed(1)
  
  return (
    <Card className="bg-card-texture h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5 text-primary" />
          Revenue Impact
        </CardTitle>
        <CardDescription>
          Revenue by health status (K)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-2">
        <ChartContainer config={chartConfig} className="w-full h-[200px]">
          <BarChart 
            accessibilityLayer 
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `${value}K`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="revenue"
              radius={[8, 8, 0, 0]}
              fill="var(--color-healthy)"
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 mt-auto">
        <div className="flex items-center justify-center gap-2 text-sm w-full">
          <TrendingUp className="h-4 w-4 text-green-500" />
          <span className="text-green-600 dark:text-green-400 font-medium">
            {healthyPercentage}% revenue from healthy stores
          </span>
        </div>
      </CardFooter>
    </Card>
  )
} 