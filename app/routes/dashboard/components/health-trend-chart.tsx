"use client"

import { TrendingUp, BarChart3 } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
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
  { month: "July", healthy: 28, warning: 12, critical: 5 },
  { month: "August", healthy: 30, warning: 10, critical: 5 },
  { month: "September", healthy: 29, warning: 11, critical: 5 },
  { month: "October", healthy: 31, warning: 9, critical: 5 },
  { month: "November", healthy: 32, warning: 8, critical: 5 },
  { month: "December", healthy: 32, warning: 8, critical: 3 },
]

const chartConfig = {
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

export function HealthTrendChart() {
  // Calculate trend
  const currentMonth = chartData[chartData.length - 1]
  const previousMonth = chartData[chartData.length - 2]
  const isPositiveTrend = currentMonth.healthy >= previousMonth.healthy
  
  return (
    <Card className="bg-card-texture h-full flex flex-col">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="h-5 w-5 text-primary" />
          Health Trend (6 Months)
        </CardTitle>
        <CardDescription>
          Store health evolution over time
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-2">
        <ChartContainer config={chartConfig} className="w-full h-[200px]">
          <LineChart
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
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="healthy"
              type="monotone"
              stroke="var(--color-healthy)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-healthy)",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: "var(--color-healthy)",
                strokeWidth: 2,
              }}
            />
            <Line
              dataKey="warning"
              type="monotone"
              stroke="var(--color-warning)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-warning)",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: "var(--color-warning)",
                strokeWidth: 2,
              }}
            />
            <Line
              dataKey="critical"
              type="monotone"
              stroke="var(--color-critical)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-critical)",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: "var(--color-critical)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 mt-auto">
        <div className="flex items-center justify-center gap-2 text-sm w-full">
          <TrendingUp className={`h-4 w-4 ${isPositiveTrend ? 'text-green-500' : 'text-red-500'}`} />
          <span className={`font-medium ${isPositiveTrend ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {isPositiveTrend ? 'Stable' : 'Declining'} this month
          </span>
        </div>
      </CardFooter>
    </Card>
  )
} 