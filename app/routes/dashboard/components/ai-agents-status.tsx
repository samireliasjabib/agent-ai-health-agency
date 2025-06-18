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
    description: "Analiza emails y llamadas de clientes para detectar satisfacción y señales de riesgo en tiempo real.",
    uptime: "99.9%",
    todayProcessed: "1.8K mensajes",
    icon: Brain,
  },
  {
    name: "AI PM Feedback Assistant",
    type: "Analytics",
    status: "active",
    description: "Resume feedback de los project managers y resalta issues urgentes para el equipo de liderazgo.",
    uptime: "100%",
    todayProcessed: "32 reportes",
    icon: BarChart3,
  },
  {
    name: "AutoFeedback para PMs",
    type: "ML",
    status: "active",
    description: "Genera retroalimentación automática para los PMs basada en sus interacciones recientes con clientes.",
    uptime: "98.7%",
    todayProcessed: "17 sesiones",
    icon: Bot,
  },
  {
    name: "Creative Brief Generator",
    type: "Content",
    status: "maintenance",
    description: "Genera briefs creativos automáticamente a partir de notas y reuniones con clientes.",
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
            <div
              key={index}
              className="p-4 rounded-lg border border-border/50 bg-background/30 transition-shadow hover:shadow-lg hover:bg-background/60"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-muted/50">
                    <IconComponent className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground flex items-center gap-1">
                      {agent.name}
                      {/* Optional: Info icon for tooltip */}
                      {/* <Info className="h-3 w-3 text-muted-foreground cursor-pointer" /> */}
                    </div>
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
                  <span className="text-muted-foreground">Hoy: </span>
                  <span className="font-semibold text-foreground">{agent.todayProcessed}</span>
                </div>
              </div>
              {index < aiAgents.length - 1 && (
                <div className="mt-4">
                  <div className="border-t border-border/30" />
                </div>
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
} 