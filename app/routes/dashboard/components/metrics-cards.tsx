"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Store,
  Bot,
  Heart,
  AlertCircle
} from "lucide-react"

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Active Stores */}
      <Card className="bg-card-texture">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Active Stores
          </CardTitle>
          <Store className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">45</div>
          <p className="text-xs text-muted-foreground">
            Shopify merchants
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500">+3 this month</span>
          </div>
        </CardContent>
      </Card>

      {/* AI Agents */}
      <Card className="bg-card-texture">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            AI Agents
          </CardTitle>
          <Bot className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">6</div>
          <p className="text-xs text-muted-foreground">
            Internal systems
          </p>
          <div className="flex items-center gap-1 mt-1">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs text-muted-foreground">5 active, 1 maintenance</span>
          </div>
        </CardContent>
      </Card>

      {/* Avg Health Score */}
      <Card className="bg-card-texture">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Avg Health Score
          </CardTitle>
          <Heart className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">87%</div>
          <p className="text-xs text-muted-foreground">
            Across all stores
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="h-3 w-3 text-green-500" />
            <span className="text-xs text-green-500">+5% from last week</span>
          </div>
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      <Card className="bg-card-texture">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Critical Alerts
          </CardTitle>
          <AlertCircle className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">3</div>
          <p className="text-xs text-muted-foreground">
            Require attention
          </p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="h-3 w-3 text-red-500" />
            <span className="text-xs text-red-500">-2 from yesterday</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 