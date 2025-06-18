"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { Brain, BarChart3, Package, Bot } from "lucide-react"

const aiAgents = [
  {
    name: "Sentiment Analysis Engine",
    type: "NLP",
    status: "active",
    description: "Analyzes customer reviews and feedback across all stores",
    uptime: "99.8%",
    todayProcessed: "2.4K reviews",
    icon: Brain,
  },
  {
    name: "Automated Report Generator", 
    type: "Analytics",
    status: "active",
    description: "Generates daily, weekly, and monthly performance reports",
    uptime: "100%",
    todayProcessed: "45 reports",
    icon: BarChart3,
  },
  {
    name: "Inventory Predictor",
    type: "ML",
    status: "active", 
    description: "Predicts stock levels and suggests reorder points",
    uptime: "99.2%",
    todayProcessed: "1.2K predictions",
    icon: Package,
  },
]

function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-500"
    case "maintenance":
      return "bg-yellow-500"
    case "error":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
    case "maintenance":
      return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800"
    case "error":
      return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
    default:
      return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-900/20 dark:text-gray-400 dark:border-gray-800"
  }
}

export function AIAgentsStatus() {
  return (
    <Card className="bg-card-texture">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          Internal AI Agents
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          ArcticGrey's core AI infrastructure
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {aiAgents.map((agent, index) => {
          const IconComponent = agent.icon
          return (
            <div key={index} className="p-4 rounded-lg border border-border/50 bg-background/30">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted/50">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{agent.name}</div>
                    <Badge variant="outline" className="text-xs">
                      {agent.type}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${getStatusColor(agent.status)}`} />
                  <Badge className={getStatusBadgeColor(agent.status)}>
                    {agent.status}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                {agent.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Uptime: </span>
                  <span className="font-semibold text-foreground">{agent.uptime}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Today: </span>
                  <span className="font-semibold text-foreground">{agent.todayProcessed}</span>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
} 