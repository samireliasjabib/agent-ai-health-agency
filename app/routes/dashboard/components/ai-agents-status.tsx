"use client"

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Progress } from "~/components/ui/progress"
import { Brain, BarChart3, Package, Bot, Info } from "lucide-react"

const aiAgents = [
  {
    name: "AI Client Sentiment Monitor",
    type: "NLP",
    status: "active",
    description: "Analyzes client emails and calls to detect satisfaction and risk signals in real time.",
    uptime: "99.9%",
    todayProcessed: "1.8K messages",
    icon: Brain,
  },
  {
    name: "AI PM Feedback Assistant",
    type: "Analytics",
    status: "active",
    description: "Summarizes project manager feedback and highlights urgent issues for the leadership team.",
    uptime: "100%",
    todayProcessed: "32 reports",
    icon: BarChart3,
  },
  {
    name: "AutoFeedback for PMs",
    type: "ML",
    status: "active",
    description: "Generates automatic feedback for project managers based on their recent client interactions.",
    uptime: "98.7%",
    todayProcessed: "17 sessions",
    icon: Bot,
  },
  {
    name: "Creative Brief Generator",
    type: "Content",
    status: "maintenance",
    description: "Automatically generates creative briefs from client notes and meeting transcripts.",
    uptime: "97.5%",
    todayProcessed: "12 briefs",
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
    <Card className="bg-card-texture shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          Internal AI Agents
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          ArcticGrey's core AI infrastructure
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          {aiAgents.map((agent, index) => {
            const IconComponent = agent.icon
            return (
              <div
                key={index}
                className="p-4 rounded-xl border border-border/50 bg-background/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:shadow-md transition"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted/60 flex items-center justify-center">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold flex items-center gap-2 text-foreground">
                      {agent.name}
                      {/* <Info className="h-4 w-4 text-muted-foreground" /> */}
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {agent.type}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{agent.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 sm:items-end">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${getStatusColor(agent.status)}`} />
                    <Badge className={getStatusBadgeColor(agent.status)}>
                      {agent.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-xs mt-1">
                    <span>
                      <span className="text-muted-foreground">Uptime: </span>
                      <span className="font-semibold">{agent.uptime}</span>
                    </span>
                    <span>
                      <span className="text-muted-foreground">Today: </span>
                      <span className="font-semibold">{agent.todayProcessed}</span>
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
} 